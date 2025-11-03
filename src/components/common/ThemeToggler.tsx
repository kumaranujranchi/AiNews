"use client"
import { useEffect } from 'react';

const ThemeToggler = () => {
   useEffect(() => {
      const themeSwitch = document.querySelector<HTMLInputElement>('.modeSwitch');

      const tg_set_scheme = (tg_theme: string) => {
         localStorage.setItem('tg_theme_scheme', tg_theme);
         document.documentElement.setAttribute("tg-theme", tg_theme);
      }

      const toggleTheme = () => {
         if (localStorage.getItem('tg_theme_scheme') === 'dark') {
            tg_set_scheme('light');
         } else {
            tg_set_scheme('dark');
         }
      }

      const tg_init_theme = () => {
         if (localStorage.getItem('tg_theme_scheme') === 'dark') {
            tg_set_scheme('dark');
            themeSwitch?.setAttribute('checked', 'true');
         } else {
            tg_set_scheme('light');
            themeSwitch?.removeAttribute('checked');
         }
      }

      const tg_theme_toggler = () => {
         themeSwitch?.addEventListener("change", toggleTheme);
         tg_init_theme();
      }

      if (themeSwitch) {
         tg_theme_toggler();
      }

      return () => {
         themeSwitch?.removeEventListener("change", toggleTheme);
      };
   }, []);

   return (
      <div className="darkmode-trigger">
         <label className="modeSwitch">
            <input type="checkbox" />
            <span className="icon"></span>
         </label>
      </div>
   );
};

export default ThemeToggler;
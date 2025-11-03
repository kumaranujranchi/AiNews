interface MenuItem {
   id: number;
   title: string;
   link: string;
   has_dropdown: boolean;
   sub_menus?: {
      link: string;
      title: string;
      mega_dropdown: boolean;
      mega_menus?: {
         link: string;
         title: string;
      }[];
   }[];
}[];

const menu_data: MenuItem[] = [
   {
      id: 1,
      has_dropdown: false,
      title: "Home",
      link: "/",
   },
   {
      id: 2,
      has_dropdown: false,
      title: "About",
      link: "/about",
   },
   {
      id: 3,
      has_dropdown: true,
      title: "Categories",
      link: "#",
      sub_menus: [
         { link: "/blog", title: "Latest News", mega_dropdown: false },
      ],
   },
   {
      id: 4,
      has_dropdown: false,
      title: "Contact",
      link: "/contact",
   },
];
export default menu_data;

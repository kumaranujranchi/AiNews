"use client"
import Image from "next/image"
import Link from "next/link"
import NavMenu from "./NavMenu"

import logo_1 from "@/assets/img/logo/logo.png"
import logo_2 from "@/assets/img/logo/w_logo.png"

const MobileMenu = ({mobileMenu,setMobileMenu}:any) => {
   return (
      <div className={mobileMenu?"mobile-menu-visible":""}>
         <div className="mobile-menu">
            <nav className="menu-box">
               <div onClick={() => setMobileMenu(false)} className="close-btn"><i className="fas fa-times"></i></div>
               <div className="nav-logo">
                  <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
               </div>
               <div className="nav-logo d-none">
                  <Link href="/"><Image src={logo_2} alt="Logo" /></Link>
               </div>
               <div className="mobile-search">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search here..." />
                     <button><i className="flaticon-search"></i></button>
                  </form>
               </div>
               <div className="menu-outer">
                  <NavMenu />
               </div>
               <div className="social-links">
                  <ul className="clearfix list-wrap">
                     <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                     <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
            </nav>
         </div>
         <div onClick={() => setMobileMenu(false)} className="menu-backdrop"></div>
      </div>
   )
}

export default MobileMenu

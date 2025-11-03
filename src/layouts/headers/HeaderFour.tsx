"use client"
import HeaderTopFour from "./menu/HeaderTopFour"
import NavMenu from "./menu/NavMenu"
import Image from "next/image"
import UseSticky from "@/hooks/UseSticky"
import Link from "next/link"
import MobileMenu from "./menu/MobileMenu"
import { useState } from "react"

import logo_1 from "@/assets/img/logo/logo.png"
import logo_2 from "@/assets/img/logo/w_logo.png"

const HeaderFour = () => {

   const { sticky } = UseSticky();
   const [mobileMenu, setMobileMenu] = useState<boolean>(false);
   return (
      <>
         <header className="header-style-four">
            <div id="header-fixed-height" className={sticky ? "active-height" : ""}></div>
            <HeaderTopFour />
            <div id="sticky-header" className={`menu-area menu-style-four ${sticky ? "sticky-menu" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="menu-wrap">
                           <nav className="menu-nav">
                              <div className="logo d-none">
                                 <Link href="/"><Image src={logo_1} alt="" /></Link>
                              </div>
                              <div className="logo d-none white-logo">
                                 <Link href="/"><Image src={logo_2} alt="" /></Link>
                              </div>
                              <div className="navbar-wrap main-menu d-none d-lg-flex">
                                 <NavMenu />
                              </div>
                              <div onClick={() => setMobileMenu(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   )
}

export default HeaderFour

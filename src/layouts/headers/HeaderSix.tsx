"use client"
import Image from "next/image"
import NavMenu from "./menu/NavMenu"
import Link from "next/link"
import UseSticky from "@/hooks/UseSticky"
import { useState } from "react"
import Offcanvas from "./menu/Offcanvas"
import MobileMenu from "./menu/MobileMenu"
import HeaderTopSix from "./menu/HeaderTopSix"

import logo_1 from "@/assets/img/logo/logo.png";
import logo_2 from "@/assets/img/logo/w_logo.png";

const HeaderSix = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [mobileMenu, setMobileMenu] = useState<boolean>(false);

   return (
      <>
         <header className="header-style-six">
            <div id="header-fixed-height" className={sticky ? "active-height" : ""}></div>
            <HeaderTopSix />
            <div id="sticky-header" className={`menu-area menu-style-six ${sticky ? "sticky-menu" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="menu-wrap">
                           <nav className="menu-nav">
                              <div className="logo d-none">
                                 <Link href="/" className="d-flex align-items-center gap-2">
                                    <Image src="/favicon.png" alt="logo" width={30} height={30} />
                                    <h2 style={{ fontFamily: 'Nunito, sans-serif', color: '#2A4970', fontWeight: '800', margin: 0, fontSize: '28px', letterSpacing: '-1px' }}>TimesAI</h2>
                                 </Link>
                              </div>
                              <div className="logo d-none white-logo">
                                 <Link href="/"><Image src={logo_2} alt="" /></Link>
                              </div>
                              <div className="offcanvas-toggle">
                                 <a onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="menu-tigger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                 </a>
                              </div>
                              <div className="navbar-wrap main-menu d-none d-lg-flex">
                                 <NavMenu />
                              </div>
                              <div className="header-search-wrap header-search-wrap-three">
                                 <form onSubmit={(e) => e.preventDefault()}>
                                    <input type="text" placeholder="Search here . . ." />
                                    <button type="submit"><i className="flaticon-search"></i></button>
                                 </form>
                              </div>
                              <div onClick={() => setMobileMenu(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   )
}

export default HeaderSix

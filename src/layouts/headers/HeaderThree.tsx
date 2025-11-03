"use client"
import Image from "next/image"
import NavMenu from "./menu/NavMenu"
import Link from "next/link"
import UseSticky from "@/hooks/UseSticky"
import HeaderTopThree from "./menu/HeaderTopThree"
import MobileMenu from "./menu/MobileMenu"
import { useState } from "react"

import logo_1 from "@/assets/img/logo/w_logo.png";
import logo_2 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {

   const { sticky } = UseSticky();
   const [mobileMenu, setMobileMenu] = useState<boolean>(false);

   return (
      <>
         <header className="header-style-three">
            <div id="header-fixed-height" className={sticky ? "active-height" : ""}></div>
            <HeaderTopThree />

            <div id="sticky-header" className={`menu-area menu-style-three ${sticky ? "sticky-menu" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="menu-wrap">
                           <nav className="menu-nav">
                              <div className="logo">
                                 <Link href="/"><Image src={logo_2} alt="" /></Link>
                              </div>
                              <div className="logo d-none">
                                 <Link href="/"><Image src={logo_1} alt="" /></Link>
                              </div>
                              <div className="navbar-wrap main-menu d-none d-lg-flex">
                                 <NavMenu />
                              </div>
                              <div className="header-action d-none d-md-block">
                                 <ul className="list-wrap">
                                    <li className="header-wishlist">
                                       <Link href="#"><i className="flaticon-heart"></i><span>0</span></Link>
                                    </li>
                                    <li className="header-cart">
                                       <Link href="#"><i className="flaticon-basket"></i><span>0</span></Link>
                                       <strong>$0.00</strong>
                                    </li>
                                    <li className="header-sine-in">
                                       <Link href="/login"><i className="flaticon-user"></i>Sign In</Link>
                                    </li>
                                 </ul>
                              </div>
                              <div onClick={() => setMobileMenu(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header >
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   )
}

export default HeaderThree

import Link from "next/link"
import Image from "next/image"
import Offcanvas from "./Offcanvas"
import { useState } from "react"

import logo_1 from "@/assets/img/logo/logo.png"
import logo_2 from "@/assets/img/logo/w_logo.png"

const HeaderTopFour = () => {

   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <div className="header-top-wrap-three">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-6 col-md-8">
                     <div className="header-top-left-two">
                        <ul className="list-wrap">
                           <li><Link href="/contact">Forum</Link></li>
                           <li><Link href="/about">About</Link></li>
                           <li><Link href="/contact">Faq’s</Link></li>
                           <li><Link href="/contact">Discover Places</Link></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                     <div className="header-top-right-two">
                        <div className="header-top-social">
                           <ul className="list-wrap">
                              <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                              <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                              <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                              <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                           </ul>
                        </div>
                        <div className="offcanvas-toggle offcanvas-toggle-two">
                           <a onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="menu-tigger-two">
                              <span></span>
                              <span></span>
                              <span></span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="header-logo-area-two">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-4">
                     <div className="header-search-wrap header-search-wrap-three">
                        <form onSubmit={(e) => e.preventDefault}>
                           <input type="text" placeholder="Search here . . ." />
                           <button type="submit"><i className="flaticon-search"></i></button>
                        </form>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="logo text-center">
                        <Link href="/"><Image src={logo_1} alt="" /></Link>
                     </div>
                     <div className="logo d-none text-center">
                        <Link href="/"><Image src={logo_2} alt="" /></Link>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="header-action header-action-two">
                        <ul className="list-wrap">
                           <li className="header-wishlist">
                              <Link href="#"><i className="flaticon-heart"></i><span>0</span></Link>
                           </li>
                           <li className="header-cart">
                              <Link href="#"><i className="flaticon-basket"></i><span>0</span></Link>
                              <strong>$0.00</strong>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderTopFour

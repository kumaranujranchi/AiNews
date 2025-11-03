import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import Offcanvas from "./Offcanvas";

import logo_1 from "@/assets/img/logo/w_logo.png";
import HeaderSearch from "./HeaderSearch";

const HeaderTopFive = () => {

   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [search, setSearch] = useState<boolean>(false);

   return (
      <>
         <div className="header-logo-area-three">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-4">
                     <div className="hl-left-side-three">
                        <div className="offcanvas-toggle offcanvas-toggle-two">
                           <a onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="menu-tigger-two">
                              <span></span>
                              <span></span>
                              <span></span>
                           </a>
                        </div>
                        <div className="header-search">
                           <a onClick={() => setSearch(true)} style={{ cursor: "pointer" }} className="search-open-btn"><i className="flaticon-search"></i></a>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="logo text-center">
                        <Link href="/"><Image src={logo_1} alt="" /></Link>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="header-top-social">
                        <ul className="list-wrap">
                           <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <HeaderSearch search={search} setSearch={setSearch} />
      </>
   )
}

export default HeaderTopFive

import { useState } from "react";
import Offcanvas from "./Offcanvas";
import Link from "next/link";

const HeaderTopThree = () => {

   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <div className="header-top-wrap-two">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-4">
                     <div className="header-top-left">
                        <div className="offcanvas-toggle">
                           <a onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="menu-tigger-two">
                              <span></span>
                              <span></span>
                              <span></span>
                           </a>
                        </div>
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
                  <div className="col-lg-8">
                     <div className="header-top-right">
                        <div className="header-search-wrap header-search-wrap-two">
                           <form onSubmit={(e) => e.preventDefault()}>
                              <input type="text" placeholder="Search here . . ." />
                              <button type="submit"><i className="flaticon-search"></i></button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderTopThree;

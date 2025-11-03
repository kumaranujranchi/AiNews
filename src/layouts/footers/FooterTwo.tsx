import Link from "next/link"
import Image from "next/image"

import logo_1 from "@/assets/img/logo/w_logo.png"

const FooterTwo = () => {
   return (
      <footer>
         <div className="footer-area-three">
            <div className="footer-top-two">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="footer-content-two">
                           <div className="fw-logo">
                              <Link href="/"><Image src={logo_1} alt="" /></Link>
                           </div>
                           <p>Browned butter and brown sugar caramelly goodness <br /> crispy edgesthick and soft centers and <br /> melty little puddles</p>
                           <div className="footer-social">
                              <ul className="list-wrap">
                                 <li><Link href="#"><i className="fab fa-facebook-f"></i>Facebook</Link></li>
                                 <li><Link href="#"><i className="fab fa-twitter"></i>Twitter</Link></li>
                                 <li><Link href="#"><i className="fab fa-instagram"></i>Instagram</Link></li>
                                 <li><Link href="#"><i className="fab fa-youtube"></i>Youtube</Link></li>
                                 <li><Link href="#"><i className="fab fa-pinterest"></i>Pinterest</Link></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="footer-shape-two" style={{ backgroundImage: `url(/assets/img/images/footer_shape02.png)` }}></div>
            </div>
            <div className="footer-bottom-two">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="copyright-text-two">
                           <p>© 2024 All Rights Reserved</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterTwo

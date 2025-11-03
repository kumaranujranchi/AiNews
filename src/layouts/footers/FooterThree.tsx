import footer_data from "@/data/FooterData"
import Image from "next/image"
import Link from "next/link"

import footerLogo from "@/assets/img/logo/logo.png";

const FooterThree = () => {

   return (
      <footer>
         <div className="footer-area-four">
            <div className="footer-top footer-top-three">
               <div className="container">
                  <div className="row">
                     <div className="col-lg-3 col-md-7">
                        <div className="footer-widget">
                           <div className="fw-logo">
                              <Link href="/"><Image src={footerLogo} alt="" /></Link>
                           </div>
                           <div className="footer-content">
                              <p>Browned butter and brown sugar caramelly goodness, crispy edges thick and soft centers and melty little puddles of chocolate.</p>
                           </div>
                        </div>
                     </div>
                     {footer_data.map((item) => (
                        <div key={item.id} className={item.class_name}>
                           <div className="footer-widget">
                              <h4 className="fw-title">{item.title}</h4>
                              <div className="footer-link-wrap">
                                 <ul className="list-wrap">
                                    {item.footer_link.map((link, i) => (
                                       <li key={i}><Link href={link.link}>{link.title}</Link></li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="footer-bottom footer-bottom-three">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <div className="footer-bottom-menu">
                           <ul className="list-wrap">
                              <li><Link href="/contact">Privacy Policy & Terms</Link></li>
                              <li><Link href="/contact">Site Credits</Link></li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="copyright-text">
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

export default FooterThree;

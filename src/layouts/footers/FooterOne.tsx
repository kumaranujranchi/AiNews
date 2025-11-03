import footer_data from "@/data/FooterData"
import Image from "next/image"
import Link from "next/link"

import footerLogo from "@/assets/img/logo/w_logo.png";

const FooterOne = ({ style, style_2 }: any) => {
   return (
      <footer>
         <div className={`footer-area ${style ? "" : style_2 ? "" : "footer-area-two"}`}>
            <div className="footer-top">
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
                        <div key={item.id} className={`${item.class_name} col-sm-6`}>
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
               {style && <div className="footer-shape" style={{ backgroundImage: `url(/assets/img/images/footer_shape.png)` }}></div>}
            </div>

            <div className="footer-bottom">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <div className="footer-bottom-menu">
                           <ul className="list-wrap">
                              <li><Link href="/">Privacy Policy & Terms</Link></li>
                              <li><Link href="/">Site Credits</Link></li>
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

export default FooterOne

import Image from "next/image"
import Link from "next/link";

import avatar_1 from "@/assets/img/images/avatar_img.png";
import avatar_2 from "@/assets/img/images/avatar_shape01.png";
import avatar_3 from "@/assets/img/images/avatar_shape02.png";
import SocialIcon from "./SocialIcon";

const LatestPostSidebar = () => {
   return (
      <div className="col-30">
         <div className="sidebar-wrap">
            <div className="sidebar-widget">
               <div className="sidebar-avatar">
                  <div className="sidebar-avatar-thumb">
                     <Image src={avatar_1} alt="" />
                  </div>
                  <div className="sidebar-avatar-content">
                     <h2 className="title">Hi, I’m Jenny!</h2>
                     <p>when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                     <div className="avatar-social">
                        <ul className="list-wrap">
                           <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
                        </ul>
                     </div>
                  </div>
                  <div className="sidebar-avatar-shape">
                     <Image src={avatar_2} alt="" />
                     <Image src={avatar_3} alt="" />
                  </div>
               </div>
            </div>
            <div className="sidebar-widget">
               <div className="widget-title mb-25">
                  <h2 className="title">Subscribe & Followers</h2>
                  <div className="section-title-line"></div>
               </div>
               <div className="sidebar-social-wrap">
                  <SocialIcon />
               </div>
            </div>
         </div>
      </div>
   )
}

export default LatestPostSidebar

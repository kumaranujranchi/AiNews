import Image from "next/image"
import StorySidebarOne from "./SidebarStoryOne"
import SidebarStoryTwo from "./SidebarStoryTwo"
import Link from "next/link"

import thumb_1 from "@/assets/img/images/sidebar_img05.jpg"


const BannerSidebar = () => {
   return (
      <div className="col-xl-3 col-lg-8">
         <div className="sidebar-wrap-three">
            <StorySidebarOne />
            <div className="sidebar-widget-three">
               <div className="sidebar-img-two">
                  <Link href="#"><Image src={thumb_1} alt="" /></Link>
               </div>
            </div>
            <SidebarStoryTwo />
         </div>
      </div>
   )
}

export default BannerSidebar

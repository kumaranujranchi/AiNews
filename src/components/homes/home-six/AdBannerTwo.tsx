import Image from "next/image"
import Link from "next/link"

import adThumb from "@/assets/img/images/advertisement14.jpg";

const AdBannerTwo = () => {
   return (
      <div className="ad-banner-area pt-50 pb-60">
         <div className="container">
            <div className="ad-banner-img ad-banner-img-two text-center">
               <Link href="#">
                  <Image src={adThumb} alt="" />
               </Link>
            </div>
         </div>
      </div>
   )
}

export default AdBannerTwo

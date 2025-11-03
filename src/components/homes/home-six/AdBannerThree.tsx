import Image from "next/image"
import Link from "next/link"

import bannerThumb_1 from "@/assets/img/images/advertisement15.jpg";

const AdBannerThree = () => {
   return (
      <div className="ad-banner-area pt-20 pb-50">
         <div className="ad-banner-img ad-banner-img-two text-center">
            <Link href="#">
               <Image src={bannerThumb_1} alt="" />
            </Link>
         </div>
      </div>
   )
}

export default AdBannerThree

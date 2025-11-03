import Link from 'next/link';
import adBaner from '@/assets/img/images/advertisement13.jpg';
import Image from 'next/image';

const AdBanner = () => {
   return (

      <div className="ad-banner-img ad-banner-img-two text-center pt-20 pb-50">
         <Link href="#">
            <Image src={adBaner} alt="" />
         </Link>
      </div>
   )
}

export default AdBanner

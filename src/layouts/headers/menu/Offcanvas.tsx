"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { useState } from "react"
import ImagePopup from "@/modals/ImagePopup"

import logo_1 from "@/assets/img/logo/logo.png"
import logo_2 from "@/assets/img/logo/w_logo.png"

import img_1 from "@/assets/img/blog/hr_post01.jpg"
import img_2 from "@/assets/img/blog/hr_post02.jpg"
import img_3 from "@/assets/img/blog/hr_post03.jpg"
import img_4 from "@/assets/img/blog/hr_post04.jpg"
import img_5 from "@/assets/img/blog/hr_post05.jpg"
import img_6 from "@/assets/img/blog/hr_post06.jpg"

const image_data: StaticImageData[] = [img_1, img_2, img_3, img_4, img_5, img_6];

const Offcanvas = ({ offCanvas, setOffCanvas }: any) => {

   // photoIndex
   const [photoIndex, setPhotoIndex] = useState(null);
   // image open state
   const [isOpen, setIsOpen] = useState(false);
   // handleImagePopup
   const handleImagePopup = (i: any) => {
      setPhotoIndex(i);
      setIsOpen(true);
   };
   //  images
   const images = image_data.map((item) => item);

   return (
      <>
         <div className={offCanvas ? "offCanvas-menu-visible" : ""}>
            <div className="offCanvas-wrap">
               <div className="offCanvas-body">
                  <div onClick={() => setOffCanvas(false)} className="offCanvas-toggle">
                     <span></span>
                     <span></span>
                  </div>
                  <div className="offCanvas-content">
                     <div className="offCanvas-logo logo">
                        <Link href="/" className="logo-dark"><Image src={logo_1} alt="Logo" /></Link>
                        <Link href="/" className="logo-light"><Image src={logo_2} alt="Logo" /></Link>
                     </div>
                     <p>The argument in favor of using filler text goes something like this: If you use any real content in the Consulting Process anytime you reach.</p>
                     <ul className="offCanvas-instagram list-wrap">
                        {image_data.map((image, index) => (
                           <li key={index}><a onClick={() => handleImagePopup(index)} style={{ cursor: "pointer" }} className="popup-image"><Image src={image} alt="img" /></a></li>
                        ))}
                     </ul>
                  </div>
                  <div className="offCanvas-contact">
                     <h4 className="title">Get In Touch</h4>
                     <ul className="offCanvas-contact-list list-wrap">
                        <li><i className="fas fa-envelope-open"></i><Link href="mailto:info@webmail.com">info@webmail.com</Link></li>
                        <li><i className="fas fa-phone"></i><Link href="tel:88899988877">888 999 888 77</Link></li>
                        <li><i className="fas fa-map-marker-alt"></i> 12/A, New Booston, NYC</li>
                     </ul>
                     <ul className="offCanvas-social list-wrap">
                        <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div onClick={() => setOffCanvas(false)} className="offCanvas-overlay"></div>
         </div>
         {isOpen && (
            <ImagePopup
               images={images}
               setIsOpen={setIsOpen}
               photoIndex={photoIndex}
               setPhotoIndex={setPhotoIndex}
            />
         )}
      </>
   )
}

export default Offcanvas

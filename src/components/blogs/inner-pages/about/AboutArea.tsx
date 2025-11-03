import Image from "next/image"
import Link from "next/link"

import thumb_1 from "@/assets/img/images/about_img01.jpg"
import thumb_2 from "@/assets/img/images/about_img02.jpg"
import thumb_3 from "@/assets/img/images/about_img03.jpg"
import thumbShape from "@/assets/img/images/about_shape.png"

const AboutArea = () => {
   return (
      <section className="about-area pt-80 pb-80">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-7 col-md-10 order-0 order-lg-2">
                  <div className="about-img">
                     <div className="left-img">
                        <Image src={thumb_1} alt="" />
                        <Image src={thumb_2} alt="" />
                     </div>
                     <div className="right-img">
                        <Image src={thumb_3} alt="" />
                     </div>
                     <Image src={thumbShape} alt="" className="shape" />
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="about-content">
                     <div className="section-title-five">
                        <span className="sub-title">WHO WE ARE</span>
                        <h2 className="title">We Build Bridge Between Companies And Customers</h2>
                     </div>
                     <span>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</span>
                     <p>popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.</p>
                     <div className="view-all-btn">
                        <Link href="/contact" className="btn btn-two link-btn">Read More
                           <span className="svg-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                                 <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                                 <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                              </svg>
                           </span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section >
   )
}

export default AboutArea

"use client"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import img_1 from "@/assets/img/icon/trending_icon.svg"
import img_2 from "@/assets/img/logo/logo.png"
import img_3 from "@/assets/img/logo/w_logo.png"
import { useEffect, useState } from "react";

const setting = {
   slidesPerView: 1,
   loop: true,
   spaceBetween: 0,
   autoplay: {
      delay: 5000,
   },
};

const header_slider: string[] = ["Here area brands and designers to look out for next year 2023", "Here area brands and designers to look out for next year 2023", "Here area brands and designers to look out for next year 2023"]

const HeaderTopSix = () => {

   const [currentDate, setCurrentDate] = useState('');

   useEffect(() => {
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as const; // Specify type explicitly
      const today = new Date().toLocaleDateString('en-US', dateOptions);
      setCurrentDate(today);
   }, []);

   return (
      <>
         <div className="header-top-wrap-four">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-8">
                     <div className="header-top-left-four">
                        <div className="trending-box">
                           <div className="icon"><Image src={img_1} alt="" /></div>
                           <span>Trending</span>
                           <div className="shape">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 36" preserveAspectRatio="none" fill="none">
                                 <path d="M0 18C0 8.05888 8.05887 0 18 0H110L121.26 16.8906C121.708 17.5624 121.708 18.4376 121.26 19.1094L110 36H18C8.05888 36 0 27.9411 0 18Z" fill="url(#trending_shape)" />
                                 <defs>
                                    <linearGradient id="trending_shape" x1="12" y1="36" x2="132" y2="36" gradientUnits="userSpaceOnUse">
                                       <stop offset="0" stopColor="#3F6088" />
                                       <stop offset="1" stopColor="#2A4970" stopOpacity="0" />
                                    </linearGradient>
                                 </defs>
                              </svg>
                           </div>
                        </div>
                        <div className="swiper-container ta-trending-slider">
                           <Swiper direction={'vertical'} {...setting} modules={[Autoplay]} className="swiper-wrapper">
                              {header_slider.map((item, i) => (
                                 <SwiperSlide key={i} className="swiper-slide">
                                    <div className="trending-content">
                                       <Link href="/blog-details">{item}</Link>
                                    </div>
                                 </SwiperSlide>
                              ))}
                           </Swiper>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="header-top-social header-top-social-two">
                        <h5 className="title">Follow Us:</h5>
                        <ul className="list-wrap">
                           <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="header-logo-area-four">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-4">
                     <div className="hl-left-side-four">
                        <span className="date"><i className="flaticon-calendar"></i>{currentDate}</span>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="logo text-center">
                        <Link href="/" className="d-flex align-items-center justify-content-center gap-2">
                           <Image src="/favicon.png" alt="logo" width={35} height={35} />
                           <h2 style={{ fontFamily: 'Nunito, sans-serif', color: '#2A4970', fontWeight: '800', margin: 0, fontSize: '32px', letterSpacing: '-1px' }}>TimesAI</h2>
                        </Link>
                     </div>
                     <div className="logo d-none text-center">
                        <Link href="/"><Image src={img_3} alt="" /></Link>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="hl-right-side-four">
                        <div className="sign-in">
                           <Link href="/login"><i className="flaticon-user"></i>Login</Link>
                        </div>
                        <div className="subscribe-btn">
                           <Link href="/contact" className="btn btn-two">Subscribe</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default HeaderTopSix

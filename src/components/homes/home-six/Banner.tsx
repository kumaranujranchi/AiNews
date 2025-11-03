import Image from "next/image";
import Link from "next/link";

import bannerThumb_1 from "@/assets/img/blog/nw_banner_post03.jpg";
import bannerThumb_2 from "@/assets/img/blog/nw_banner_post01.jpg";
import bannerThumb_3 from "@/assets/img/blog/nw_banner_post02.jpg";
import AdBanner from "./AdBanner";
import PoliticsPost from "./PoliticsPost";
import TodayPost from "./TodayPost";
import BannerSidebar from "./BannerSidebar";

const Banner = () => {
   return (

      <section className="banner-post-area-five pt-50">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-9">
                  <div className="news-banner-post-wrap">
                     <div className="row">
                        <div className="col-67 order-0 order-lg-2">
                           <div className="banner-post-six">
                              <div className="banner-post-thumb-six">
                                 <Link href="/blog-details"><Image src={bannerThumb_1} alt="" /></Link>
                              </div>
                              <div className="banner-post-content-six">
                                 <Link href="/blog" className="post-tag-two">Politics</Link>
                                 <h2 className="post-title bold-underline"><Link href="/blog-details">Beyond Algorithms Skills Of Designers That AI Can’t Replicate</Link>
                                 </h2>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                                       <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                                       <li><i className="flaticon-history"></i>20 Mins</li>
                                    </ul>
                                 </div>
                                 <p>Browned butter and brown sugar caramelly goodness, crispy edgend software centers and melty little puddles of chocolate first favorite.</p>
                              </div>
                           </div>
                        </div>

                        <div className="col-33">
                           <div className="news-banner-small-post">
                              <div className="banner-post-five">
                                 <div className="banner-post-thumb-five">
                                    <Link href="/blog-details"><Image src={bannerThumb_2} alt="" /></Link>
                                 </div>
                                 <div className="banner-post-content-five">
                                    <Link href="/blog" className="post-tag-four">Business</Link>
                                    <h2 className="post-title"><Link href="/blog-details">A Pragmatist’s Guide To Theire Lean User Research</Link>
                                    </h2>
                                    <div className="blog-post-meta">
                                       <ul className="list-wrap">
                                          <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                                          <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                              <div className="banner-post-five">
                                 <div className="banner-post-thumb-five">
                                    <Link href="/blog-details"><Image src={bannerThumb_3} alt="" /></Link>
                                 </div>
                                 <div className="banner-post-content-five">
                                    <Link href="/blog" className="post-tag-four">Tech</Link>
                                    <h2 className="post-title"><Link href="/blog-details">Five Data-Loading Patterns To Boost Web Performance</Link>
                                    </h2>
                                    <div className="blog-post-meta">
                                       <ul className="list-wrap">
                                          <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                                          <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <AdBanner />
                  <PoliticsPost />
                  <TodayPost />
               </div>
               <BannerSidebar />
            </div>
         </div>
      </section>
   )
}

export default Banner

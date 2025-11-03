"use client"
import Category from "@/components/common/Category"
import SocialIcon from "@/components/common/SocialIcon"
import Image from "next/image"
import Link from "next/link";

import sidebarThumb from "@/assets/img/blog/blog_rc_post.jpg";

const BlogSidebar = () => {
   return (
      <div className="col-30">
         <div className="sidebar-wrap">
            <div className="sidebar-widget">
               <div className="sidebar-search">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search . . ." />
                     <button type="submit"><i className="flaticon-search"></i></button>
                  </form>
               </div>
            </div>

            <div className="sidebar-widget sidebar-widget-two">
               <Category />
            </div>

            <div className="sidebar-widget sidebar-widget-two">
               <div className="widget-title mb-25">
                  <h2 className="title">Subscribe & Followers</h2>
                  <div className="section-title-line"></div>
               </div>
               <div className="sidebar-social-wrap">
                  <SocialIcon />
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <div className="widget-title mb-30">
                  <h6 className="title">Recent News</h6>
                  <div className="section-title-line"></div>
               </div>
               <div className="hot-post-wrap">
                  <div className="hot-post-item">
                     <div className="hot-post-thumb">
                        <Link href="/blog-details"><Image src={sidebarThumb} alt="" /></Link>
                     </div>
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag">Adventure</Link>
                        <h4 className="post-title"><Link href="/blog-details">Inspiring Web Design And UX Showcases</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              <li><i className="flaticon-history"></i>20 Mins</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="hot-post-item">
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag">Culture</Link>
                        <h4 className="post-title"><Link href="/blog-details">Getting Internationalization (i18n) Right With Remix And</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              <li><i className="flaticon-history"></i>20 Mins</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="hot-post-item">
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag">Travel</Link>
                        <h4 className="post-title"><Link href="/blog-details">A Step-By-Step Guide To Building Accessible Carousels</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              <li><i className="flaticon-history"></i>20 Mins</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <div className="sidebar-newsletter">
                  <div className="icon"><i className="flaticon-envelope"></i></div>
                  <h4 className="title">Daily Newsletter</h4>
                  <p>Get all the top stories from Blogs to keep track.</p>
                  <div className="sidebar-newsletter-form-two">
                     <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-grp">
                           <input type="text" placeholder="Enter your e-mail" />
                           <button type="submit" className="btn">Subscribe Now</button>
                        </div>
                        <div className="form-check">
                           <input type="checkbox" className="form-check-input" id="checkbox" />
                           <label htmlFor="checkbox">I agree to the terms & conditions</label>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogSidebar

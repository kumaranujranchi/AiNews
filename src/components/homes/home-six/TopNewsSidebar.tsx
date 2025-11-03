import Image from "next/image"
import Link from "next/link"

import thumb_1 from "@/assets/img/blog/nw_banner_post01.jpg";
import thumb_2 from "@/assets/img/images/sidebar_img06.jpg";

const TopNewsSidebar = () => {
   return (
      <div className="col-xl-3 col-lg-8">
         <div className="sidebar-wrap-three">
            <div className="sidebar-widget-three">
               <div className="sidebar-newsletter sidebar-newsletter-two">
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
            <div className="sidebar-widget-three">
               <div className="widget-title widget-title-three mb-20">
                  <div className="section-title-line"></div>
                  <h2 className="title">Business</h2>
               </div>
               <div className="hot-post-wrap">
                  <div className="hot-post-item hot-post-item-two">
                     <div className="hot-post-thumb">
                        <Link href="/blog-details"><Image src={thumb_1} alt="" /></Link>
                     </div>
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag-four">Audit</Link>
                        <h4 className="post-title"><Link href="/blog-details">Take a Look Back at the Moseret Gala Red Carpet Ever</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="hot-post-item hot-post-item-two">
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag-four">Marketing</Link>
                        <h4 className="post-title"><Link href="/blog-details">Take a Look Back at the Moseret Gala Red Carpet Ever</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className="hot-post-item hot-post-item-two">
                     <div className="hot-post-content">
                        <Link href="/blog" className="post-tag-four">Marketing</Link>
                        <h4 className="post-title"><Link href="/blog-details">Take a Look Back at the Moseret Gala Red Carpet Ever</Link></h4>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <div className="sidebar-img">
                  <Link href="#">
                     <Image src={thumb_2} alt="" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TopNewsSidebar

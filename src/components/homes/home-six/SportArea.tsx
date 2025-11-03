import Link from "next/link"
import Image from "next/image"

import thumb_1 from "@/assets/img/blog/sports_post01.jpg";
import home_6_data from "@/data/HomeSixData";

const SportArea = () => {
   return (
      <div className="sports-post-wrap">
         <div className="section-title-wrap mb-30">
            <div className="section-title section-title-four">
               <h2 className="title">Sports</h2>
            </div>
            <div className="section-title-line"></div>
         </div>
         <div className="row">
            <div className="col-lg-8">
               <div className="sports-post">
                  <div className="sports-post-thumb">
                     <Link href="/blog-details"><Image src={thumb_1} alt="" /></Link>
                  </div>
                  <div className="sports-post-content">
                     <Link href="/blog" className="post-tag-four">Swimming</Link>
                     <h4 className="post-title bold-underline"><Link href="/blog-details">How To Protect Your App With Threat Model Based On w To Protect Your App With Based</Link></h4>
                     <div className="blog-post-meta">
                        <ul className="list-wrap">
                           <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-lg-4">
               <div className="sidebar-wrap sidebar-wrap-four">
                  {home_6_data.filter((items) => items.page === "sport").map((item) => (
                     <div key={item.id} className="horizontal-post-four horizontal-post-five">
                        <div className="horizontal-post-thumb-four">
                           <Link href="/blog-details"><Image src={item.thumb} alt="" /></Link>
                        </div>
                        <div className="horizontal-post-content-four">
                           <Link href="/blog" className="post-tag-four">{item.tag}</Link>
                           <h4 className="post-title"><Link href="/blog-details">{item.title}</Link></h4>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default SportArea

import Image from "next/image";
import Link from "next/link";

import politicThumb from "@/assets/img/blog/politics_post01.jpg";

const PoliticsPost = () => {
   return (
      <section className="politics-post-area">
         <div className="section-title-wrap">
            <div className="section-title section-title-four">
               <h2 className="title">Politics</h2>
               <div className="section-title-line"></div>
            </div>
         </div>
         <div className="politics-post-wrap">
            <div className="row">
               <div className="col-69">
                  <div className="politics-post">
                     <div className="politics-post-thumb">
                        <Link href="/"><Image src={politicThumb} alt="" /></Link>
                     </div>
                     <div className="politics-post-content">
                        <Link href="/blog" className="post-tag-four">Politics</Link>
                        <h2 className="post-title"><Link href="/blog-details">Warns Financial Institutions to be on Watch for Russian</Link></h2>
                        <div className="blog-post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                              <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                           </ul>
                        </div>
                        <p>Browned butter browa melly ness crispy edgend software centers puddles of chocolate.</p>
                        <div className="view-all-btn">
                           <Link href="/blog" className="link-btn">Read More
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
               <div className="col-31">
                  <div className="politics-post-wrap-two">
                     <div className="politics-post-two">
                        <div className="politics-post-content-two">
                           <h2 className="post-title"><Link href="/blog-details">UX Checklists For Interface Designers</Link></h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className="politics-post-two">
                        <div className="politics-post-content-two">
                           <h2 className="post-title"><Link href="/blog-details">The Realities And Myths Of Contrast And Color</Link></h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className="politics-post-two">
                        <div className="politics-post-content-two">
                           <h2 className="post-title"><Link href="/blog-details">Designing Better Error Messages UX</Link></h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default PoliticsPost

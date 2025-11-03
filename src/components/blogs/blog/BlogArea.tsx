"use client"
import inner_blog_data from "@/data/InnerBlogData"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import ReactPaginate from "react-paginate";
import BlogSidebar from "../common-blog/BlogSidebar"

const BlogArea = ({ style }: any) => {

   const blog = inner_blog_data.filter(items => items.page === "blog_1");

   const itemsPerPage = 6;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = blog.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(blog.length / itemsPerPage);
   // click to request another page.
   const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % blog.length;
      setItemOffset(newOffset);
   };

   return (
      <section className="blog-area pt-60 pb-60">
         <div className="container">
            <div className={`${style ? "author-inner-wrap" : "author-inner-wrap blog-inner-wrap"}`}>
               <div className="row justify-content-center">
                  <div className={style?"col-70":"col-70 order-0 order-xl-2"}>
                     <div className="weekly-post-item-wrap">
                        {currentItems.filter((items) => items.page === "blog_1").map((item) => (
                           <div key={item.id} className="weekly-post-item weekly-post-four">
                              <div className="weekly-post-thumb">
                                 <Link href={`/blog-details/${item.id}`}><Image src={item.thumb} alt="" /></Link>
                              </div>
                              <div className="weekly-post-content">
                                 <Link href="/blog" className="post-tag">{item.tag}</Link>
                                 <h2 className="post-title"><Link href={`/blog-details/${item.id}`}>{item.title}</Link></h2>
                                 <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                       <li><i className="flaticon-calendar"></i>{item.date}</li>
                                       <li><i className="flaticon-history"></i>{item.time}</li>
                                    </ul>
                                 </div>
                                 <p>{item.desc}</p>
                                 <div className="view-all-btn">
                                    <Link href={`/blog-details/${item.id}`} className="link-btn">Read More
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
                        ))}
                     </div>

                     <div className="pagination-wrap mt-60">
                        <nav aria-label="Page navigation example">
                           <ReactPaginate
                              breakLabel="..."
                              nextLabel=""
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              pageCount={pageCount}
                              previousLabel=""
                              renderOnZeroPageCount={null}
                              className="pagination list-wrap"
                           />
                        </nav>
                     </div>
                  </div>

                  <BlogSidebar />
               </div>
            </div>
         </div>
      </section>
   )
}

export default BlogArea

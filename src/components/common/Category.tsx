import Link from "next/link"

const Category = () => {
   return (
      <>
         <div className="widget-title mb-30">
            <h6 className="title">Hot Categories</h6>
            <div className="section-title-line"></div>
         </div>
         <div className="sidebar-categories">
            <ul className="list-wrap">
               <li>
                  <Link href="/blog" style={{ backgroundImage: `url(/assets/img/images/t_cat_img01.jpg)` }}>
                     <span className="post-tag post-tag-three">Technology</span>
                     <span className="right-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                        </svg>
                     </span>
                  </Link>
               </li>
               <li>
                  <Link href="/blog" style={{ backgroundImage: `url(/assets/img/images/t_cat_img02.jpg)` }}>
                     <span className="post-tag post-tag-three">Mobile</span>
                     <span className="right-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                        </svg>
                     </span>
                  </Link>
               </li>
               <li>
                  <Link href="/blog" style={{ backgroundImage: `url(/assets/img/images/t_cat_img03.jpg)` }}>
                     <span className="post-tag post-tag-three">Gadget</span>
                     <span className="right-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                        </svg>
                     </span>
                  </Link>
               </li>
               <li>
                  <Link href="/blog" style={{ backgroundImage: `url(/assets/img/images/t_cat_img04.jpg)` }}>
                     <span className="post-tag post-tag-three">News</span>
                     <span className="right-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                           <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor"></path>
                        </svg>
                     </span>
                  </Link>
               </li>
            </ul>
         </div>
      </>
   )
}

export default Category

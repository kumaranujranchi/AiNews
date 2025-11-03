import Image from "next/image"
import Link from "next/link"

import thumb_1 from "@/assets/img/blog/bd_post01.jpg"
import thumb_2 from "@/assets/img/blog/bd_post02.jpg"

const BlogPrevNext = () => {
   return (
      <div className="pev-next-post-wrap">
         <div className="row">
            <div className="col-md-6">
               <div className="post-item">
                  <div className="thumb">
                     <Link href="/blog-details"><Image src={thumb_1} alt="" /></Link>
                  </div>
                  <div className="content">
                     <span>Previous Post</span>
                     <h5 className="post-title"><Link href="/blog-details">Make May Magnificent <br /> Wallpapers Edition</Link></h5>
                  </div>
               </div>
            </div>
            <div className="col-md-6">
               <div className="post-item next-post">
                  <div className="thumb">
                     <Link href="/blog-details"><Image src={thumb_2} alt="" /></Link>
                  </div>
                  <div className="content">
                     <span>Next Post</span>
                     <h5 className="post-title"><Link href="/blog-details">Write Better By Borrowing <br /> Ideas JavaScript Functions</Link></h5>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogPrevNext

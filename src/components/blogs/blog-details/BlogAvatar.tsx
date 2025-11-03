import Image from "next/image"
import Link from "next/link"

import avatarThumb_1 from "@/assets/img/images/avatar.png"

const BlogAvatar = () => {
   return (
      <div className="blog-avatar-wrap mb-50">
         <div className="blog-avatar-img">
            <Link href="#"><Image src={avatarThumb_1} alt="img" /></Link>
         </div>
         <div className="blog-avatar-info">
            <span className="designation">Author</span>
            <h4 className="name"><Link href="/author">Cameron Williamson</Link></h4>
            <p>Finanappreciate your trust greatly Our clients choose dentace ducts because kneer ow we are the best area Awaitingare really.</p>
         </div>
      </div>
   )
}

export default BlogAvatar

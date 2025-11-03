import BlogDetailsContent from "./BlogDetailsContent"
import BlogAvatar from "./BlogAvatar"
import BlogPrevNext from "./BlogPrevNext"
import BlogComment from "./BlogComment"
import BlogForm from "@/components/forms/BlogForm"
import BlogSidebar from "../common-blog/BlogSidebar"

const BlogDetailsArea = ({ style,single_blog }: any) => {
   return (
      <section className="blog-details-area pt-60 pb-60">
         <div className="container">
            <div className="author-inner-wrap">
               <div className="row justify-content-center">
                  <div className={`col-70 ${style ? "order-0 order-xl-2" : ""}`}>
                     <div className="blog-details-wrap">
                        <BlogDetailsContent single_blog={single_blog} />
                        <BlogAvatar />
                        <BlogPrevNext />
                        <BlogComment />
                        <BlogForm />
                     </div>
                  </div>
                  <BlogSidebar />
               </div>
            </div>
         </div>
      </section>
   )
}

export default BlogDetailsArea

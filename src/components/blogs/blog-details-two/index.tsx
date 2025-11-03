import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BlogDetailsArea from "../blog-details/BlogDetailsArea"

const BlogDetailsTwo = () => {
   return (
      <>
         <HeaderOne />
         <main className="fix">
            <Breadcrumbs page="blogs" style={true} />
            <BlogDetailsArea style={true} />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default BlogDetailsTwo

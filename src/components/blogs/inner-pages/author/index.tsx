import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import AuthorArea from "./AuthorArea"

const Author = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <Breadcrumbs page="Author Page" style={false} />
            <AuthorArea />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default Author

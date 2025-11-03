import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import ContactArea from "./ContactArea"
import FooterNews from "@/components/common/FooterNews"
import ContactMap from "./ContactMap"

const Contact = () => {
   return (
      <>
         <HeaderOne />
         <main className="fix">
            <Breadcrumbs page="Contact With Us" style={false} />
            <ContactArea />
            <ContactMap />
            <FooterNews />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default Contact

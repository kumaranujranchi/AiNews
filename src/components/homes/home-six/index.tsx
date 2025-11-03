import Banner from "./Banner"
import EditorPost from "./EditorPost"
import AdBannerTwo from "./AdBannerTwo"
import TopNews from "./TopNews"
import Newsletter from "./Newsletter"
import FooterThree from "@/layouts/footers/FooterThree"
import HeaderSix from "@/layouts/headers/HeaderSix"

const HomeSix = () => {
   return (
      <>
         <HeaderSix />
         <Banner />
         <AdBannerTwo />
         <EditorPost />
         <TopNews />
         <Newsletter />
         <FooterThree />
      </>
   )
}

export default HomeSix

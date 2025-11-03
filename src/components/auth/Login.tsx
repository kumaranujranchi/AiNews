import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderSix from "@/layouts/headers/HeaderSix"
import LoginArea from "./LoginArea"

const Login = () => {
   return (
      <>
         <HeaderSix />
         <main className="fix">
            <Breadcrumbs page="Login" style={false} />
            <section className="contact-area pt-80 pb-50">
               <div className="container">
                  <LoginArea />
               </div>
            </section>
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default Login
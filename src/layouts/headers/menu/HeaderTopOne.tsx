import Link from "next/link"

const HeaderTopOne = () => {
   return (
      <div className="header-top-wrap">
         <div className="container-fluid p-0">
            <div className="row align-items-center">
               <div className="col-md-6">
                  <div className="header-top-menu">
                     <ul className="list-wrap">
                        <li><Link href="/contact">Forum</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Faq’s</Link></li>
                        <li><Link href="/blog">All Recipes</Link></li>
                     </ul>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="header-top-social">
                     <h5 className="title">Follow Us:</h5>
                     <ul className="list-wrap">
                        <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTopOne;

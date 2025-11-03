"use client"
import Link from "next/link"

const FooterNews = () => {
   return (
      <section className="newsletter-area-three">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="newsletter-wrap-three">
                     <div className="newsletter-content">
                        <h2 className="title">Get Our Latest News & Update</h2>
                     </div>
                     <div className="newsletter-form">
                        <form onSubmit={(e) => e.preventDefault()}>
                           <div className="form-grp">
                              <input type="text" placeholder="Name" />
                           </div>
                           <div className="form-grp">
                              <input type="email" placeholder="E-mail" />
                           </div>
                           <button type="submit" className="btn">Submit Now</button>
                        </form>
                     </div>
                     <div className="newsletter-social">
                        <h4 className="title">Follow Us:</h4>
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
      </section>
   )
}

export default FooterNews

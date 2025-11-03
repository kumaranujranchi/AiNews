import Image from "next/image"
import Link from "next/link"

import infoThumb from "@/assets/img/images/author_img.png"

const AuthorInfo = () => {
   return (
      <div className="author-wrap">
         <div className="author-thumb">
            <Image src={infoThumb} alt="" />
         </div>
         <div className="author-content">
            <h4 className="name">David Mark</h4>
            <p>The was popularised in their morwith the release offer Letraset sheeteis Moreme assages and more recently with desktop publishing software.m dolor sit amet consectetur adipiscing elit.</p>
            <div className="author-social">
               <ul className="list-wrap">
                  <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                  <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                  <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                  <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default AuthorInfo

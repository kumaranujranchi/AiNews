import Image from "next/image"
import Link from "next/link"

import comment_1 from "@/assets/img/images/comment01.png";
import comment_2 from "@/assets/img/images/comment02.png";

const BlogComment = () => {
   return (
      <div className="comments-wrap">
         <h3 className="comments-wrap-title">02 Comments</h3>
         <div className="latest-comments">
            <ul className="list-wrap">
               <li>
                  <div className="comments-box">
                     <div className="comments-avatar">
                        <Image src={comment_1} alt="img" />
                     </div>
                     <div className="comments-text">
                        <div className="avatar-name">
                           <h6 className="name">Alebary keon</h6>
                           <span className="date">27 August, 2024</span>
                        </div>
                        <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                        <Link href="#" className="reply-btn">Reply</Link>
                     </div>
                  </div>
                  <ul className="children">
                     <li>
                        <div className="comments-box">
                           <div className="comments-avatar">
                              <Image src={comment_2} alt="img" />
                           </div>
                           <div className="comments-text">
                              <div className="avatar-name">
                                 <h6 className="name">Lukas Javeb</h6>
                                 <span className="date">27 August, 2024</span>
                              </div>
                              <p>Finanappreciate your trust greatly Our clients choose dentace ducts because know we are the best area Awaitingare really.</p>
                              <Link href="#" className="reply-btn">Reply</Link>
                           </div>
                        </div>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default BlogComment

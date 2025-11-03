import Image, { StaticImageData } from "next/image";
import React from "react";
import Link from "next/link";

import thumb_1 from "@/assets/img/images/team_img01.jpg"
import thumb_2 from "@/assets/img/images/team_img02.jpg"
import thumb_3 from "@/assets/img/images/team_img03.jpg"
import thumb_4 from "@/assets/img/images/team_img04.jpg"

interface DataType {
   id: number;
   thumb: StaticImageData,
   title: string;
   des: string;
}[];

const team_data: DataType[] = [
   {
      id: 1,
      thumb: thumb_1,
      title: "Robert Willy",
      des: "Senior Manager",
   },
   {
      id: 2,
      thumb: thumb_2,
      title: "Ralph Edwards",
      des: "CEO",
   },
   {
      id: 3,
      thumb: thumb_3,
      title: "Kristin Watson",
      des: "HR Admin",
   },
   {
      id: 4,
      thumb: thumb_4,
      title: "Jerome Bell",
      des: "Accounts",
   },
]
const Team = () => {
   return (
      <section className="team-area">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section-title-five text-center mb-30">
                     <span className="sub-title">Team We Have</span>
                     <h2 className="title">About Our Energetic Team</h2>
                     <p>release of Letraset sheets containing Lorem Ipsum passages <br /> and more recently with desktop publishing</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {team_data.map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-10">
                     <div className="team-item">
                        <div className="team-thumb">
                           <Image src={item.thumb} alt="" />
                           <div className="team-social">
                              <ul className="list-wrap">
                                 <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                                 <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                                 <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                                 <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                              </ul>
                           </div>
                        </div>
                        <div className="team-content">
                           <h4 className="title">{item.title}</h4>
                           <span>{item.des}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Team

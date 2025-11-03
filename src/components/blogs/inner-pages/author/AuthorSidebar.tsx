import Image, { StaticImageData } from "next/image";

import thumb_1 from "@/assets/img/blog/author_popular_post01.jpg"
import thumb_2 from "@/assets/img/blog/author_popular_post02.jpg"
import thumb_3 from "@/assets/img/blog/author_popular_post03.jpg"
import thumb_4 from "@/assets/img/blog/author_popular_post04.jpg"
import Link from "next/link";
import SocialIcon from "@/components/common/SocialIcon";
import Category from "@/components/common/Category";
import Newsletter from "@/components/common/Newsletter";

interface DataType {
   id: number;
   thumb: StaticImageData;
   tag: string;
   title: string;
   date: string;
}[];

const sidebar_data: DataType[] = [
   {
      id: 1,
      thumb: thumb_1,
      tag: "TECH",
      title: "The Butter Chocolate Cookies Daily",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      thumb: thumb_2,
      tag: "POLITICS",
      title: "Headless In Times Of Accessibility",
      date: "27 AUGUST, 2024",
   },
   {
      id: 3,
      thumb: thumb_3,
      tag: "FOOD",
      title: "Making S WAI-ARIA A Comprehensive Guide",
      date: "27 AUGUST, 2024",
   },
   {
      id: 4,
      thumb: thumb_4,
      tag: "SPORTS",
      title: "UX Checklists For Interface Designers",
      date: "27 AUGUST, 2024",
   },
];


const AuthorSidebar = () => {
   return (
      <div className="col-30">
         <div className="sidebar-wrap">
            <div className="sidebar-widget">
               <div className="sidebar-search">
                  <form onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Search . . ." />
                     <button type="submit"><i className="flaticon-search"></i></button>
                  </form>
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <div className="widget-title mb-25">
                  <h2 className="title">Popular Post</h2>
                  <div className="section-title-line"></div>
               </div>
               <div className="popular-post-wrap">
                  {sidebar_data.map((item) => (
                     <div key={item.id} className="popular-post">
                        <div className="thumb">
                           <Link href="/blog-details"><Image src={item.thumb} alt="" /></Link>
                        </div>
                        <div className="content">
                           <Link href="/blog" className="post-tag-two">{item.tag}</Link>
                           <h2 className="post-title"><Link href="/blog-details">{item.title}</Link></h2>
                           <div className="blog-post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <div className="widget-title mb-25">
                  <h2 className="title">Subscribe & Followers</h2>
                  <div className="section-title-line"></div>
               </div>
               <div className="sidebar-social-wrap">
                  <SocialIcon />
               </div>
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <Category />
            </div>
            <div className="sidebar-widget sidebar-widget-two">
               <Newsletter />
            </div>
         </div>
      </div>
   )
}

export default AuthorSidebar

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import story_1 from "@/assets/img/blog/stories_post01.jpg"
import story_2 from "@/assets/img/blog/stories_post02.jpg"
import story_3 from "@/assets/img/blog/stories_post03.jpg"
import story_4 from "@/assets/img/blog/stories_post04.jpg"

interface DataType {
   id: number;
   tag: string;
   thumb: StaticImageData;
   title: string;
   date: string;
}[];

const story_data: DataType[] = [
   {
      id: 1,
      tag: "POLITICS",
      thumb: story_1,
      title: "Lessons Learned As A Designer-Founder",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      tag: "MODERN",
      thumb: story_2,
      title: "A Complete Guide To Live Validation UX",
      date: "27 AUGUST, 2024",
   },
   {
      id: 3,
      tag: "SPORTS",
      thumb: story_3,
      title: "Building A Retro Draggable Web",
      date: "27 AUGUST, 2024",
   },
   {
      id: 4,
      tag: "FASHION",
      thumb: story_4,
      title: "Rethinking Star Ratings For Readers",
      date: "27 AUGUST, 2024",
   },
]

const StorySidebarOne = () => {
   return (
      <div className="sidebar-widget-three">
         <div className="widget-title widget-title-three mb-20">
            <div className="section-title-line"></div>
            <h2 className="title">Top Stories</h2>
         </div>
         <div className="stories-post-wrap">
            {story_data.map((item) => (
               <div key={item.id} className="stories-post">
                  <div className="stories-post-thumb">
                     <Link href="/blog-details"><Image src={item.thumb} alt="" /></Link>
                  </div>
                  <div className="stories-post-content">
                     <Link href="/blog" className="post-tag-four">{item.tag}</Link>
                     <h5 className="post-title"><Link href="/blog-details">{item.title}</Link></h5>
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
   )
}

export default StorySidebarOne;

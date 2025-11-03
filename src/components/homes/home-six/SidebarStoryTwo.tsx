import Link from "next/link";

interface DataType {
   id: number;
   title: string;
   date: string;
}[];

const story_data: DataType[] = [
   {
      id: 1,
      title: "Awersing Instagram Tawo Promote Your",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      title: "Rethinking Star Ratings For Readers",
      date: "27 AUGUST, 2024",
   },
   {
      id: 3,
      title: "Headless In Times Of Accessibility",
      date: "27 AUGUST, 2024",
   },
   {
      id: 4,
      title: "Making S WAI-ARIA A Comprehensive Guide",
      date: "27 AUGUST, 2024",
   },
   {
      id: 5,
      title: "UX Checklists For Interface Designers",
      date: "27 AUGUST, 2024",
   },
]

const SidebarStoryTwo = () => {
   return (
      <div className="sidebar-widget-three">
         <div className="widget-title widget-title-three mb-20">
            <div className="section-title-line"></div>
            <h2 className="title">Top Stories</h2>
         </div>
         <div className="stories-post-wrap-two">
            {story_data.map((item) => (
               <div key={item.id} className="stories-post-two">
                  <h2 className="number">{item.id}.</h2>
                  <div className="stories-post-content">
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

export default SidebarStoryTwo

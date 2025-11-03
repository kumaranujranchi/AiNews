import Link from "next/link"

const SectionTitle = ({title}:any) => {
   return (
      <div className="section-title-wrap mb-30">
         <div className="section-title">
            <h2 className="title">{title}</h2>
         </div>
         <div className="view-all-btn">
            <Link href="/blog" className="link-btn">View All
               <span className="svg-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                     <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                     <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                  </svg>
               </span>
            </Link>
         </div>
         <div className="section-title-line"></div>
      </div>
   )
}

export default SectionTitle

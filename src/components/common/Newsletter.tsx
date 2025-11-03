"use client"

const Newsletter = () => {
   return (
      <div className="sidebar-newsletter">
         <div className="icon"><i className="flaticon-envelope"></i></div>
         <h4 className="title">Daily Newsletter</h4>
         <p>Get all the top stories from Blogs to keep track.</p>
         <div className="sidebar-newsletter-form">
            <form onSubmit={(e) => e.preventDefault()}>
               <input type="text" placeholder="Enter your e-mail" />
               <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                     <path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="currentcolor" />
                  </svg>
               </button>
            </form>
         </div>
      </div>
   )
}

export default Newsletter

import Link from "next/link"

const SocialIcon = () => {
   return (
      <ul className="list-wrap">
         <li><Link href="#"><i className="fab fa-facebook-f"></i>facebook</Link></li>
         <li><Link href="#"><i className="fab fa-twitter"></i>twitter</Link></li>
         <li><Link href="#"><i className="fab fa-instagram"></i>instagram</Link></li>
         <li><Link href="#"><i className="fab fa-youtube"></i>youtube</Link></li>
         <li><Link href="#"><i className="fab fa-linkedin-in"></i>LinkedIn</Link></li>
         <li><Link href="#"><i className="fab fa-pinterest-p"></i>Pinterest</Link></li>
      </ul>
   )
}

export default SocialIcon

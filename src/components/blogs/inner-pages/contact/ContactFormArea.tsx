import ContactForm from "@/components/forms/ContactForm"
import Image from "next/image"

import contactThumb from "@/assets/img/images/contact_img.jpg"

const ContactFormArea = () => {
   return (
      <div className="row justify-content-center">
         <div className="col-lg-6 col-md-10">
            <div className="contact-img">
               <Image src={contactThumb} alt="" />
            </div>
         </div>
         <div className="col-lg-6">
            <div className="contact-form">
               <h4 className="title">Drop Us a Message</h4>
               <p>Have a question? Need help? Don&apos;t hesitate, drop us a line</p>
               <ContactForm />
               <p className="ajax-response mb-0"></p>
            </div>
         </div>
      </div>
   )
}

export default ContactFormArea

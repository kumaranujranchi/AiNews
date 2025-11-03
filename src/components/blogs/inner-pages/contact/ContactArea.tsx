import Image, { StaticImageData } from "next/image";

import icon_1 from "@/assets/img/icon/contact_icon01.svg"
import icon_2 from "@/assets/img/icon/contact_icon02.svg"
import icon_3 from "@/assets/img/icon/contact_icon03.svg"
import ContactFormArea from "./ContactFormArea";

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   addres: JSX.Element;
}[];

const contact_data: DataType[] = [
   {
      id: 1,
      icon: icon_1,
      title: "Location",
      addres: (<>2118 Thornridge Cir. Syracuse</>),
   },
   {
      id: 2,
      icon: icon_2,
      title: "E-mail",
      addres: (<>Info@ghoradimgmail.com</>),
   },
   {
      id: 3,
      icon: icon_3,
      title: "Phone",
      addres: (<>+123 98598 000, +123 8855 2222</>),
   },
];
const ContactArea = () => {
   return (
      <section className="contact-area pt-80 pb-50">
         <div className="container">
            <div className="contact-info-wrap">
               <div className="row justify-content-center">
                  {contact_data.map((item) => (
                     <div key={item.id} className="col-xl-4 col-lg-6">
                        <div className="contact-info-item">
                           <div className="icon">
                              <Image src={item.icon} alt="" />
                           </div>
                           <div className="content">
                              <h5 className="title">{item.title}</h5>
                              <p>{item.addres}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <ContactFormArea />
            </div>
         </div>
      </section>
   )
}

export default ContactArea

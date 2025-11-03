interface DataType {
   id: number;
   title: string;
   class_name: string;
   footer_link: {
      link: string;
      title: string;
   }[];
}[];

const footer_data: DataType[] = [
   {
      id: 1,
      title: "Company",
      class_name: "col-lg-2 col-md-5",
      footer_link: [
         { link: "/about", title: "About Us" },
         { link: "/contact", title: "The Test Kitchen" },
         { link: "/contact", title: "Podcast" },
         { link: "/contact", title: "Events" },
         { link: "/contact", title: "Jobs" },
      ]
   },
   {
      id: 2,
      title: "Get Help",
      class_name: "col-lg-3 col-md-4",
      footer_link: [
         { link: "/contact", title: "Contact & Faq" },
         { link: "/contact", title: "Oders & Returns" },
         { link: "/contact", title: "Gift Cards" },
         { link: "/contact", title: "Register" },
         { link: "/contact", title: "Catalog" },
      ]
   },
   {
      id: 3,
      title: "Explore",
      class_name: "col-lg-2 col-md-4",
      footer_link: [
         { link: "/contact", title: "The Shop" },
         { link: "/contact", title: "Recipes" },
         { link: "/contact", title: "Food" },
         { link: "/contact", title: "Travel" },
         { link: "/contact", title: "Hotline" },
      ]
   },
   {
      id: 4,
      title: "Follow us On",
      class_name: "col-lg-2 col-md-4",
      footer_link: [
         { link: "#", title: "facebook" },
         { link: "#", title: "Twitter" },
         { link: "#", title: "Instagram" },
         { link: "#", title: "Youtube" },
         { link: "#", title: "Pinterest" },
      ]
   },
];

export default footer_data;
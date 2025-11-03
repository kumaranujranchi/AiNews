import { StaticImageData } from "next/image";

import blogThumb_1 from "@/assets/img/blog/weekly_post01.jpg";
import blogThumb_2 from "@/assets/img/blog/weekly_post02.jpg";
import blogThumb_3 from "@/assets/img/blog/weekly_post03.jpg";
import blogThumb_4 from "@/assets/img/blog/weekly_post04.jpg";

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   tag: string;
   title: string;
   date: string;
   time: string;
   desc: string;
}[];

const blog_data: DataType[] = [
   {
      id: 1,
      page: "home_2",
      thumb: blogThumb_1,
      tag: "FIGHTER",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      title: "Taking The Stress Out Of Design System Management",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 2,
      page: "home_2",
      thumb: blogThumb_2,
      tag: "RACING",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      title: "Boosting Productivity For Designers With Efficient Tools",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 3,
      page: "home_2",
      thumb: blogThumb_3,
      tag: "ACTION",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      title: "How To Prioritize User Security When Collecting Offline Data",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
   {
      id: 4,
      page: "home_2",
      thumb: blogThumb_4,
      tag: "ANIMATION",
      date: "27 AUGUST, 2024",
      time: "20 MINS",
      title: "The Anatomy Of Themed Design System Components",
      desc: "Browned Butter And Brown Sugar Caramelly Oodness Crispy Edgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite.",
   },
];

export default blog_data;
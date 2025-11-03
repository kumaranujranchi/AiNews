import { StaticImageData } from "next/image";

import todayPostThumb_1 from "@/assets/img/blog/today_post01.jpg";
import todayPostThumb_2 from "@/assets/img/blog/today_post02.jpg";
import todayPostThumb_3 from "@/assets/img/blog/nw_banner_post01.jpg";

import editorPostThumb_1 from "@/assets/img/blog/nw_editor_post01.jpg";
import editorPostThumb_2 from "@/assets/img/blog/nw_editor_post02.jpg";
import editorPostThumb_3 from "@/assets/img/blog/nw_editor_post03.jpg";
import editorPostThumb_4 from "@/assets/img/blog/nw_editor_post04.jpg";

import topPostThumb_1 from "@/assets/img/blog/top_news_post02.jpg";
import topPostThumb_2 from "@/assets/img/blog/top_news_post03.jpg";
import topPostThumb_3 from "@/assets/img/blog/top_news_post04.jpg";

import sportPostThumb_1 from "@/assets/img/blog/sports_post02.jpg";
import sportPostThumb_2 from "@/assets/img/blog/sports_post03.jpg";
import sportPostThumb_3 from "@/assets/img/blog/sports_post04.jpg";
import sportPostThumb_4 from "@/assets/img/blog/sports_post05.jpg";

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   tag: string;
   title: string;
   date: string;
   time?: string;
   video?: boolean;
}[];

const home_6_data: DataType[] = [
   {
      id: 1,
      page: "today_post",
      thumb: todayPostThumb_1,
      tag: "SPORTS",
      title: "Designing Better Error Messages UX",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      page: "today_post",
      thumb: todayPostThumb_2,
      tag: "TECH",
      title: "Implementing A Reset Password Feature With Dynamic Routes",
      date: "27 AUGUST, 2024",
      video:true,
   },
   {
      id: 3,
      page: "today_post",
      thumb: todayPostThumb_3,
      tag: "POLITICS",
      title: "An Introduction To Context Propagation In JavaScript",
      date: "27 AUGUST, 2024",
   },

   // editor_post

   {
      id: 1,
      page: "editor_post",
      thumb: editorPostThumb_1,
      tag: "Sports",
      title: "Everything Developers Must Know About Figma",
      date: "27 AUGUST, 2024",
      time: "20 Mins",
      video: true
   },
   {
      id: 2,
      page: "editor_post",
      thumb: editorPostThumb_2,
      tag: "Tech",
      title: "Phone Numbers For Web Designers",
      date: "27 AUGUST, 2024",
      time: "20 Mins",
   },
   {
      id: 3,
      page: "editor_post",
      thumb: editorPostThumb_3,
      tag: "Food",
      title: "How To Create Dynamic Donut Tailwind React",
      date: "27 AUGUST, 2024",
      time: "20 Mins",
      video: true
   },
   {
      id: 4,
      page: "editor_post",
      thumb: editorPostThumb_4,
      tag: "News",
      title: "An Introduction To Context Propagation In JavaScript",
      date: "27 AUGUST, 2024",
      time: "20 Mins",
   },
   {
      id: 5,
      page: "editor_post",
      thumb: editorPostThumb_3,
      tag: "Food",
      title: "How To Create Dynamic Donut Tailwind React",
      date: "27 AUGUST, 2024",
      time: "20 Mins",
      video: true
   },

   // top_news

   {
      id: 1,
      page: "top_news",
      thumb: topPostThumb_1,
      tag: "POLITICS",
      title: "Using Instagram Tawo Promote Your",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      page: "top_news",
      thumb: topPostThumb_2,
      tag: "TECH",
      title: "Everything Developers Must Know About",
      date: "27 AUGUST, 2024",
   },
   {
      id: 3,
      page: "top_news",
      thumb: topPostThumb_3,
      tag: "MODERN",
      title: "Implementing Okta Authentication In",
      date: "27 AUGUST, 2024",
   },

   // sport

   {
      id: 1,
      page: "sport",
      thumb: sportPostThumb_1,
      tag: "BASKET BALL",
      title: "Using Instagram Tawo Promote Your",
      date: "27 AUGUST, 2024",
   },
   {
      id: 2,
      page: "sport",
      thumb: sportPostThumb_2,
      tag: "BOXING",
      title: "Implementing Okta Authentication",
      date: "27 AUGUST, 2024",
   },
   {
      id: 3,
      page: "sport",
      thumb: sportPostThumb_3,
      tag: "FOOTBALL",
      title: "Core Web Vitals Tools To Boost Your",
      date: "27 AUGUST, 2024",
   },
   {
      id: 4,
      page: "sport",
      thumb: sportPostThumb_4,
      tag: "POLITICS",
      title: "CMigration From JQuery To Next.Js: A Guide",
      date: "27 AUGUST, 2024",
   },
];

export default home_6_data;
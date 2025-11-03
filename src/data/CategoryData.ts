import { StaticImageData } from "next/image";

import categoryThumb_1 from "@/assets/img/images/categories_img01.png"
import categoryThumb_2 from "@/assets/img/images/categories_img02.png"
import categoryThumb_3 from "@/assets/img/images/categories_img03.png"
import categoryThumb_4 from "@/assets/img/images/categories_img04.png"
import categoryThumb_5 from "@/assets/img/images/categories_img05.png"
import categoryThumb_6 from "@/assets/img/images/categories_img06.png"

import category2Thumb_1 from "@/assets/img/images/g_categories_img01.png"
import category2Thumb_2 from "@/assets/img/images/g_categories_img02.png"
import category2Thumb_3 from "@/assets/img/images/g_categories_img03.png"
import category2Thumb_4 from "@/assets/img/images/g_categories_img04.png"
import category2Thumb_5 from "@/assets/img/images/g_categories_img05.png"
import category2Thumb_6 from "@/assets/img/images/g_categories_img06.png"

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   tag: string;
}[];

const category_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      thumb: categoryThumb_1,
      tag: "Breakfast",
   },
   {
      id: 2,
      page: "home_1",
      thumb: categoryThumb_2,
      tag: "Dessert",
   },
   {
      id: 3,
      page: "home_1",
      thumb: categoryThumb_3,
      tag: "Lunch",
   },
   {
      id: 4,
      page: "home_1",
      thumb: categoryThumb_4,
      tag: "Appetizer",
   },
   {
      id: 5,
      page: "home_1",
      thumb: categoryThumb_5,
      tag: "Dinner",
   },
   {
      id: 6,
      page: "home_1",
      thumb: categoryThumb_6,
      tag: "Pizza",
   },

   // home_2

   {
      id: 1,
      page: "home_2",
      thumb: category2Thumb_1,
      tag: "Action",
   },
   {
      id: 2,
      page: "home_2",
      thumb: category2Thumb_2,
      tag: "Gaming",
   },
   {
      id: 3,
      page: "home_2",
      thumb: category2Thumb_3,
      tag: "RAcing",
   },
   {
      id: 4,
      page: "home_2",
      thumb: category2Thumb_4,
      tag: "Animation",
   },
   {
      id: 5,
      page: "home_2",
      thumb: category2Thumb_5,
      tag: "Fighter",
   },
   {
      id: 6,
      page: "home_2",
      thumb: category2Thumb_6,
      tag: "Story",
   },
]

export default category_data;
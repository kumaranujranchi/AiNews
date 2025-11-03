"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import VideoPopup from "@/modals/VideoPopup"

import blogThumb_1 from "@/assets/img/blog/blog_details01.jpg"
import blogThumb_2 from "@/assets/img/blog/blog_details02.jpg"
import blogThumb_3 from "@/assets/img/blog/blog_details03.jpg"

const BlogDetailsContent = ({ single_blog }: any) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="blog-details-content">
            <div className="blog-details-content-top">
               <Link href="/blog" className="post-tag">{single_blog?.tag ? single_blog.tag : "Appitizer"}</Link>
               <h2 className="title">{single_blog?.title ? single_blog.title : "Emerging Global Trends in Leather and Fashion Nicely Photo Area Shooting With Hand Classic Style"}</h2>
               <div className="bd-content-inner">
                  <div className="blog-post-meta">
                     <ul className="list-wrap">
                        <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                        <li><i className="flaticon-calendar"></i>27 August, 2024</li>
                        <li><i className="flaticon-chat"></i><Link href="/blog-details">05 Comments</Link></li>
                        <li><i className="flaticon-history"></i>20 Mins</li>
                     </ul>
                  </div>
                  <div className="blog-details-social">
                     <ul className="list-wrap">
                        <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                        <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="blog-details-thumb">
               {single_blog?.thumb ? <Image src={single_blog.thumb} alt="image" /> : <Image src={blogThumb_1} alt="image" />}
            </div>
            <p className="first-info">Browned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey melty little puddles of
               chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget dolor Aenean
               massa.</p>
            <p>Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles of chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula eget doloawr Aenean massa.m Ipsum has been the industry’s standard dummy.</p>
            <blockquote>
               <p>Grursus mal suada faci lisis orem ipsum dola onsectetur elittery Vestey  bulum the ipsumm ipsum that dolocons rsus mal suada and there fadolorit to the consectetur elite. </p>
               <cite>Thomas A. Edison</cite>
            </blockquote>
            <p>Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry’s standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels.</p>
            <div className="blog-details-inner">
               <div className="row align-items-center">
                  <div className="col-md-6">
                     <div className="blog-details-inner-img">
                        <Image src={blogThumb_2} alt="" />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="blog-details-inner-content">
                        <h3 className="title-two">Customer Engagement Marketing New Strategy for the Economy</h3>
                        <p>Pellentesque iaculis gravida nulla ac hendrerit Vestiabulum faucibus neque at lacus tristique eu ultrices area ipsum mollis Praesent pharetra semper purusPellentesque iaculis gravida nulla ac hendrerit.</p>
                        <ul className="list-wrap">
                           <li><i className="fas fa-check"></i>Gutenberg Integration</li>
                           <li><i className="fas fa-check"></i>Gutenberg Integration</li>
                           <li><i className="fas fa-check"></i>Gutenberg Integration</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <p>Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry’s standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels.</p>
            <div className="blog-details-video">
               <Image src={blogThumb_3} alt="" />
               <a style={{ cursor: "pointer" }} onClick={() => setIsVideoOpen(true)} className="paly-btn popup-video"><i className="fas fa-play"></i></a>
            </div>
            <p>Growned butter and brown sugar caramelly oodness crispy edgesthick and soft centers andey meltpuddles offer chocolate y first favorite.dolor sit amet, consectetuer adipiscing elitter Aenean commodo ligula egette doloawr Aenean massa.m Ipsum has been the industry’s standard dummy.should never complain, complaining is a weak emotion, you got life, we breathing, we blessed. Surround yourself with angels.</p>
            <div className="blog-details-bottom">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="post-tags">
                        <h5 className="title">Tags:</h5>
                        <ul className="list-wrap">
                           <li><Link href="/blog">Art & Design</Link></li>
                           <li><Link href="/blog">Video</Link></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="post-share">
                        <h5 className="title">Share:</h5>
                        <ul className="list-wrap">
                           <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                           <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
         {/* video modal end */}
      </>
   )
}

export default BlogDetailsContent

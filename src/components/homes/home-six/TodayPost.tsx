"use client"
import home_6_data from "@/data/HomeSixData"
import Image from "next/image"
import Link from "next/link"
import VideoPopup from '@/modals/VideoPopup';
import { useState } from "react";

const TodayPost = () => {

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="today-post-area pt-50">
        <div className="section-title-wrap">
          <div className="section-title section-title-four">
            <h2 className="title">Today’s Hot Spot</h2>
            <div className="section-title-line"></div>
          </div>
        </div>
        <div className="today-post-wrap">
          <div className="row gutter-40 justify-content-center">
            {home_6_data.filter((items) => items.page === "today_post").map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="banner-post-five banner-post-seven">
                  <div className="banner-post-thumb-five">
                    <Link href="/blog-details"><Image src={item.thumb} alt="" /></Link>
                    {item.video &&
                      <a onClick={() => setIsVideoOpen(true)} className="paly-btn popup-video"><i className="fas fa-play"></i></a>}
                  </div>
                  <div className="banner-post-content-five">
                    <Link href="blog" className="post-tag-four">{item.tag}</Link>
                    <h2 className="post-title"><Link href="/blog-details">{item.title}</Link></h2>
                    <div className="blog-post-meta">
                      <ul className="list-wrap">
                        <li><i className="flaticon-user"></i>by<Link href="/author">Admin</Link></li>
                        <li><i className="flaticon-calendar"></i>{item.date}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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

export default TodayPost

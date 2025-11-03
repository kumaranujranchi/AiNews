"use client"
import Image from "next/image"
import LoginForm from "./LoginForm"

import contactThumb from "@/assets/img/images/contact_img.jpg" // Reusing contact image as placeholder; replace with login-specific if available

const LoginArea = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-10">
        <div className="contact-img">
          <Image src={contactThumb} alt="" />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="contact-form">
          <h4 className="title">Login</h4>
          <p>Sign in to manage your content</p>
          <LoginForm />
          <p className="ajax-response mb-0"></p>
        </div>
      </div>
    </div>
  )
}

export default LoginArea
"use client"
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   name: string;
   email: string;
   message: string;
   web: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
      web: yup.string().required().label("Website"),
   })
   .required();

const BlogForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      const notify = () => toast('Comment sent successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <div className="comment-respond">
         <h3 className="comment-reply-title">Post a comment</h3>
         <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
            <p className="comment-notes">Your email address will not be published. Required fields are marked *</p>
            <div className="form-grp">
               <textarea {...register("message")} placeholder="Comment"></textarea>
                        <p className="form_error">{errors.message?.message}</p>
            </div>
            <div className="row">
               <div className="col-md-4">
                  <div className="form-grp">
                     <input type="text" {...register("name")} placeholder="Name" />
                        <p className="form_error">{errors.name?.message}</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="form-grp">
                     <input type="email" {...register("email")} placeholder="Email" />
                        <p className="form_error">{errors.email?.message}</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="form-grp">
                     <input type="url" {...register("web")} placeholder="Website" />
                        <p className="form_error">{errors.web?.message}</p>
                  </div>
               </div>
            </div>
            <div className="form-grp checkbox-grp">
               <input type="checkbox" id="checkbox_two" />
               <label htmlFor="checkbox_two">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <button type="submit" className="btn btn-two">Post Comment</button>
         </form>
      </div>
   )
}

export default BlogForm

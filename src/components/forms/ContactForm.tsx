'use client'
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   user_name: string;
   user_email: string;
   user_phone: number;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      user_phone: yup.number()
         .transform((originalValue, originalObject) => {
            // Convert empty string to NaN
            return originalObject && originalObject.phone === '' ? NaN : originalValue;
         })
         .typeError('Phone number is required')
         .required('Phone must be a number'),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = (data: FormData) => {
      if (form.current) {
         emailjs.sendForm('themegenix', 'template_hdr7ic6', form.current, 'QOBCxT0bzNKEs-CwW')
            .then((result) => {
               const notify = () => toast('Message sent successfully', { position: 'top-center' });
               notify();
               reset();
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });
      } else {
         console.error("Form reference is null");
      }
   };

   return (
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
         <div className="row">
            <div className="col-md-6">
               <div className="form-grp">
                  <input type="text" {...register("user_name")} placeholder="Name*" />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <input type="email" {...register("user_email")} placeholder="E-mail*" />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
         </div>
         <div className="form-grp">
            <input type="number" {...register("user_phone")} placeholder="Phone*" />
            <p className="form_error">{errors.user_phone?.message}</p>
         </div>
         <div className="form-grp">
            <textarea {...register("message")} placeholder="Message*"></textarea>
            <p className="form_error">{errors.message?.message}</p>
         </div>
         <button type="submit" className="btn btn-two">Submit Now</button>
      </form>
   )
}

export default ContactForm

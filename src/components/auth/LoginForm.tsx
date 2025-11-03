"use client";
import { useRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSupabaseClient } from "@/utils/supabaseClient";

interface FormData {
  user_email: string;
  user_password: string;
}

const schema = yup
  .object({
    user_email: yup.string().required().email().label("Email"),
    user_password: yup.string().required().min(6).label("Password"),
  })
  .required();

const LoginForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
  const form = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: FormData) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error("Supabase env vars not set: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: data.user_email,
      password: data.user_password,
    });
    if (error) {
      console.error(error.message);
    } else {
      reset();
      window.location.href = "/admin/articles";
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-grp">
            <input type="email" {...register("user_email")} placeholder="E-mail*" />
            <p className="form_error">{errors.user_email?.message}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <input type="password" {...register("user_password")} placeholder="Password*" />
            <p className="form_error">{errors.user_password?.message}</p>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-two">Login</button>
    </form>
  );
};

export default LoginForm;
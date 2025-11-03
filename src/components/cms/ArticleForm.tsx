"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, ArticleFormValues } from "@/utils/validation/articleSchema";
import { getSupabaseClient } from "@/utils/supabaseClient";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// basic theme CSS will be loaded by the library itself

interface Props {
  initialValues?: Partial<ArticleFormValues> & { id?: string };
}

export default function ArticleForm({ initialValues }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialValues?.title || "",
      content: initialValues?.content || "",
      featured_image_url: initialValues?.featured_image_url || "",
      published_at: initialValues?.published_at || "",
      tags: [],
      categories: [],
      status: (initialValues as any)?.status || "draft",
    },
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const supabase = getSupabaseClient();
    if (!supabase) { setUploading(false); setError("Supabase is not configured."); return; }
    const filePath = `featured/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("media").upload(filePath, file);
    setUploading(false);
    if (error) setError(error.message);
    else {
      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      setValue("featured_image_url", data.publicUrl);
    }
  };

  const onSubmit = async (values: ArticleFormValues) => {
    setError(null);
    const supabase = getSupabaseClient();
    if (!supabase) { setError("Supabase is not configured."); return; }
    if (initialValues?.id) {
      const { error } = await supabase.from("articles").update({
        title: values.title,
        content: values.content,
        featured_image_url: values.featured_image_url || null,
        published_at: values.published_at || null,
        tags: values.tags || [],
        categories: values.categories || [],
        status: values.status,
      }).eq("id", initialValues.id);
      if (error) setError(error.message); else window.location.href = "/admin/articles";
    } else {
      const { error } = await supabase.from("articles").insert({
        title: values.title,
        content: values.content,
        featured_image_url: values.featured_image_url || null,
        published_at: values.published_at || null,
        tags: values.tags || [],
        categories: values.categories || [],
        status: values.status,
      });
      if (error) setError(error.message); else window.location.href = "/admin/articles";
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input {...register("title")} />
          {errors.title && <p style={{color:"red"}}>{errors.title.message}</p>}
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill value={watch("content") || ""} onChange={(val)=>setValue("content", val)} />
          {errors.content && <p style={{color:"red"}}>{errors.content.message}</p>}
        </div>
        <div className="form-group">
          <label>Featured Image</label>
          <input type="file" accept="image/*" onChange={onUpload} />
          {uploading && <p>Uploading...</p>}
          <input {...register("featured_image_url")} placeholder="Public image URL" />
        </div>
        <div className="form-group">
          <label>Publication Date/Time</label>
          <input type="datetime-local" {...register("published_at")} />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input onChange={(e)=>setValue("tags", e.target.value.split(",").map(t=>t.trim()).filter(Boolean))} />
        </div>
        <div className="form-group">
          <label>Categories (comma-separated)</label>
          <input onChange={(e)=>setValue("categories", e.target.value.split(",").map(t=>t.trim()).filter(Boolean))} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select {...register("status")}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>{initialValues?.id ? "Update" : "Create"} Article</button>
      </form>
    </div>
  );
}

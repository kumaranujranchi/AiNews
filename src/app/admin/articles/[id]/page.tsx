"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "@/components/cms/ArticleForm";
import { getSupabaseClient } from "@/utils/supabaseClient";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) { setLoading(false); setError("Supabase is not configured"); return; }
      const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
      setLoading(false);
      if (error) setError(error.message); else setArticle(data);
    };
    run();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:"red"}}>{error}</p>;
  if (!article) return <p>Not found</p>;

  return (
    <div className="container">
      <h1>Edit Article</h1>
      <ArticleForm initialValues={article} />
    </div>
  );
}

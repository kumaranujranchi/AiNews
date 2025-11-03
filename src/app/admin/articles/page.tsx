"use client";
import useSWR from "swr";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { swrFetcher } from "@/utils/caching/swrFetcher";
import { getSupabaseClient } from "@/utils/supabaseClient";

export default function Page() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(1);

  const key = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    params.set("page", String(page));
    params.set("limit", "10");
    return `/api/articles?${params.toString()}`;
  }, [q, status, page]);

  const { data, error, isLoading, mutate } = useSWR(key, swrFetcher);

  // Require login for admin pages
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        window.location.href = "/login";
      }
    };
    checkAuth();
  }, []);

  // Real-time updates for articles
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    const channel = supabase
      .channel("realtime:articles")
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'articles' },
        () => { mutate(); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [mutate]);

  return (
    <div className="container">
      <h1>Articles</h1>
      <div style={{display:"flex", gap:12, alignItems:"center", flexWrap:"wrap"}}>
        <Link href="/admin/articles/new" className="btn btn-two">New Article</Link>
        <input
          placeholder="Search title..."
          value={q}
          onChange={(e) => { setPage(1); setQ(e.target.value); }}
        />
        <select value={status} onChange={(e)=>{ setPage(1); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{(error as Error).message}</p>}
      {!getSupabaseClient() && (
        <p style={{color:"#b45309", background:"#fff7ed", padding:8, border:"1px solid #fde68a"}}>
          Supabase is not configured. Add env vars as documented.
        </p>
      )}
      <ul>
        {data?.items?.map((a: any) => (
          <li key={a.id}>
            <Link href={`/admin/articles/${a.id}`}>{a.title}</Link> — {a.status}
          </li>
        ))}
      </ul>
      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {data?.page ?? page}</span>
        <button disabled={(data?.items?.length ?? 0) < (data?.limit ?? 10)} onClick={()=>setPage(p=>p+1)}>Next</button>
        <span>Total: {data?.total ?? 0}</span>
      </div>
    </div>
  );
}

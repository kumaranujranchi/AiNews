import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabaseServer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const status = searchParams.get("status") || undefined;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseServer
    .from("articles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status) query = query.eq("status", status);
  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data, total: count ?? 0, page, limit });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabaseServer.from("articles").insert(body).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

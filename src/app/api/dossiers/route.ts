import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("dossiers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.warn("Supabase fetch warning:", error);
      return NextResponse.json({ dossiers: [] });
    }

    return NextResponse.json({ dossiers: data || [] });
  } catch (err) {
    console.error("Dossiers GET error:", err);
    return NextResponse.json({ dossiers: [] });
  }
}

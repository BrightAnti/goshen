import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const secretToken = process.env.KEEPALIVE_SECRET_TOKEN;

  // Optional: Add security token (if set)
  if (secretToken && token !== secretToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Lightweight query to keep Supabase active
    const { data, error } = await supabase
      .from("news")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("Keepalive ping failed:", error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supabase is active",
      timestamp: new Date().toISOString(),
      count: data?.length || 0,
    });
  } catch (error: any) {
    console.error("Keepalive error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}


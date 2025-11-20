import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = (page - 1) * limit;

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: works, error: worksError } = await supabase
      .from("works")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (worksError) {
      console.error("Error fetching works:", worksError);
      return NextResponse.json(
        { error: "Failed to fetch works" },
        { status: 500 },
      );
    }

    const { count, error: countError } = await supabase
      .from("works")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    if (countError) {
      console.error("Error counting works:", countError);
      return NextResponse.json(
        { error: "Failed to count works" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      works: works || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

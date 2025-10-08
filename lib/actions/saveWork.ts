import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function saveWork(
  title: string,
  description: string,
  imageUrl: string,
  svgUrl: string,
  svgData: string,
) {
  const { data, error } = await supabase.from("works").insert([
    {
      user_id: supabase.auth.id(),
      title,
      description,
      original_image_url: imageUrl,
      svg_data: svgData,
    },
  ]);

  if (error) console.error(error);
  return data;
}

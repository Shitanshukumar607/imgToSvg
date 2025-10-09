export interface Work {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  original_image_url: string;
  svg_data?: string;
  created_at: string;
  updated_at: string;
}

export interface WorksResponse {
  works: Work[];
  total: number;
  page: number;
  limit: number;
}

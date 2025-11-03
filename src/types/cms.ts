export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  id: string;
  title: string;
  content: string;
  featured_image_url?: string;
  published_at?: string; // ISO datetime
  tags?: string[];
  categories?: string[];
  status: ArticleStatus;
  author_id: string;
  created_at: string;
  updated_at: string;
}


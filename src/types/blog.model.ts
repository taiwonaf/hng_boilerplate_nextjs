export interface ISingleBlogResponse {
  data: ISingleBlog;
  message: string;
  status_code: number;
}

export interface ISingleBlog {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  blog_category_id: string;
  image: IBlogImg;
  blog_category: IBlogCategory;
}

export interface IBlogCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface IBlogImg {
  id: string;
  blog_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

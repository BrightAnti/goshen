export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  end_date?: string;
  description: string;
  location?: string;
  image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
  uploaded_at: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department?: string;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  order_index: number;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: Record<string, any>;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}



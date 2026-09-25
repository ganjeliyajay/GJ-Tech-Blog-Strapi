export interface Blog {
  id: string
  title: string
  slug: string
  featured: boolean
  excerpt: string
  coverImage?: {
    url: string;
    alternativeText?: string | null;
  };
}

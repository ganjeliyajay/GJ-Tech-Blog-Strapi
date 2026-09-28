export interface Blog {
  id: string | number;
    documentId: string;
  title: string;
  slug: string;
  featured?: boolean;
  excerpt?: string;
  publishedAt?: string | null;
  coverImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
}

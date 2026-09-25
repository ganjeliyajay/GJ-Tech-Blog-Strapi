import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { getPostBySlug } from "@/lib/blog/strapi";
import StrapiBlocks from "../../../../../components/blog/StrapiBlocks";

interface DescriptionChild {
  text: string;
  type: string;
}

interface DescriptionBlock {
  type: string;
  children: DescriptionChild[];
}

interface BlogData {
  title: string;
  excerpt: string;
  description?: DescriptionBlock[];
  slug: string;
  featured: boolean;
  publishedAt: string;
  coverImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
}

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  const locale = await getLocale();

  const post: BlogData | null = await getPostBySlug(slug, locale);

  console.log("BLOG CONTENT:", post);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("Article");

  const imageUrl = post.coverImage?.url;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Article Header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link
              href="/blog"
              className="transition hover:text-blue-600"
            >
              Blog
            </Link>

            <span>/</span>

            <span className="truncate text-slate-400">
              {post.title}
            </span>
          </div>

          {/* Featured */}
          {post.featured && (
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {t("featured")}
            </span>
          )}

          {/* Title */}
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            {post.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span>6 {t("minRead")}</span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span>Jay Ganjeliya</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {imageUrl && (
        <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={
                imageUrl.startsWith("http")
                  ? imageUrl
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
              }
              alt={post.coverImage?.alternativeText || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-8 text-slate-700">
            {post.excerpt}
          </p>

          <h2 className="mt-12 text-3xl font-bold text-slate-900">
            {t("introduction")}
          </h2>

         <StrapiBlocks description={post.description} />

          <h2 className="mt-12 text-3xl font-bold text-slate-900">
            {t("conclusion")}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {t("thanks")}
          </p>
        </div>

        {/* Back */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-blue-600"
          >
            ← {t("backToBlog")}
          </Link>
        </div>
      </article>
    </main>
  );
}
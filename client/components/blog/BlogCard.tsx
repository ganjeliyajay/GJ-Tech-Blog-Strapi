import { Link } from "@/lib/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Blog } from "../../types/blog";
import Image from "next/image";

export default async function BlogCard({
  title,
  excerpt,
  featured,
  slug,
  coverImage
}: Blog) {
  const t = await getTranslations("Blog");

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {coverImage?.url ? (
          <Image
            src={
              coverImage.url.startsWith("http")
                ? coverImage.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${coverImage.url}`
            }
            alt={coverImage.alternativeText || title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-medium text-gray-400">
              Blog Image
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {featured && (
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {t("featured")}
          </span>
        )}

        <Link href={`/blog/${slug}`}>
          <h2 className="mt-3 text-xl font-bold leading-7 text-gray-900 transition group-hover:text-blue-600">
            {title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {excerpt}
        </p>

        <Link
          href={`/blog/${slug}`}
          className="mt-5 inline-block text-sm font-semibold text-gray-900 transition hover:text-blue-600"
        >
          {t("readMore")} →
        </Link>
      </div>
    </article>
  );
}
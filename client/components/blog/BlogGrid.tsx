import { getLocale, getTranslations } from "next-intl/server"
import { Blog } from "../../types/blog"
import BlogCard from "./BlogCard"
import { getAllPosts } from "@/lib/blog/strapi"


export default async function BlogGrid() {
  const locale = await getLocale()
  const res = await getAllPosts(locale)
  const blogPosts: Blog[] = res?.data

  const t = await getTranslations("Blog");


  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          {t('latestArticles')}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          {t('exploreArticles')}
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          {t('description')}
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts?.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            featured={post.featured}
            slug={post.slug}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </section>
  )
}

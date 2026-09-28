"use client"

import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

import { Link, usePathname, useRouter } from "@/lib/i18n/navigation"

type Locale = "en" | "hi" | "gu"

export default function Navbar() {
  const t = useTranslations("Navbar")
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as Locale

  const [changingLanguage, setChangingLanguage] = useState(false)

  const changeLanguage = async (newLocale: Locale) => {
    if (newLocale === locale) return

    setChangingLanguage(true)

    try {
      // Blog detail page check
      const blogMatch = pathname.match(/^\/blog\/(.+)$/)

      if (blogMatch) {
        const currentSlug = decodeURIComponent(blogMatch[1])

        // Dynamically import so Navbar remains a client component
        const { getPostBySlug, getLocalizedPost } =
          await import("@/lib/blog/strapi")

        // Get current post
        const currentPost = await getPostBySlug(currentSlug, locale)

        if (currentPost?.documentId) {
          // Get same post in target language
          const localizedPost = await getLocalizedPost(
            currentPost.documentId,
            newLocale,
          )

          if (localizedPost?.slug) {
            router.replace(`/blog/${localizedPost.slug}`, {
              locale: newLocale,
            })

            return
          }
        }
      }

      // For normal pages such as /, /blog
      router.replace(pathname, {
        locale: newLocale,
      })
    } catch (error) {
      console.error("Language change failed:", error)

      // Fallback
      router.replace(pathname, {
        locale: newLocale,
      })
    } finally {
      setChangingLanguage(false)
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          GJ<span className="text-blue-600">Blog</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className="transition hover:text-blue-600">
            {t("home")}
          </Link>

          <Link href="/blog" className="transition hover:text-blue-600">
            {t("blog")}
          </Link>

          <a href="#about" className="transition hover:text-blue-600">
            {t("about")}
          </a>
        </nav>

        <select
          value={locale}
          disabled={changingLanguage}
          onChange={(e) => changeLanguage(e.target.value as Locale)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none disabled:opacity-60"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="gu">ગુજરાતી</option>
        </select>
      </div>
    </header>
  )
}

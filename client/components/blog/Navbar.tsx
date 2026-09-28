"use client"

import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

import { Link, usePathname, useRouter } from "@/lib/i18n/navigation"

type Locale = "en" | "hi" | "gu"

interface StrapiPost {
  documentId: string
  slug: string
}

interface StrapiResponse {
  data?: StrapiPost[]
}

export default function Navbar() {
  const t = useTranslations("Navbar")
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as Locale

  const [changingLanguage, setChangingLanguage] = useState(false)

  const changeLanguage = async (newLocale: Locale) => {
    if (newLocale === locale || changingLanguage) return

    setChangingLanguage(true)

    try {
      // Check if current page is a blog detail page
      const blogMatch = pathname.match(/^\/blog\/(.+)$/)

      if (blogMatch) {
        const currentSlug = decodeURIComponent(blogMatch[1])

        const strapiUrl = (
          process.env.NEXT_PUBLIC_STRAPI_URL || ""
        ).replace(/\/$/, "")

        // 1. Find current post using current language + current slug
        const currentPostUrl =
          `${strapiUrl}/api/posts` +
          `?filters[slug][$eq]=${encodeURIComponent(currentSlug)}` +
          `&locale=${locale}` +
          `&status=published` +
          `&pagination[pageSize]=1`

        const currentResponse = await fetch(currentPostUrl)

        if (currentResponse.ok) {
          const currentData =
            (await currentResponse.json()) as StrapiResponse

          const currentPost = currentData.data?.[0]

          if (currentPost?.documentId) {
            // 2. Find the same post in the target language
            const localizedPostUrl =
              `${strapiUrl}/api/posts` +
              `?filters[documentId][$eq]=${encodeURIComponent(
                currentPost.documentId
              )}` +
              `&locale=${newLocale}` +
              `&status=published` +
              `&pagination[pageSize]=1`

            const localizedResponse = await fetch(localizedPostUrl)

            if (localizedResponse.ok) {
              const localizedData =
                (await localizedResponse.json()) as StrapiResponse

              const localizedPost = localizedData.data?.[0]

              if (localizedPost?.slug) {
                router.replace(`/blog/${localizedPost.slug}`, {
                  locale: newLocale,
                })

                return
              }
            }
          }
        }
      }

      // Normal pages:
      // /
      // /blog
      // etc.
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
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          GJ<span className="text-blue-600">Blog</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            {t("home")}
          </Link>

          <Link
            href="/blog"
            className="transition hover:text-blue-600"
          >
            {t("blog")}
          </Link>

          <a
            href="#about"
            className="transition hover:text-blue-600"
          >
            {t("about")}
          </a>
        </nav>

        {/* Language Selector */}
        <select
          value={locale}
          disabled={changingLanguage}
          onChange={(e) =>
            changeLanguage(e.target.value as Locale)
          }
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
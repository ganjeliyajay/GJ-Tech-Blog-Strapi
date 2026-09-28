import axios from "axios"

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL ?? "").replace(/\/$/, "")

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured.")
}

console.log("STRAPI_URL:", STRAPI_URL)

const VALID_LOCALES = new Set(["en", "hi", "gu"])

function normalizeLocale(locale: string) {
  return VALID_LOCALES.has(locale) ? locale : "en"
}

export async function getAllPosts(locale: string) {
  const safeLocale = normalizeLocale(locale)

  try {
    const response = await axios.get(`${STRAPI_URL}/api/posts`, {
      params: {
        locale: safeLocale,
        status: "published",
        populate: "*",
        "pagination[pageSize]": 100,
        sort: "publishedAt:desc",
      },
      timeout: 10000,
    })

    return response.data
  } catch (error) {
    console.error(
      `Error fetching Strapi posts for locale "${safeLocale}":`,
      error,
    )

    return null
  }
}

export async function getPostBySlug(slug: string, locale: string) {
  const safeLocale = normalizeLocale(locale)
  const decodedSlug = decodeURIComponent(slug).trim()

  if (!decodedSlug) {
    return null
  }

  try {
    const response = await axios.get(`${STRAPI_URL}/api/posts`, {
      params: {
        "filters[slug][$eq]": decodedSlug,
        locale: safeLocale,
        status: "published",
        populate: "*",
        "pagination[pageSize]": 1,
      },
      timeout: 10000,
    })

    return response.data?.data?.[0] ?? null
  } catch (error) {
    console.error(
      `Error fetching Strapi post "${decodedSlug}" for locale "${safeLocale}":`,
      error,
    )

    return null
  }
}

export async function getLocalizedPost(documentId: string, locale: string) {
  const safeLocale = normalizeLocale(locale)

  if (!documentId) {
    return null
  }

  try {
    const response = await axios.get(`${STRAPI_URL}/api/posts`, {
      params: {
        "filters[documentId][$eq]": documentId,
        locale: safeLocale,
        status: "published",
        populate: "*",
        "pagination[pageSize]": 1,
      },
      timeout: 10000,
    })

    return response.data?.data?.[0] ?? null
  } catch (error) {
    console.error(
      `Error fetching localized post "${documentId}" for locale "${safeLocale}":`,
      error,
    )

    return null
  }
}

export function getStrapiMediaUrl(url?: string | null) {
  if (!url) return ""

  const cleanStrapiUrl = STRAPI_URL.replace(/\/$/, "")

  // Old local Strapi URL
  if (
    url.startsWith("http://localhost:1337") ||
    url.startsWith("http://127.0.0.1:1337") ||
    url.startsWith("https://localhost:1337") ||
    url.startsWith("https://127.0.0.1:1337")
  ) {
    const path = url.replace(/^https?:\/\/(localhost|127\.0\.0\.1):1337/, "")

    return `${cleanStrapiUrl}${path}`
  }

  // Relative Strapi upload URL
  if (url.startsWith("/")) {
    return `${cleanStrapiUrl}${url}`
  }

  return url
}

import axios from "axios"

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL ?? "").replace(/\/$/, "")

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured.")
}

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

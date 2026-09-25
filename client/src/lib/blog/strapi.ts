import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;


export const getAllPosts = async (locale: string) => {
  try {
    // const strapiLocale = getStrapiLocale(locale);

    const res = await axios.get(`${STRAPI_URL}/api/posts`, {
      params: {
        locale: locale,
        populate: "*",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const getPostBySlug = async (
  slug: string,
  locale: string
) => {
  try {

    const res = await axios.get(`${STRAPI_URL}/api/posts`, {
      params: {
        "filters[slug][$eq]": slug,
        locale: locale,
        populate: "*",
      },
    });

    return res.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};
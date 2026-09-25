import { getTranslations } from "next-intl/server";

export default async function Hero() {

  const t = await getTranslations('Hero')

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <span className="mb-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          GJ Tech Blog
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            {t("title")}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {t("description")}
        </p>
      </div>
    </section>
  );
}
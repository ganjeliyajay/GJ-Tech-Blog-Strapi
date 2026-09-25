import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <div className="text-lg font-bold">
              GJ<span className="text-blue-600">Blog</span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {t("tagline")}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
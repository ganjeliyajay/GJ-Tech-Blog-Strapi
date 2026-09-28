import Navbar from "../../../components/blog/Navbar";
import Footer from "../../../components/blog/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />

      {children}

      <Footer />
    </NextIntlClientProvider>
  );
}
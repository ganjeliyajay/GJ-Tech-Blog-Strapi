
import Footer from "../../components/blog/Footer";
import Navbar from "../../components/blog/Navbar";
import "./globals.css";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

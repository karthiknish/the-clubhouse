import { Zilla_Slab } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/ui/footer";
const zillaSlabFont = Zilla_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-zilla-slab",
});

export const metadata = {
  title: "Clubhouse",
  description: "Clubhouse",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${zillaSlabFont.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="font-zilla">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

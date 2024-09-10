import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/client/HeaderWrapper";
import FooterWrapper from "@/components/client/FooterWrapper";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="flex min-h-screen flex-col">
              <HeaderWrapper />
              <div className="flex-grow">{children}</div>
              <FooterWrapper />
            </div>
            <ToastContainer closeOnClick draggable />
          </body>
        </html>
      </ReactQueryProvider>
    </CookiesProvider>
  );
}

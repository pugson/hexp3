import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HEX·P3",
  description: "Quickly convert your HEX colors to P3 color space.",
  metadataBase: new URL("https://hexp3.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <noscript>
          <img
            src="https://hello.hexp3.com/noscript.gif?collect-dnt=true&hostname=hexp3.com"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>

        <Script
          strategy="afterInteractive"
          async
          defer
          src="https://hello.hexp3.com/latest.js"
          data-collect-dnt="true"
          data-hostname="hexp3.com"
        />
      </body>
    </html>
  );
}

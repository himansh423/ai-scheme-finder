import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/Provider";
import ShowNav from "@/components/ShowNav";
import ShowFooter from "@/components/ShowFooter";

export const metadata: Metadata = {
  title: "Schematic AI",
  description: "AI Powered Scheme Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ShowNav />
          {children}
          <ShowFooter />
        </Providers>
      </body>
    </html>
  );
}

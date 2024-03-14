import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import AuthProvider from "@/components/shared/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation";
import ShowNav from "@/components/shared/showNav";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ShowNav />
          <main>
            {children}
          </main>
          <Toaster />
        </AuthProvider>
        </body>
    </html>
  );
}
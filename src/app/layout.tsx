import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Jobs",
  description: "Get you next remote job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased flex flex-col min-h-dvh")}>
        <header className={cn("border-b border-b-gray-200")}>
          <Navbar />
        </header>
        <main className={cn("page-container py-10")}>{children}</main>
        <footer
          className={cn("border-t border-t-gray-200 py-10 mt-auto text-center")}
        >
          <p className={cn("page-container text-sm text-gray-500")}>
            Job data provided by{" "}
            <Link className={cn("underline")} href="https://remotive.com">
              Remotive
            </Link>{" "}
            &#x2022; View on{" "}
            <Link
              className={cn("underline")}
              href="https://github.com/ricardo-boock/next-jobs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>{" "}
            <span className={cn("whitespace-nowrap")}>
              &copy; {new Date().getFullYear()} Next Jobs.
            </span>{" "}
            All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}

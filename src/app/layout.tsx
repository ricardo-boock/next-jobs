import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Jobs",
  description: "Get your next remote job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased flex flex-col min-h-dvh")}>
        <TooltipProvider>
          <header className={cn("border-b border-b-gray-200")}>
            <Navbar />
          </header>
          <main className={cn("page-container py-10")}>{children}</main>
          <footer
            className={cn(
              "border-t border-t-gray-200 py-10 mt-auto text-center",
            )}
          >
            <p
              className={cn(
                "page-container text-sm text-gray-500 flex flex-wrap justify-center gap-x-2 gap-y-1",
              )}
            >
              Job data provided by{" "}
              <Link className={cn("text-inherit")} href="https://remotive.com">
                Remotive
              </Link>
              <span>•</span>
              <Link
                className={cn("text-inherit")}
                href="https://github.com/ricardo-boock/next-jobs"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
              <span>•</span>
              <Link className={cn("text-inherit")} href="/privacy">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link className={cn("text-inherit")} href="/imprint">
                Imprint
              </Link>
              <span>•</span>
              <span className={cn("whitespace-nowrap")}>
                © {new Date().getFullYear()} Next Jobs
              </span>
            </p>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}

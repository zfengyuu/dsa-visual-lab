import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSA Visual Lab",
  description: "Local-first DSA learning workspace built as a pnpm monorepo."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="brand">
              <strong>DSA Visual Lab</strong>
              <span>Learn algorithms by reading, comparing, and practicing.</span>
            </div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/lessons">Lessons</Link>
              <Link href="/progress">Progress</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

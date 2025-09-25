import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PasteItHere - Fast, Modern Pastebin for Code, Logs, and Text",
  description:
    "PasteItHere is a fast, modern platform for sharing code snippets, logs, and text. Instantly create, share, and view pastes with syntax highlighting.",
  keywords: [
    "pastebin",
    "code sharing",
    "logs",
    "text sharing",
    "syntax highlighting",
    "developer tools",
    "PasteItHere",
    "share code online"
  ],
  metadataBase: new URL("https://pasteithere.vercel.app"),
  openGraph: {
    title: "PasteItHere - Fast, Modern Pastebin for Code, Logs, and Text",
    description:
      "PasteItHere is a fast, modern platform for sharing code snippets, logs, and text. Instantly create, share, and view pastes with syntax highlighting.",
    url: "https://pasteithere.vercel.app",
    siteName: "PasteItHere",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PasteItHere - Fast, Modern Pastebin for Code, Logs, and Text",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PasteItHere - Fast, Modern Pastebin for Code, Logs, and Text",
    description:
      "PasteItHere is a fast, modern platform for sharing code snippets, logs, and text. Instantly create, share, and view pastes with syntax highlighting.",
    images: ["/og-image.png"],
  },
  authors: [{ name: "Abdul Shaikh", url: "https://github.com/Abdul1028" }],
  creator: "Abdul Shaikh",
  publisher: "Abdul Shaikh",
  alternates: {
    canonical: "https://pasteithere.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />


        <meta name="description" content="PasteItHere is a fast, modern platform for sharing code snippets, logs, and text. Instantly create, share, and view pastes with syntax highlighting." />

        <meta property="og:url" content="https://pasteithere.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Paste It Here" />
        <meta property="og:description" content="PasteItHere - Fast, Modern Pastebin for Code, Logs, and Tex" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://pasteithere.vercel.app" />
        <meta property="twitter:url" content="https://pasteithere.vercel.app" />
        <meta name="twitter:title" content="Paste It Here" />
        <meta name="twitter:description" content="Visualize your WhatsApp messages like never before." />
        <meta name="twitter:image" content="https://pasteithere.vercel.app/og-image.png" />

        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />

        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />

      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/themeProvider";
import BottomBlur from "@/components/bottomBlur";
import ScrollToTop from "@/components/scrollToTop";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Sudharsan Balajee - Co-Founder @ DheerajReddy Technologies",
  description: "Sudharsan Balajee is a pre-final year student at Vellore Institute of Technology, Chennai and the co-founder of DheerajReddy Technologies, building Aspirenet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BottomBlur />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

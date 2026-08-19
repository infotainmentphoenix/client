import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = {
  variable: "geist-sans-fallback",
};

const geistMono = {
  variable: "geist-mono-fallback",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Phoenix Infotainment",
    default: "Phoenix Infotainment | Premium Event Production",
  },
  description: "Crafting legendary live experiences. Explore stadium concerts, royal destination weddings, and mega corporate galas executed with unmatched precision.",
  icons: {
    icon: '/Phoenix.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SchemaMarkup } from "@/components/SchemaMarkup";

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
  openGraph: {
    type: 'website',
    siteName: 'Phoenix Infotainment',
    title: 'Phoenix Infotainment | Premium Event Production',
    description: 'Crafting legendary live experiences. Explore stadium concerts, royal destination weddings, and mega corporate galas executed with unmatched precision.',
    images: [
      {
        url: 'https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png',
        width: 1200,
        height: 630,
        alt: 'Phoenix Infotainment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix Infotainment | Premium Event Production',
    description: 'Crafting legendary live experiences. Explore stadium concerts, royal destination weddings, and mega corporate galas executed with unmatched precision.',
    images: ['https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://phoenixinfotainment.com'),
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Phoenix Infotainment',
  url: 'https://phoenixinfotainment.com',
  logo: 'https://ik.imagekit.io/n5xsoq8qf/infotainmentphoenixLogo/Phoenix%20White.png',
  sameAs: [
    'https://www.instagram.com/phoenixinfotainment',
    'https://twitter.com/phoenix_info',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'customer service',
  }
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
        <SchemaMarkup schema={orgSchema} />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0GGD6GZB22"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0GGD6GZB22');
          `}
        </Script>
        
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

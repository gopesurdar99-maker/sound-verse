import type { Metadata } from "next";
import Script from "next/script";
import CartToast from "@/components/shared/cart-toast";
import AuthValidator from "@/components/shared/auth-validator";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoundVerse",
  description: "Premium headphone marketplace with modern discovery experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthValidator />
        <CartToast />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/providers/auth.provider";
import QueryClientProvider from "@/providers/queryclient.provider";

export const metadata: Metadata = {
  title: "Brun",
  description: "Share your memories with others",
};

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${jost.variable} antialiased min-h-screen relative flex flex-col bg-gray-100`}
      >
        <AuthProvider>
          <QueryClientProvider>
            <Navbar />
            {children}
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

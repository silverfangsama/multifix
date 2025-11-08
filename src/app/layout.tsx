// app/layout.tsx
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multifix Onchain Rectification protocol",
  description: "Multifix Onchain Rectification protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <main className="">{/* Adjust this value based on header height */}
          {children}
        </main>
      </body>
    </html>
  );
}
// app/layout.tsx
import "@/styles/globals.css";

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
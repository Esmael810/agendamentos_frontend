import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "Marcação de Turnos",
  description: "Sistema de Marcação de turnos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
       <body className="flex flex-col min-h-screen ">
     
        <Header />
        <main className="grow bg-linear-to-l from-blue-800 to-blue-700">
        <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}

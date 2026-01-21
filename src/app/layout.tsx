import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


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
        <main className="flex-grow bg-blue-600">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

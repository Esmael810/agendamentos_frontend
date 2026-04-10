"use client";
import { useState } from "react";
import AdimSideMenu from "./collaborators/components/AdminSideMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <AdimSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div>
        <header className="flex items-center p-5 text-white shadow rounded-2xl">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer"
          >
            ☰
          </button>
        </header>
      </div>

      <main className="flex-1 p-16 bg">{children}</main>
    </div>
  );
}

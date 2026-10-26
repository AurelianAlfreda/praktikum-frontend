import type { Metadata } from "next";
import type { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata: Metadata = {
  title: "TugasKu | Manajemen Tugas Kuliah",
  description: "Proyek praktikum Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="container py-4 flex-grow-1">{children}</main>
        <Footer appName="TugasKu" keterangan="Praktikum Frontend Development" />
        <BootstrapClient />
      </body>
    </html>
  );
}
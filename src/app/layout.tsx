import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Are U Pwnd Yet? | Plataforma de Competencias CTF",
  description:
    "Plataforma estudiantil de competencias CTF, laboratorios y retos de ciberseguridad y hacking ético.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0d1117] text-[#c9d1d9]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hornero — Crea tu Torta",
  description:
    "Arma tu torta artesanal con Hornero. Elige tamaño, ponqué, relleno, cobertura y toppings.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5EDE2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${sourceSans.variable} ${caveat.variable} h-full overflow-hidden antialiased`}
    >
      <body className="h-full overflow-hidden bg-cream font-sans text-chocolate">
        {children}
      </body>
    </html>
  );
}

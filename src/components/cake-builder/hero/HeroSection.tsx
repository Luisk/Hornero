import { HeroCopy } from "@/components/cake-builder/hero/HeroCopy";
import { HeroImage } from "@/components/cake-builder/hero/HeroImage";

export function HeroSection() {
  return (
    <section className="hero bg-cream" aria-label="Crea tu torta">
      <HeroImage />
      <HeroCopy />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-b from-transparent to-cream-light sm:h-12"
        aria-hidden="true"
      />
    </section>
  );
}

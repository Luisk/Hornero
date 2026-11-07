import Image from "next/image";

export function HeroImage() {
  return (
    <Image
      src="/images/crea-tu-torta/hero-cake-landscape.png?v=2"
      alt="Capas de torta artesanal Hornero"
      fill
      priority
      unoptimized
      sizes="100vw"
      className="object-cover object-[56%_42%] sm:object-[50%_48%] lg:object-[48%_50%]"
    />
  );
}

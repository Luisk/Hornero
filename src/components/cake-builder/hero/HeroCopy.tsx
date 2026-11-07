export function HeroCopy() {
  return (
    <div className="absolute inset-0 z-10 flex items-start sm:items-center">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-cream/80 via-cream/30 to-transparent sm:w-[58%] sm:from-cream/35 sm:via-cream/10"
        aria-hidden="true"
      />
      <div className="relative w-[68%] max-w-[17.5rem] px-4 pt-5 sm:w-[48%] sm:max-w-sm sm:px-8 sm:pt-0 lg:max-w-md lg:px-12">
        <h1 className="font-display text-[clamp(1.9rem,10.2vw,4rem)] leading-[0.98] font-medium text-chocolate">
          Crea la torta
          <br />
          que tienes en
          <br />
          mente
        </h1>
        <p className="mt-3 text-[0.88rem] leading-snug text-chocolate/75 sm:mt-5 sm:text-base">
          Elige cada detalle y
          <br />
          nosotros la hacemos
          <br />
          realidad.
        </p>
      </div>
    </div>
  );
}

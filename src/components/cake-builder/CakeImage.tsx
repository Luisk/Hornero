"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type CakeImageProps = {
  image: string;
  compact?: boolean;
  children?: ReactNode;
};

export function CakeImage({ image, compact = false, children }: CakeImageProps) {
  const [displayed, setDisplayed] = useState(image);
  const [incoming, setIncoming] = useState<string | null>(null);

  if (image !== displayed && incoming !== image) {
    setIncoming(image);
  }

  useEffect(() => {
    if (!incoming) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setDisplayed(incoming);
      setIncoming(null);
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [incoming]);

  return (
    <div className={`cake-layer-slot${compact ? " is-exploded" : ""}`}>
      <Image
        src={`${displayed}?v=7`}
        alt="Vista de tu torta"
        fill
        priority
        unoptimized
        sizes="(max-width: 639px) 60vw, 420px"
        className={`object-contain object-bottom cake-crossfade ${
          incoming ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
        }`}
      />
      {incoming ? (
        <Image
          src={`${incoming}?v=7`}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 639px) 60vw, 420px"
          className="object-contain object-bottom cake-crossfade scale-100 opacity-100"
        />
      ) : null}
      {children}
    </div>
  );
}

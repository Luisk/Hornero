"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type CakeToppingsProps = {
  images: string[];
};

export function CakeToppings({ images }: CakeToppingsProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const slot = frameRef.current?.parentElement;
    const img = slot?.querySelector("img");
    if (!slot || !img) {
      return;
    }

    const update = () => {
      const slotRect = slot.getBoundingClientRect();
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      if (!naturalWidth || !naturalHeight) {
        return;
      }

      const scale = Math.min(
        slotRect.width / naturalWidth,
        slotRect.height / naturalHeight,
      );

      setBox({
        width: naturalWidth * scale,
        height: naturalHeight * scale,
      });
    };

    update();
    img.addEventListener("load", update);
    const observer = new ResizeObserver(update);
    observer.observe(slot);

    return () => {
      img.removeEventListener("load", update);
      observer.disconnect();
    };
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={frameRef}
      className="cake-topping-frame"
      style={
        box.width > 0
          ? { width: box.width, height: box.height }
          : { width: "100%", aspectRatio: "976 / 675" }
      }
    >
      {images.map((image) => (
        <div key={image} className="cake-topping-slot">
          <Image
            src={`${image}?v=8`}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 639px) 40vw, 240px"
            className="object-contain object-bottom"
          />
        </div>
      ))}
    </div>
  );
}

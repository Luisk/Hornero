"use client";

import Link from "next/link";
import { BuilderPrice } from "@/components/cake-builder/BuilderPrice";
import { HomeIcon } from "@/components/ui/HomeIcon";

export function BuilderHeader() {
  return (
    <header className="relative h-12 md:h-14">
      <div className="mx-auto flex h-full w-full min-w-0 max-w-6xl items-center gap-3 px-4 md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-chocolate focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
            aria-label="Inicio"
          >
            <HomeIcon className="h-6 w-6" />
          </Link>
          <p className="font-sans min-w-0 text-[13px] font-medium tracking-[0.28em] text-chocolate md:text-sm">
            HORNERO
          </p>
        </div>
        <BuilderPrice />
      </div>
    </header>
  );
}

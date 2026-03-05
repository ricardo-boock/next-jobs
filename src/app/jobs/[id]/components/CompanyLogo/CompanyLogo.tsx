"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src?: string | null;
  alt: string;
};

export function CompanyLogo({ src, alt }: Props) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!src) return;

    let active = true;

    const img = new window.Image();
    img.src = src;

    // decode() is the important part: it fails if the bytes aren't a valid image
    img
      .decode()
      .then(() => {
        if (active) setOk(true);
      })
      .catch(() => {
        if (active) setOk(false);
      });

    return () => {
      active = false;
    };
  }, [src]);

  if (!src || !ok) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={50}
      height={50}
      className="inline-block my-0 max-h-12.5 w-auto object-contain"
      // extra safety: if Next/Image fails to load/optimize, hide it
      onError={() => setOk(false)}
    />
  );
}

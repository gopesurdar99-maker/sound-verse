"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ProductImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src || "/fallback-headphone.png");

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setImgSrc("/fallback-headphone.png")}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 800}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setImgSrc("/fallback-headphone.png")}
    />
  );
}

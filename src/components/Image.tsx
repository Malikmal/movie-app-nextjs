import Image from "next/image";
import { useState } from "react";

export const IMAGE_NOT_FOUND_SRC = "/image_not_found.jpg";

export interface IImageProps {
  src: string;
  alt: string;
  props: object;
}

export default function Images({ src, alt, ...props }: IImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      data-testid="image"
      {...props}
      alt={alt}
      src={imgSrc}
      onError={() => setImgSrc(IMAGE_NOT_FOUND_SRC)}
    />
  );
}

import Image from "next/image";
import { Media } from "@/app/page";
import customImageLoader from "@/app/components/ImageSlider/MobileZoom";
import { CSSProperties } from "react";

interface ResponsiveImageProps {
  media?: { image: Media };
  layoutWidth?: number;
  layoutHeight?: number;
  fill?: boolean;
  objectFit?: string;
  objectPosition?: string;
  className?: string;
  forceFullSize?: boolean;
  style?: CSSProperties;
  alt?: string;
  ariaHidden?: boolean;
}

const ResponsiveImage = ({
  media,
  layoutWidth,
  layoutHeight,
  fill,
  objectFit,
  objectPosition,
  className,
  forceFullSize,
  style,
  alt,
  ariaHidden,
}: ResponsiveImageProps) => {
  // console.log('ResponsiveImage props:', { media, layoutWidth, layoutHeight });

  if (!media || !media.image || !media.image.url) {
    console.log("No image data available");
    return (
      <div
        className={`bg-gray-200 ${className}`}
        style={{
          width: fill ? "100%" : layoutWidth,
          height: fill ? "100%" : layoutHeight,
          backgroundColor: "#f0f0f0",
        }}
      >
        No image
      </div>
    );
  }

  return (
    <Image
      // loader={({ src, width }) =>
      //   customImageLoader({ src, width: forceFullSize ? 2048 : width, media })
      // }
      src={media.image.url || ""}
      alt={alt || media.image.alt || ""}
      width={fill ? undefined : forceFullSize ? 2048 : layoutWidth}
      height={fill ? undefined : forceFullSize ? 2048 : layoutHeight}
      sizes="(max-width: 400px) 100vw, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 2048px"
      aria-hidden={ariaHidden}
      fill={fill}
      objectFit={objectFit}
      objectPosition={objectPosition}
      className={className}
      style={style}
    />
  );
};

export default ResponsiveImage;

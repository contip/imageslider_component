import { cn } from "@/lib/utils";
import { Media } from "@/app/page";
import Image from "next/image";
import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import useMediaQuery from "@/app/hooks/use-media-query";
import customImageLoader from "@/app/components/ImageSlider/MobileZoom";
import MobileZoom from "./MobileZoom";

interface ZoomImageProps {
  toastShown: boolean;
  setToastShown: Dispatch<SetStateAction<boolean>>;
  toast: any;
  isZoomed: boolean;
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>;
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
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  zoomLevel?: number;
  sliderRef: React.MutableRefObject<HTMLDivElement | null>;
  activeIndex: number;
  imagesLength: number;
}

const ZoomImage = (props: ZoomImageProps) => {
  const {
    isZoomed,
    setIsZoomed,
    media,
    layoutWidth,
    layoutHeight,
    fill,
    objectFit,
    objectPosition,
    className,
    forceFullSize,
    alt,
    ariaHidden,
    isFullScreen,
    setIsFullScreen,
    zoomLevel = 2,
    sliderRef,
  } = props;

  const MAGNIFIER_SIZE = 5000;
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    updatePosition(e);
  };

  const updatePosition = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!sliderRef.current || !imageRef.current) return;

    const { clientX, clientY } =
      "touches" in e
        ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
        : { clientX: e.clientX, clientY: e.clientY };

    if (clientX === undefined || clientY === undefined) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const imageRect = e.currentTarget.getBoundingClientRect();
    const mouseOffsetX = clientX - imageRect.left;
    const mouseOffsetY = clientY - imageRect.top;

    const sliderOffsetX = clientX - 1;
    const sliderOffsetY = clientY - sliderRect.top;

    const imageOffsetX = (sliderRect.width - imageSize.width) / 2;
    const imageOffsetY = (sliderRect.height - imageSize.height) / 2;

    const offsetX = sliderOffsetX - imageOffsetX;
    const offsetY = sliderOffsetY - imageOffsetY;

    const backgroundPosX = -(offsetX * zoomLevel - MAGNIFIER_SIZE / 2);
    const backgroundPosY = -(offsetY * zoomLevel - MAGNIFIER_SIZE / 2);

    setPosition({
      x: backgroundPosX,
      y: backgroundPosY,
      mouseX: mouseOffsetX - MAGNIFIER_SIZE / 2,
      mouseY: mouseOffsetY - MAGNIFIER_SIZE / 2,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFullScreen) {
      setIsFullScreen(true);
      return;
    }
    if (!isZoomed) {
      setIsZoomed(true);
      updatePosition(e);
    } else {
      setIsZoomed(false);
    }
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight, width, height } = e.currentTarget;
    imageRef.current = e.currentTarget;

    const aspectRatio = naturalWidth / naturalHeight;
    const containerAspectRatio = width / height;
    let renderedWidth, renderedHeight;
    if (aspectRatio > containerAspectRatio) {
      renderedWidth = width;
      renderedHeight = width / aspectRatio;
    } else {
      renderedHeight = height;
      renderedWidth = height * aspectRatio;
    }
    setImageSize({ width: renderedWidth, height: renderedHeight });
  };

  if (!media) {
    return (
      <div
        className={cn(`bg-gray-200 ${className}`, {
          "w-full h-full": fill || forceFullSize || isFullScreen,
        })}
      >
        No image
      </div>
    );
  }

  if (isTouchDevice) {
    return <MobileZoom {...props} />;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={cn("flex justify-center z-10 w-fit max-h-fit relative", {
        "cursor-zoom-in": !isZoomed && !isTouchDevice,
        "cursor-zoom-out": isZoomed && !isTouchDevice,
        "h-full": !isFullScreen,
      })}
    >
      <Image
        // loader={({ src, width }) =>
        //   customImageLoader({
        //     src,
        //     width: forceFullSize ? 2048 : width,
        //     media,
        //   })
        // }
        ref={imageRef}
        src={media.image.url || ""}
        alt={alt || media.image.alt || ""}
        width={fill ? undefined : forceFullSize ? 2048 : layoutWidth}
        height={fill ? undefined : forceFullSize ? 2048 : layoutHeight}
        sizes="(max-width: 400px) 100vw, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 2048px"
        aria-hidden={ariaHidden}
        fill={fill}
        objectFit={objectFit}
        objectPosition={objectPosition}
        className={cn(className, {
          "opacity-0": isZoomed,
        })}
        // style={style}
        onLoad={handleImageLoad}
      />
      {isZoomed && (
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${sanitizeUrl(
              media.image.sizes?.full?.url || media.image.url || ""
            )})`,
            backgroundSize: `${imageSize.width * zoomLevel}px ${
              imageSize.height * zoomLevel
            }px`,
            backgroundRepeat: "no-repeat",
            display: isZoomed ? "block" : "hidden",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className="z-50 pointer-events-none absolute"
        />
      )}
    </div>
  );
};

const sanitizeUrl = (url: string) => {
  return url.replace(/ /g, "%20");
};

export default ZoomImage;

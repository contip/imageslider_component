import { cn } from "@/lib/utils";
import { Media } from "@/app/page";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import useSwipe, { SWIPE_DIR } from "@/app/hooks/use-swipe";
// import ResponsiveImage from "../ResponsiveImage";
import { useToast } from "@/app/components/ui/use-toast";
import SliderControls from "./SliderControls";
import ZoomImage from "./ZoomImage";
import Thumbnails from "./Thumbnails";

type ImageSliderProps = {
  images: Media[];
  controlled: boolean;
  controlledProps?: {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isFullScreen: boolean;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  };
};

const ImageSlider = ({
  images,
  controlled,
  controlledProps,
}: ImageSliderProps) => {
  const [localActiveIndex, setLocalActiveIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = controlled
    ? controlledProps?.activeIndex ?? localActiveIndex
    : localActiveIndex;
  const setActiveIndex = controlled
    ? controlledProps?.setActiveIndex ?? setLocalActiveIndex
    : setLocalActiveIndex;

  const swipe: SWIPE_DIR | null = useSwipe(
    containerRef as React.RefObject<HTMLDivElement>
  );
  const [toastShown, setToastShown] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (thumbnailContainerRef.current && controlled && controlledProps) {
      const activeThumbnail = thumbnailContainerRef.current.children[
        activeIndex
      ] as HTMLElement | null;
      activeThumbnail?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [activeIndex, images.length, controlled, controlledProps]);

  useEffect(() => {
    const handleSwipe = () => {
      if (swipe === SWIPE_DIR.LEFT && !isZoomed) {
        handleNextImage();
      } else if (swipe === SWIPE_DIR.RIGHT && !isZoomed) {
        handlePreviousImage();
      }
    };
    handleSwipe();
  }, [swipe]);

  const handleNextImage = () => {
    const newIndex = (activeIndex + 1) % images.length;
    setActiveIndex(newIndex);
  };

  const handlePreviousImage = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(newIndex);
  };

  const handlePreviousClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handlePreviousImage();
  };

  const handleNextClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleNextImage();
  };

  return (
    <section
      ref={containerRef}
      aria-label="Product Image Slider"
      className={cn(
        "w-full flex flex-col items-center justify-center relative",
        {
          "xl:flex-row": controlled && !controlledProps?.isFullScreen,
          "fixed inset-0 z-50 bg-gray-100 mt-12": controlledProps?.isFullScreen,
        }
      )}
    >
      <a
        className="absolute w-px h-px p-0 -m-px overflow-hidden border-0 focus-visible:top-0 focus-visible:border-solid focus-visible:p-2 focus-visible:w-auto focus-visible:h-auto focus-visible:z-50 focus-visible:bg-slate-600"
        href="#after-image-slider"
      >
        Skip Image Slider Controls
      </a>
      <div
        className={cn("flex justify-center w-full group/slider basis-10/12", {
          "xl:order-1": controlled && !controlledProps?.isFullScreen,
        })}
      >
        <div className="w-full min-w-full flex flex-nowrap overflow-hidden relative">
          <SliderControls
            handleNextClick={handleNextClick}
            handlePrevClick={handlePreviousClick}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            numImages={images.length}
            className={cn({
              hidden: isZoomed,
            })}
          />
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-full flex items-center justify-center relative transition-transform ease-in-out duration-200"
                ref={sliderRef}
                style={{
                  transform: `translateX(-${
                    controlled && controlledProps
                      ? controlledProps.activeIndex * 100
                      : activeIndex * 100
                  }%)`,
                }}
              >
                <div className="flex items-center justify-center relative">
                  {controlled && controlledProps ? (
                    <ZoomImage
                      toastShown={toastShown}
                      setToastShown={setToastShown}
                      toast={toast}
                      isZoomed={isZoomed}
                      setIsZoomed={setIsZoomed}
                      sliderRef={sliderRef}
                      imagesLength={images.length}
                      activeIndex={controlledProps.activeIndex}
                      isFullScreen={controlledProps.isFullScreen}
                      setIsFullScreen={controlledProps.setIsFullScreen}
                      key={index}
                      media={{ image }}
                      layoutWidth={2048}
                      layoutHeight={2048}
                      ariaHidden={index !== controlledProps.activeIndex}
                      alt={`Image ${index + 1}`}
                      className={cn(
                        "w-full h-full object-contain object-center max-h-[70vh]"
                      )}
                    />
                  ) : (
                    // <ResponsiveImage
                    //   media={{ image }}
                    //   layoutWidth={400}
                    //   layoutHeight={400}
                    //   alt={`${image.alt}` ?? `Image ${index + 1}`}
                    //   className="flex-none w-full h-full object-contain object-center"
                    // />
                    <div>bung</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {controlled && controlledProps && images && images.length > 1 && (
        <Thumbnails
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          containerRef={
            thumbnailContainerRef as React.RefObject<HTMLDivElement>
          }
          isFullScreen={controlledProps.isFullScreen}
          className={undefined}
        />
      )}
      <div id="after-image-slider" />
    </section>
  );
};

export default ImageSlider;

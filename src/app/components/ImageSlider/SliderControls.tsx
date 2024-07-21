import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, Circle, CircleDot } from "lucide-react";
import React from "react";

interface SliderControlsProps {
  handleNextClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handlePrevClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  numImages: number;
  className: string;
}

const SliderControls = ({
  handleNextClick,
  handlePrevClick,
  setActiveIndex,
  activeIndex,
  numImages,
  className,
}: SliderControlsProps) => {
  const activeStyles =
    "active:scale-[0.97] grid opacity-0 group-hover/slider:opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inactiveStyles = "hidden text-gray-400";

  return (
    <div
      className={cn(
        "absolute inset-0 transition fade-in-10 fade-out-10",
        className,
        { hidden: numImages <= 1 }
      )}
    >
      <button
        onClick={handleNextClick}
        className={cn(
          activeStyles,
          "right-3 transition bg-gray-300 group/rbutton hover:bg-gray-500 text-primary-800"
        )}
        aria-label="Next Image"
      >
        <ChevronRight
          aria-hidden
          className="h-5 w-5 text-zinc-700 group-hover/rbutton:text-white"
        />
      </button>
      <button
        onClick={handlePrevClick}
        className={cn(
          activeStyles,
          "left-3 transition bg-gray-300 group/lbutton hover:bg-gray-500 text-primary-800"
        )}
        aria-label="Previous Image"
      >
        <ChevronLeft
          aria-hidden
          className="h-5 w-5 text-zinc-700 group-hover/lbutton:text-white"
        />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-1 z-50">
        {[...Array(numImages)].map((_, index) => (
          <button
            key={index}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.stopPropagation();
              setActiveIndex(index);
            }}
            className="w-4 h-4 cursor-pointer hocus-visible:scale-125 transition-all duration-100 ease-in-out"
            aria-label={`View Image ${index + 1}`}
          >
            {index === activeIndex ? (
              <CircleDot
                aria-hidden
                className="stroke-white fill-black w-full h-full"
              />
            ) : (
              <Circle
                aria-hidden
                className="stroke-white fill-black w-full h-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderControls;

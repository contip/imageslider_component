import { cn } from '@/lib/utils'
import { Media } from '@/app/page'
import React from 'react'
import ResponsiveImage from '@/app/components/ResponsiveImage'

interface ThumbnailsProps {
  images: Media[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  containerRef: React.RefObject<HTMLDivElement>
  className?: string
  isFullScreen: boolean
}

const Thumbnails = ({
  images,
  activeIndex,
  setActiveIndex,
  containerRef,
  className,
  isFullScreen,
}: ThumbnailsProps) => {
  return (
    <div
      className={cn(
        'flex overflow-auto whitespace-nowrap scrollbar-hide w-full items-center basis-2/12',
        {
          'xl:flex-col xl:h-[90%] 2xl:h-[100%]': !isFullScreen,
          'justify-center pb-6': isFullScreen,
        },
        className,
      )}
      ref={containerRef}
    >
      {images.map((image, index) => (
        <button
          key={image.id}
          className={cn('m-3 min-w-24 min-h-24 max-w-24 max-h-24 justify-center items-center', {
            'opacity-100': index === activeIndex,
            'opacity-30': index !== activeIndex,
          })}
          onClick={() => setActiveIndex(index)}
          aria-label={`Thumbnail ${index + 1}`}
        >
          <ResponsiveImage
            className="object-cover object-center"
            layoutHeight={200}
            layoutWidth={200}
            // fill
            media={{ image }}
          />
        </button>
      ))}
    </div>
  )
}

export default Thumbnails

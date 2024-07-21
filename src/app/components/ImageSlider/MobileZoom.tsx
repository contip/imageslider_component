import { cn } from '@/lib/utils'
import { Media } from '@/app/page'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'


interface ImageLoaderProps {
  src: string
  width: number
  media?: { image: Media }
  quality?: number
}

const imageSizes = [
  { name: 'thumbnail', width: 400 },
  { name: 'card', width: 768 },
  { name: 'tablet', width: 1024 },
  { name: 'full', width: 2048 },
]

export const customImageLoader = ({ src, width, media, quality = 75 }: ImageLoaderProps) => {
  // console.log('CustomImageLoader input:', { src, width, media, quality });

  if (!media) return src

  const closestSize = imageSizes.reduce((prev, curr) => {
    return Math.abs(curr.width - width) < Math.abs(prev.width - width) ? curr : prev
  }).name

  // console.log('Closest size:', closestSize);

  const sanitizeUrl = (url: string) => {
    return url.replace(/ /g, '%20')
  }

  const url =
    media.image.sizes?.[closestSize as keyof typeof media.image.sizes]?.url ||
    media.image.url ||
    src

  return sanitizeUrl(url)
}

interface MobileZoomProps {
  toastShown: boolean
  setToastShown: Dispatch<SetStateAction<boolean>>
  toast: any
  isZoomed: boolean
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>
  media?: { image: Media }
  layoutWidth?: number
  layoutHeight?: number
  className?: string
  alt?: string
  isFullScreen: boolean
  setIsFullScreen: Dispatch<SetStateAction<boolean>>
  zoomLevel?: number
  sliderRef: React.MutableRefObject<HTMLDivElement | null>
  activeIndex: number
  imagesLength: number
}

const MobileZoom = ({
  toastShown,
  setToastShown,
  toast,
  isZoomed,
  setIsZoomed,
  media,
  layoutWidth,
  layoutHeight,
  className,
  alt,
  isFullScreen,
  setIsFullScreen,
  zoomLevel,
  sliderRef,
  activeIndex,
  imagesLength,
}: MobileZoomProps) => {
  const [scale, setScale] = useState<number>(1)
  return (
    <div
      className={cn('flex justify-center z-10 w-fit h-full max-h-fit relative')}
      onClick={() => {
        setIsFullScreen(true)
        if (!toastShown) {
          toast({
            title: 'Zoom Functionality',
            description: 'Use Pinch Controls to Zoom In and Out',
            duration: 2000,
          })
          setToastShown(true)
        }
      }}
    >
      <TransformWrapper
        onTransformed={(e) => {
          if (e.instance.transformState.scale > 1) {
            setIsZoomed(true)
          } else if (e.instance.transformState.scale === 1) {
            setIsZoomed(false)
          }
        }}
        doubleClick={{ mode: 'reset' }}
        onZoom={(ref) => setScale(ref.state.scale)}
        panning={{ disabled: scale <= 1.1, velocityDisabled: true }}
        disabled={!isFullScreen}
      >
        <TransformComponent
          wrapperStyle={{
            width: 'fit-content',
            height: '100%',
            maxHeight: 'fit-content',
          }}
          contentStyle={{
            width: 'fit-content',
            height: '100%',
            maxHeight: 'fit-content',
          }}
        >
          <Image
            loader={({ src, width }) =>
              customImageLoader({
                src,
                width: width,
                media,
              })
            }
            src={media?.image.url || ''}
            alt={alt || media?.image.alt || ''}
            width={2048}
            height={2048}
            sizes="(max-width: 400px) 100vw, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 2048px"
            className={cn(className)}
            // style={style}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default MobileZoom

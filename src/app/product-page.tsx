"use client";

// import Breadcrumbs from '@/app/blocks/Breadcrumbs'
// import Blocks from '@/app/components/Blocks'
import ImageSlider from "@/app/components/ImageSlider/ImageSlider";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import ProductHero from "@/app/components/ProductHero";
// import ProductOrderInfo from '@/app/components/ProductOrderInfo'
// import ProductReel from '@/app/components/ProductReel'
import { Separator } from "@/app/components/ui/separator";
// import useLocalStorage from '@/app/hooks/use-local-storage'
// import { FindOptions, Query, getDocs } from '@/app/utilities/getDocs'
// import getMedia from '@/app/utilities/getMedia'
import type { Product, Media } from "@/app/page";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";

export type RecentlyViewedItem = { modelId: string; visited: number };

type MediaOrNumber = {
  image?: number | Media | null | undefined;
  id?: string | null | undefined;
};

const getMedia = (images: MediaOrNumber[] | null | undefined): Media[] => {
  if (!images) return [];
  return images.reduce((acc: Media[], img) => {
    if (img.image && typeof img.image !== "number") {
      acc.push(img.image as Media); // Safe type assertion, since we checked it's not a number
    }
    return acc;
  }, []);
};

const ProductPage = ({
  product,
  related,
}: //   template,
{
  product: Product;
  related: Product[];
  //   template: Template
}) => {
  const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const productImages = getMedia([
    ...(product.searchImages || []),
    ...(product.images || []),
  ]);

  return (
    <MaxWidthWrapper>
      {isZoomedIn && (
        <Dialog open={isZoomedIn} onOpenChange={setIsZoomedIn}>
          <DialogContent className="w-full max-w-full h-full max-h-full">
            <ImageSlider
              images={productImages}
              controlled={true}
              controlledProps={{
                activeIndex: activeIndex,
                setActiveIndex: setActiveIndex,
                isFullScreen: isZoomedIn,
                setIsFullScreen: setIsZoomedIn,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      {/* {product.layoutPre && product.layoutPre.length > 0 && <Blocks blocks={product.layoutPre} />} */}
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-5 w-full h-full gap-4">
        <div className="flex w-full md:col-span-5">
          <p>bung</p>
        </div>
        <div className="flex w-full mx-auto h-full md:col-span-3 max-h-[75vh]">
          <ImageSlider
            images={productImages}
            controlled={true}
            controlledProps={{
              activeIndex: activeIndex,
              setActiveIndex: setActiveIndex,
              isFullScreen: isZoomedIn,
              setIsFullScreen: setIsZoomedIn,
            }}
          />
        </div>
        <div className="w-full h-full md:col-span-2 max-h-[75vh]">
          <ProductHero product={product} />
        </div>
      </div>
      <Separator className="my-6" orientation="horizontal" />
      <div className="w-full h-full py-6">
        <p>Bung 2</p>
      </div>
      {/* <ProductGuarantees />
      <Separator className="my-6" orientation="horizontal" />
      <ProductReviews />
      <Separator className="my-6" orientation="horizontal" /> */}
    </MaxWidthWrapper>
  );
};

export default ProductPage;

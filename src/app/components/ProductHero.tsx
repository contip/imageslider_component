"use client";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/app/page";
import { PhoneOutgoing } from "lucide-react";
import React from "react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const getPriceData = ({
  effectivePrice,
  suggestedPrice,
}: {
  effectivePrice: number | null | undefined;
  suggestedPrice: number | null | undefined;
}) => {
  const realEffectivePrice = effectivePrice ?? 0;
  const realSuggestedPrice = suggestedPrice ?? 0;
  const label =
    realEffectivePrice &&
    realSuggestedPrice &&
    realEffectivePrice < realSuggestedPrice
      ? `Sale Price: `
      : `Price: `;
  const formattedPrice = realEffectivePrice
    ? `${formatPrice(realEffectivePrice)}`
    : realSuggestedPrice
    ? `${formatPrice(realSuggestedPrice)}`
    : `Please call`;
  const formattedSuggestedPrice =
    realSuggestedPrice &&
    realEffectivePrice &&
    realEffectivePrice < realSuggestedPrice
      ? `${formatPrice(realSuggestedPrice)}`
      : null;
  const save =
    realEffectivePrice &&
    realSuggestedPrice &&
    realEffectivePrice < realSuggestedPrice
      ? `${formatPrice(realSuggestedPrice - realEffectivePrice)} (${Math.round(
          ((realSuggestedPrice - realEffectivePrice) / realSuggestedPrice) * 100
        )}%)`
      : null;
  return { label, formattedPrice, formattedSuggestedPrice, save };
};

const ProductHero = ({
  product,
  config,
}: {
  product: Product;
  config?: any;
}) => {
  const defaultConfig = {
    border: true,
    bOpt: {
      bStyle: "rounded",
      bColor: "border-gray-200",
    },
    separators: true,
    title: {
      textSize: [
        {
          size: "text-4xl",
        },
        {
          size: "lg:text-5xl",
        },
      ],
      textJustification: [
        {
          justification: "text-start",
        },
      ],
      textColor: [
        {
          fullColor: "text-primary",
        },
      ],
    },
    inStock: {
      textSize: [
        {
          size: "text-xs",
        },
        {
          size: "xl:text-base",
        },
      ],
      textJustification: [{ justification: "text-start" }],
      textColor: [{ fullColor: "text-muted-foreground" }],
      content: "In-stock!",
    },
    description: {
      textSize: [
        {
          size: "text-sm",
        },
        {
          size: "xl:text-base",
        },
      ],
      textJustification: [{ justification: "text-start" }],
      textColor: [{ fullColor: "text-card-foreground" }],
    },
    price: {
      textSize: [
        {
          size: "text-sm",
        },
        {
          size: "xl:text-base",
        },
      ],
      textJustification: [{ justification: "text-start" }],
      // textColor: [{ fullColor: null }],
    },
    showSavings: false,
    dimensions: {
      textSize: [
        {
          size: "text-xs",
        },
        {
          size: "xl:text-base",
        },
      ],
      textColor: [{ fullColor: "text-primary" }],
      content: "Dimensions not available at this time",
    },
    buttonConfig: "full",
    context: "productDescription",

    // style: 'rounded',
    // borderColor: 'border-gray-200',
    // separators: true,
    // titleSize: [
    //   {
    //     size: 'text-4xl',
    //   },
    //   {
    //     size: 'lg:text-5xl',
    //   },
    // ],
    // titleColor: 'text-primary',
    // includeModelId: true,
    // titleJustification: 'text-start',
    // inStockSize: [
    //   {
    //     size: 'text-xs',
    //   },
    //   {
    //     size: 'xl:text-base',
    //   },
    // ],
    // inStockColor: 'text-muted-foreground',
    // inStockText: 'In-stock!',
    // inStockJustification: 'text-start',
    // descriptionSize: [
    //   {
    //     size: 'text-sm',
    //   },
    //   {
    //     size: 'xl:text-base',
    //   },
    // ],
    // descriptionColor: 'text-card-foreground',
    // descriptionJustification: 'text-start',
    // priceSize: [
    //   {
    //     size: 'text-sm',
    //   },
    //   {
    //     size: 'xl:text-base',
    //   },
    // ],
    // priceColor: null,
    // priceJustification: 'text-start',
    // showSavings: false,
    // fallbackText: 'Please call',
    // dimensionsSize: [
    //   {
    //     size: 'text-xs',
    //   },
    //   {
    //     size: 'xl:text-base',
    //   },
    // ],
    // dimensionsColor: 'text-primary',
    // dimensFallback: 'Dimensions not available at this time',
    // buttonConfig: 'full',
    // context: 'productDescription',
  };
  //md:text-xs

  const effectiveConfig = { ...defaultConfig, ...config };
  const {
    border,
    bOpt,
    separators,
    title,
    inStock,
    description,
    price,
    showSavings,
    dimensions,
    buttonConfig,
    context,
  } = effectiveConfig;

  const borderColorClasses = border && bOpt?.bColor ? bOpt.bColor : "";
  const titleClasses = cn(
    ...(title?.textSize
      ? title.textSize.map((s: any) => s.size).filter((s: any) => s)
      : []),
    ...(title?.textJustification
      ? title.textJustification.map((j: any) => j.justification).filter((j: any) => j)
      : []),
    ...(title?.textColor
      ? title.textColor.map((c: any) => c.fullColor).filter((c: any) => c)
      : [])
  );
  const inStockClasses = cn(
    ...(inStock?.textSize
      ? inStock.textSize.map((s: any) => s.size).filter((s: any) => s)
      : []),
    ...(inStock?.textJustification
      ? inStock.textJustification.map((j: any) => j.justification).filter((j: any) => j)
      : []),
    ...(inStock?.textColor
      ? inStock.textColor.map((c: any) => c.fullColor).filter((c: any) => c)
      : [])
  );
  const descriptionClasses = cn(
    ...(description?.textSize
      ? description.textSize.map((s: any) => s.size).filter((s: any) => s)
      : []),
    ...(description?.textJustification
      ? description.textJustification
          .map((j: any) => j.justification)
          .filter((j: any) => j)
      : []),
    ...(description?.textColor
      ? description.textColor.map((c: any) => c.fullColor).filter((c: any) => c)
      : [])
  );
  const priceClasses = cn(
    ...(price?.textSize
      ? price.textSize.map((s: any) => s.size).filter((s: any) => s)
      : []),
    ...(price?.textJustification
      ? price.textJustification.map((j: any) => j.justification).filter((j: any) => j)
      : []),
    ...(price?.textColor
      ? price.textColor.map((c: any) => c.fullColor).filter((c: any) => c)
      : [])
  );
  const dimensionsClasses = cn(
    ...(dimensions?.textSize
      ? dimensions.textSize.map((s: any) => s.size).filter((s: any) => s)
      : []),
    ...(dimensions?.textJustification
      ? dimensions.textJustification
          .map((j: any) => j.justification)
          .filter((j: any) => j)
      : []),
    ...(dimensions?.textColor
      ? dimensions.textColor.map((c: any) => c.fullColor).filter((c: any) => c)
      : [])
  );

  let titleString = product.title ?? "";
  if (title?.showModelId) titleString += ` - ${product.modelId.toUpperCase()}`;
  if (titleString.length === 0) titleString = product.modelId.toUpperCase();

  const mainDimensions = [
    { name: "Width", value: product.width },
    { name: "Height", value: product.height },
    { name: "Depth", value: product.depth },
  ].filter((dimension) => dimension.value);
  const innerDimensions = [
    { name: "Inner Width", value: product.openWidth },
    { name: "Inner Height", value: product.openHeight },
  ].filter((dimension) => dimension.value);

  const { formattedPrice, formattedSuggestedPrice, label, save } = getPriceData(
    {
      effectivePrice: product.stock === 0 ? 0 : product.effectivePrice,
      suggestedPrice: product.stock === 0 ? 0 : product.suggestedPrice,
    }
  );

  return (
    <div
      className={cn(
        "w-full h-full grid grid-flow-row grid-cols-2 relative",
        (border && bOpt?.bStyle === "rounded") || bOpt?.bStyle === "square"
          ? "border"
          : null,
        border && bOpt?.bStyle === "rounded" ? "rounded-3xl" : null,
        border && bOpt?.bColor ? borderColorClasses : null
      )}
    >
      <div className="items-center col-span-2">
        <h1
          className={cn("px-4 py-1 font-bold lg:font-extrabold", titleClasses)}
        >
          {titleString}
        </h1>
      </div>
      {separators && (
        <Separator
          className="w-full col-span-2 my-3 lg:my-0"
          orientation="horizontal"
        />
      )}
      {product.stock !== null &&
        product.stock !== undefined &&
        product.stock > 0 && (
          <p
            className={cn("block text-nowrap px-4 col-span-2", inStockClasses)}
          >
            {inStock?.content}
          </p>
        )}
      <div
        className={cn("col-span-2 px-4 py-1 flex-grow", {
          "min-h-[96px] line-clamp-4": context === "categoryBrowse",
        })}
      >
        <p className={cn(descriptionClasses)}>{`${
          product.description ?? product.title ?? product.modelId.toUpperCase()
        }`}</p>
      </div>
      {separators && (
        <Separator
          className="w-full col-span-2 my-4 lg:my-0"
          orientation="horizontal"
        />
      )}
      <div className="pt-1 pb-0 mb-0 flex w-full px-4">
        <h3 className={cn("text-nowrap mr-2 font-bold", priceClasses)}>
          {label}
        </h3>
        <h3
          className={cn(
            "text-center rounded-md text-black font-semibold w-full",
            priceClasses,
            {
              "bg-gray-400 bg-opacity-10 w-min": label.includes("Sale Price"),
              // "text-muted-foreground": !label.includes("Sale"),
            }
          )}
        >
          {formattedPrice}
        </h3>
        {formattedSuggestedPrice !== null &&
          formattedPrice !== "Please call" && (
            <h3
              className={cn(
                "h-min text-center rounded-md text-muted-foreground font-semibold bg-gray-400 bg-opacity-10 line-through w-min mx-3",
                priceClasses
              )}
            >
              {formattedSuggestedPrice}
            </h3>
          )}
      </div>
      {separators && (
        <Separator
          className="w-full col-span-2 my-4 lg:my-0"
          orientation="horizontal"
        />
      )}
      <div className={cn("flex flex-col col-span-2 w-full px-4", {})}>
        <h3
          className={`col-span-2 ${
            context === "categoryBrowse" ? "text-base" : "text-sm xl:text-base"
          } font-bold pb-2`}
        >
          Dimensions:
        </h3>
        {mainDimensions.length > 0 && (
          <div
            className={cn(
              "flex",
              context === "categoryBrowse"
                ? "justify-evenly"
                : "justify-evenly lg:justify-center lg:gap-5"
            )}
          >
            {mainDimensions.map((dimension, index) =>
              dimension.value ? (
                <React.Fragment key={index}>
                  <span
                    key={index}
                    className={cn(
                      "font-bold text-card-foreground",
                      dimensionsClasses
                    )}
                  >
                    {`${dimension.name}:`}
                  </span>
                  <span
                    className={dimensionsClasses}
                  >{`${dimension.value}(in)`}</span>
                  {index !== mainDimensions.length - 1 && (
                    <Separator orientation="vertical" />
                  )}
                </React.Fragment>
              ) : null
            )}
          </div>
        )}
        {innerDimensions.length > 0 && (
          <div
            className={cn(
              "flex",
              context === "categoryBrowse"
                ? "justify-evenly"
                : "justify-evenly lg:justify-center lg:gap-5"
            )}
          >
            {innerDimensions.map((dimension, index) =>
              dimension.value ? (
                <>
                  <span
                    key={index}
                    className={cn(
                      "font-bold text-card-foreground",
                      dimensionsClasses
                    )}
                  >
                    {`${dimension.name}:`}
                  </span>
                  <span
                    className={dimensionsClasses}
                  >{`${dimension.value}(in)`}</span>
                  {index !== innerDimensions.length - 1 && (
                    <Separator orientation="vertical" />
                  )}
                </>
              ) : null
            )}
          </div>
        )}
        {mainDimensions.length === 0 && innerDimensions.length === 0 && (
          <p className="text-card-foreground text-xs lg:text-sm font-normal">
            {dimensions?.content}
          </p>
        )}
      </div>
      {separators && (
        <Separator
          className="w-full col-span-2 my-4 lg:my-0"
          orientation="horizontal"
        />
      )}
      <div className="grid grid-flow-row grid-cols-2 col-span-2 w-full px-4 mb-2 lg:mb-0">
        {buttonConfig === "full" && (
          <>
            <div className="grid grid-cols-2 col-span-2 w-full px-4 gap-1">
              <Button variant={"outline"} className="w-full place-self-center">
                <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-xs lg:text-sm xl:text-base">
                  Request More Info
                </p>
              </Button>
              <Button
                variant={"outline"}
                size="icon"
                className="w-full place-self-center text-sm xl:text-base"
              >
                <PhoneOutgoing className="w-4 h-4" />
              </Button>
            </div>
            <div className="col-span-2 py-1 w-full px-4 text-center">
              <Button
                variant={"outline"}
                className="w-full text-xs lg:text-sm xl:text-base"
              >
                Purchase Now
              </Button>
            </div>
          </>
        )}
        {buttonConfig === "moreInfo" && (
          <Button
            variant={"outline"}
            className="w-full col-span-2 place-self-center my-4"
          >
            More Info
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHero;

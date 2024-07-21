import Image from "next/image";
import ProductPage from "./product-page";

export interface Product {
  id: number;
  modelId: string;
  title?: string | null;
  publishedOn?: string | null;
  width?: number | null;
  depth?: number | null;
  length?: number | null;
  height?: number | null;
  openWidth?: number | null;
  openHeight?: number | null;
  price?: number | null;
  suggestedPrice?: number | null;
  effectivePrice?: number | null;
  onSale?: boolean | null;
  color?: string | null;
  description?: string | null;
  googleFeed?: boolean | null;
  stock?: number | null;
  featuredItem?: boolean | null;
  searchImages?:
    | {
        image?: number | Media | null;
        id?: string | null;
      }[]
    | null;
  images?:
    | {
        image?: number | Media | null;
        id?: string | null;
      }[]
    | null;
  relatedProducts?:
    | {
        relatedProduct?: (number | null) | Product;
        id?: string | null;
      }[]
    | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: number | Media | null;
  };
}

export interface Media {
  id: number;
  alt?: string | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    full?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

const product: Product = {
  id: 1,
  modelId: "MFP-2999",
  title: "Elegant Marble Fireplace Mantel",
  description:
    "This exquisite marble fireplace mantel features intricate hand-carved details and a timeless design. Perfect for adding a touch of luxury to any living space.",
  width: 72,
  depth: 18,
  height: 54,
  price: 8500,
  suggestedPrice: 12000,
  onSale: true,
  color: "white",
  searchImages: [
    {
      image: {
        id: 1,
        alt: "Elegant Marble Fireplace Mantel",
        url: "/image1.webp",
        width: 800,
        height: 600,
      } as Media,
    },
  ],
  images: [
    {
      image: {
        id: 2,
        alt: "Front view of Elegant Marble Fireplace Mantel",
        url: "/image2.webp",
        width: 1200,
        height: 900,
      } as Media,
    },
    {
      image: {
        id: 3,
        alt: "Side view of Elegant Marble Fireplace Mantel",
        url: "/image3.webp",
        width: 1200,
        height: 900,
      } as Media,
    },
    {
      image: {
        id: 4,
        alt: "Close-up of carved details",
        url: "/image4.webp",
        width: 1200,
        height: 900,
      } as Media,
    },
    {
      image: {
        id: 5,
        alt: "Fireplace mantel in room setting",
        url: "/image5.webp",
        width: 1200,
        height: 900,
      } as Media,
    },
    {
      image: {
        id: 6,
        alt: "Fireplace mantel dimensions",
        url: "/image6.webp",
        width: 1200,
        height: 900,
      } as Media,
    },
  ],
};

export default function Home() {
  return <ProductPage product={product} related={[]} />;
}

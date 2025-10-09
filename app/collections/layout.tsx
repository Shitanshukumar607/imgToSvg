import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Collections - ImgToSVG",
  description:
    "View and manage your converted SVG works. Download, search, and organize your image to SVG conversions.",
  keywords: [
    "SVG",
    "collections",
    "image converter",
    "download",
    "vector graphics",
  ],
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

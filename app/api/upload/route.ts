import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// @ts-expect-error: imagetracerjs has no TypeScript types
import ImageTracer from "imagetracerjs";
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function cloudinaryToSVG(imageUrl: string, options = { scale: 5 }) {
  const response = await fetch(imageUrl);
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());

  const image = sharp(buffer).ensureAlpha(); // ensures RGBA format
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error("Unable to read image metadata.");
  }

  const raw = await image.raw().toBuffer();

  const myImageData = {
    width,
    height,
    data: raw,
  };

  const svgstring = ImageTracer.imagedataToSVG(myImageData, options);
  return svgstring;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => {
            if (err || !result) return reject(err);
            resolve(result);
          },
        );
        uploadStream.end(buffer);
      },
    );

    const svgString = await cloudinaryToSVG(cloudinaryResponse.secure_url);

    return NextResponse.json(
      {
        url: cloudinaryResponse.secure_url,
        svg: svgString,
        success: true,
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.error("Upload error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

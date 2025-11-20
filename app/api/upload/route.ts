import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const potrace = require("potrace");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function cloudinaryToSVG(imageUrl: string) {
  const svgString: string = await new Promise((resolve, reject) => {
    potrace.posterize(imageUrl, (err: unknown, svg: string) => {
      if (err) return reject(err);
      resolve(svg);
    });
  });

  return svgString;
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
          }
        );
        uploadStream.end(buffer);
      }
    );

    const svgString = await cloudinaryToSVG(cloudinaryResponse.secure_url);

    return NextResponse.json(
      {
        url: cloudinaryResponse.secure_url,
        svg: svgString,
        success: true,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Upload error:", err);
    const errorMessage = (err as Error)?.message || "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

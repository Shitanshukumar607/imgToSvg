import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// @ts-expect-error
import ImageTracer from "imagetracerjs";
import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { PNG } from "pngjs";

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

  const png = PNG.sync.read(buffer);

  const myImageData = {
    width: png.width,
    height: png.height,
    data: png.data,
  };

  const svgstring = ImageTracer.imagedataToSVG(myImageData, options);
  return svgstring;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Read file as buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudinaryResponse: UploadApiResponse = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err || !result) return reject(err);
        resolve(result);
      });
      uploadStream.end(buffer);
    }
  );

  const svgString = await cloudinaryToSVG(cloudinaryResponse.secure_url);

  return NextResponse.json(
    { url: cloudinaryResponse.secure_url, svg: svgString },
    { status: 201 }
  );
}

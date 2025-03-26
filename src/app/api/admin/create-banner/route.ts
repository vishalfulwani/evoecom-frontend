import dbConnect from "@/dbconfig/dbConnect";
import uploadOnCloudinary from "@/lib/cloudinary";
import bannerModels from "@/models/banner.models";
import { NextResponse } from "next/server";

// POST: Create a new banner
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const heading = formData.get("heading");
    const subheading = formData.get("subheading");
    const subtext = formData.get("subtext");
    const btnText = formData.get("btnText");
    const btnLink = formData.get("btnLink");
    const bgImg = formData.get("bgImg") as File;

    // Check if all fields are provided
    if (!heading || !subheading || !subtext || !btnText || !btnLink || !bgImg) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the bgImg is a Blob (in case of multipart form data)
    if (bgImg instanceof Blob) {
      const buffer = Buffer.from(await bgImg.arrayBuffer());
      const randomNum = Math.floor(Math.random() * 1000000); // Random number between 0 and 1,000,000
      const fileName = `uploaded-file-${Date.now()}-${randomNum}`;

      // Upload the image to Cloudinary (or any other service)
      const uploadPromises = await uploadOnCloudinary(buffer, fileName);

      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result: any) => result?.secure_url);


      // Connect to the database
      await dbConnect();

      // Create a new banner document
      const newBanner = new bannerModels({
        heading: heading.toString(),
        subheading: subheading.toString(),
        subtext: subtext.toString(),
        btnText: btnText.toString(),
        btnLink: btnLink.toString(),
        bgImg: imageUrls[0], // Save the image URL from Cloudinary
      });

      // Save the banner to the database
      await newBanner.save();

      // Return success message
      return NextResponse.json({ message: "Banner created successfully!" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Background image must be a valid file" }, { status: 400 });
    }
  } catch (error) {
    console.log(error); // Log the error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

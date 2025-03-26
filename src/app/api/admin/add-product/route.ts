
import ProductModel, { IProduct } from "@/models/product.models";
import dbConnect from "@/dbconfig/dbConnect";
import uploadOnCloudinary from "@/lib/cloudinary";
import { ApiResponse } from "@/helpers/ApiResponse";

export async function POST(req: Request) {
  // Ensure you have a database connection before performing operations
  await dbConnect();

  try {
    console.log("starttttttttt");
  
    const formData = await req.formData();
    const productName = formData.get('productName') as string
    const fullProductName = formData.get('fullProductName') as string
    const productDesc = formData.get('productDesc') as string
    const category = formData.get('category') as string
    const images = formData.getAll('images') as File[];
    const price = formData.get('price') as string
    const sellingPrice = formData.get('sellingPrice') as string
    const sizes = formData.get('sizes') as string
    const availableColors = formData.get('availableColors') as string
    const moreProductInfo = formData.get('moreProductInfo') as string

    console.log("Missing fields, price:", price,productName,"===",productDesc,"pp",sellingPrice,category);
    // Validate required fields
    if (
      !productName ||
      !productDesc ||
      !price ||
      !sellingPrice ||
      !category
    ) {
      console.log("Missing fields, price:", price);
      return Response.json(
        new ApiResponse(false, 400, {}, "All fields are required")
      );
    }

    // console.log("upload....");

    // // Handle image uploads with cloudinary
    // const uploadPromises = images.map(async (file: any) => {
    //   const filePath = file.filepath; // Get the temporary file path
    //   const fileName = file.originalFilename || "uploaded-file"; // Optional: Use the original filename
    //   return await uploadOnCloudinary(filePath, fileName); // Upload to Cloudinary
    // });

    // console.log("doneee")
    
    // const uploadedImages = await Promise.all(uploadPromises); // Wait for all uploads to finish
    const uploadPromises = images.map(async (file: any) => {
      // Check if the file is a Blob (in case of multipart form data)
      if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());
      const randomNum = Math.floor(Math.random() * 1000000); // Random number between 0 and 1,000,000
      const fileName = `uploaded-file-${Date.now()}-${randomNum}`;

        return uploadOnCloudinary(buffer, fileName);
      }
      // throw new Error('Invalid file type');
    });

    console.log("000000000")
    const uploadResults = await Promise.all(uploadPromises);
    console.log("000000000")
    const imageUrls = uploadResults.map((result: any) => result?.secure_url);
    console.log("0000000003333")


    if (!imageUrls) {
        return Response.json(
            new ApiResponse(false, 200, {}, "Images failed to upload"),
            { status: 200 }
        )
    }
    

    // console.log("Starting image uploads...");
    // const uploadResults = await Promise.all(uploadPromises);
    // console.log("Image uploads completed.");

    // const imageUrls = uploadResults.map((result: any) => result.secure_url);

    console.log("urlllll",imageUrls)

    // Create a new product document
    const newProduct: IProduct = new ProductModel({
      productName,
      fullProductName, // Auto-calculated if not provided due to the schema default
      productDesc,
      price,
      images: imageUrls,
      sellingPrice,
      category,
      sizes: sizes || '',
      availableColors: availableColors || '',
      moreProductInfo: moreProductInfo || "",
    });

    // Save the product to the database
    
    await newProduct.save();

    // Respond with the success message and product data
    return Response.json(
      new ApiResponse(true, 200, {}, "Product Created Successfully")
    );

  } catch (error) {
    console.log("Error creating product:", error);
    return Response.json(
      new ApiResponse(false, 500, {}, "Error while adding product")
    );
  }
}

// // // pages/api/products.ts
// // import dbConnect from '@/dbconfig/dbConnect';
// // import ProductModel from '@/models/product.models';
// // import uploadOnCloudinary from '@/lib/cloudinary';
// // import { ApiResponse } from '@/helpers/ApiResponse';

// // export async function POST(req: Request) {

// //     const getRandomRating = () => {
// //         const ratings = [4.7, 4.8, 4.9, 5.0, 4.6, 4.5, 4.4];
// //         return ratings[Math.floor(Math.random() * ratings.length)];
// //     };

// //     await dbConnect();

// //     const formData = await req.formData();
// //     const productName = formData.get('productName') as string
// //     const productDesc = formData.get('productDesc') as string
// //     const category = formData.get('category') as string
// //     const subCategory = formData.get('subCategory') as string
// //     const images = formData.getAll('images') as File[];
// //     const price = formData.get('price') as string
// //     const sellingPrice = formData.get('sellingPrice') as string

// //     console.log(productDesc, productName, price)
// //     console.log("*******************************",images)
// //     if (!(productName || productDesc || price)) {
// //         return Response.json(
// //             new ApiResponse(false, 400, {}, "all fields are required"),
// //             { status: 400 }
// //         )
// //     }

// //     try {

// //         // Upload images to Cloudinary
// //         console.log("[]{}[]")
// //         const uploadPromises = images.map(async (file) => {
// //             const arrayBuffer = await file.arrayBuffer()
// //             const buffer = Buffer.from(arrayBuffer)
// //             return uploadOnCloudinary(buffer, file.name);
// //         });

// //         console.log("000000000")
// //         const uploadResults = await Promise.all(uploadPromises);
// //         console.log("000000000")
// //         const imageUrls = uploadResults.map((result: any) => result.secure_url);
// //         console.log("0000000003333")

// //         if (!imageUrls) {
// //             return Response.json(
// //                 new ApiResponse(false, 200, {}, "Images failed to upload"),
// //                 { status: 200 }
// //             )
// //         }
// //         console.log("+++",imageUrls)
// //         const newProduct = new ProductModel({
// //             productName,
// //             productDesc,
// //             category,
// //             subCategory,
// //             images: imageUrls.map((result) => result),
// //             price,
// //             sellingPrice,
// //             rating:getRandomRating()
// //         });

// //         await newProduct.save();
// //         console.log("...",newProduct.images)

// //         return Response.json(
// //             new ApiResponse(true, 200, {}, "Product added successfully "),
// //             { status: 200 }
// //         )
// //     } catch (error) {
// //         return Response.json(
// //             new ApiResponse(false, 500, {}, "Error while adding product"),
// //             { status: 500 }
// //         );
// //     }
// // };

// import { NextApiRequest, NextApiResponse } from "next";
// import ProductModel, { IProduct } from "@/models/product.models";
// import dbConnect from "@/dbconfig/dbConnect";
// import uploadOnCloudinary from "@/lib/cloudinary";
// import { ApiResponse } from "@/helpers/ApiResponse";
// import { NextRequest } from "next/server";

// export async function POST(req: Request, res: NextApiResponse) {
//   dbConnect();

//   try {
//     console.log("starttttttttt")
//     const {
//       productName,
//       fullProductName,
//       productDesc,
//       price,
//       images,
//       sellingPrice,
//       category,
//       sizes,
//       availableColors,
//       moreProductInfo,
//     } = await req.json();

//     // Validate required fields
//     if (
//       !productName ||
//       !productDesc ||
//       !price ||
//       !images ||
//       !sellingPrice ||
//       !category 
//       // !rating
//     ) {
//       //   return res.status(400).json({ message: 'Missing required fields.' });
//       console.log("pppppp",price)
//       return Response.json(
//         new ApiResponse(false, 400, {}, "all fields are required"),
//         { status: 400 }
//       );
//     }

//     console.log("upload....")

//     const uploadPromises = images.map(async (file: any) => {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       return uploadOnCloudinary(buffer, file.name);
//     });

//     console.log("000000000");
//     const uploadResults = await Promise.all(uploadPromises);
//     console.log("000000000");
//     const imageUrls = uploadResults.map((result: any) => result.secure_url);
//     console.log("0000000003333");

//     // Create a new product document
//     const newProduct: IProduct = new ProductModel({
//       productName,
//       fullProductName, // Auto-calculated if not provided due to the schema default
//       productDesc,
//       price,
//       images: imageUrls.map((result) => result),
//       sellingPrice,
//       category,
//       sizes: sizes || '',
//       availableColors: availableColors || '',
//       moreProductInfo: moreProductInfo || "",
//     });

//     // Save the product to the database
//     const savedProduct = await newProduct.save();

//     res.status(201).json({
//       message: "Product created successfully!",
//       product: savedProduct,
//     });
//     return Response.json(
//       new ApiResponse(true, 200, {}, "Product added successfully "),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error creating product:", error);
//     // res.status(500).json({ message: 'Internal Server Error', error });
//     return Response.json(
//       new ApiResponse(false, 500, {}, "Error while adding product"),
//       { status: 500 }
//     );
//   }
// }




import { NextApiRequest, NextApiResponse } from "next";
import ProductModel, { IProduct } from "@/models/product.models";
import dbConnect from "@/dbconfig/dbConnect";
import uploadOnCloudinary from "@/lib/cloudinary";
import { ApiResponse } from "@/helpers/ApiResponse";

export async function POST(req: Request, res: NextApiResponse) {
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

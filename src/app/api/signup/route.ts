
// import { ApiResponse } from "@/helpers/ApiResponse";
import UserModel from "@/models/user.models";
import dbConnect from "@/dbconfig/dbConnect";
import bcrypt from "bcrypt";
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/helpers/ApiResponse";
import VerificationCodeEmail from "@/templates/verification-email-code";
import { sendEmail } from "@/lib/emailService";

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    agree:string;
}

const sendVerificationEmail = async (templateData : any,to:string) => {
    const emailResponse = await sendEmail({
        to: to,
        subject: "Your Verification Code",
        template: VerificationCodeEmail as any,
        templateData: templateData,
      });
      return emailResponse; 
};


export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { firstName,lastName ,  email, password ,country,agree}: RequestBody = await body as RequestBody;

        if ([firstName,lastName, email, password].some(field => field.trim() === '')) {
            return Response.json(
                new ApiResponse(false, 400, {}, "All fields are required"),
                { status: 400 }
            );
        }

        const userName = `${firstName} ${lastName}`;
       
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    new ApiResponse(false, 401, {}, "User already exists with this email"),
                    { status: 401 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                role: "user",
                address: {
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                },
                country,
            });

            await newUser.save();
        }

        const verifyCodetemplateData = {
            name: userName,
            verificationCode: verifyCode,
          };
        const to = email
        const emailResponse = await sendVerificationEmail(verifyCodetemplateData,to);

        if (!emailResponse.success) {
            return Response.json(
                new ApiResponse(false, 401, {}, emailResponse.message),
                { status: 401 }
            );
        }

        return Response.json(
            new ApiResponse(true, 200, {firstName:firstName,email:email}, "User registered successfully. Please verify through your email"),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while registering user:", error);
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while registering user"),
            { status: 500 }
        );
    }
}

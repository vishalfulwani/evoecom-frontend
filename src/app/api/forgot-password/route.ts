import jwt from "jsonwebtoken"; // Ensure this is correct
import UserModel from "@/models/user.models";
import ResetPasswordEmail from "@/templates/reset-password-to-user";
import { ApiResponse } from "@/helpers/ApiResponse";
import { NextRequest } from "next/server";
import { sendEmail } from "@/lib/emailService";

const sendResetPasswordEmail = async (templateData: any,to:string) => {
  const emailResponse = await sendEmail({
    to: to,
    subject: "Reset Your Password",
    template: ResetPasswordEmail as any,
    templateData: templateData,
  });
  return emailResponse;
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  console.log("--",email)

  try {
    // Step 1: Check if the user exists in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
        return Response.json(
            new ApiResponse(false, 404, {}, "User not found"),
            { status: 404 }
        );
    }

    // Step 2: Generate a reset token (JWT)
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET as string, // Your JWT secret
      { expiresIn: "1h" } // Token expiry time (1 hour)
    );

    console.log("tokennnn",resetToken)

    // Step 3: Send the reset password email
    const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;

    const templateData = {
      resetLink: resetLink,
      userName: user.userName,
    };
    await sendResetPasswordEmail(templateData,email);

    return Response.json(
      new ApiResponse(true, 200, {}, "Password reset link sent to your email"),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in forgot password:", error);
    return Response.json(
        new ApiResponse(false, 500, {}, "Internal Server Error"),
        { status: 500 }
    );
  }
}

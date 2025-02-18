import { ApiResponse } from "@/helpers/ApiResponse";
import UserModel from "@/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request, res: Response) {
  const { token,email, newPassword, confirmPassword } = await req.json();

  try {
    // Step 1: Verify the reset token
    const decoded: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);

    // Step 2: Find the user by the decoded userId
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return Response.json(new ApiResponse(false, 404, {}, "User not found"), {
        status: 404,
      });
    }

    if (newPassword != confirmPassword) {
      return Response.json(
        new ApiResponse(false, 400, {}, "Confirm Password "),
        { status: 400 }
      );
    }

    // Step 3: Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return Response.json(
      new ApiResponse(true, 200, {}, "Password has been successfully reset"),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in reset password:", error);
    return Response.json(
      new ApiResponse(false, 500, {}, "Invalid or expired token"),
      { status: 500 }
    );
  }
}

import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import { sendEmail } from "@/lib/emailService";
import UserModel, { IUser } from "@/models/user.models";
import RegistrationEmailToAdmin from "@/templates/registration-email-to-admin";
import RegistrationEmailToUser from "@/templates/registration-email-to-user";
import { ADMIN_EMAIL } from "../../../../constants";

interface RequestBody {
  code: string;
  userName: string;
}

const sendRegistrationEmailToAdmin = async (templateData: any) => {
  const emailResponse = await sendEmail({
    to: ADMIN_EMAIL,
    subject: "New User Registered",
    template: RegistrationEmailToAdmin as any,
    templateData: templateData,
  });
  return emailResponse;
};
const sendRegistrationEmailToUser = async (templateData: any,to:string) => {
  const emailResponse = await sendEmail({
    to: to,
    subject: "Your Registration Completed",
    template: RegistrationEmailToUser as any,
    templateData: templateData,
  });
  return emailResponse;
};

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { code, userName }: RequestBody = await req.json();
    console.log(code, "***", userName);
    const decodedEmail = decodeURIComponent(userName);
    const user = await UserModel.findOne({ email : decodedEmail });

    console.log("------",user)

    if (!user) {
      return Response.json(new ApiResponse(false, 400, {}, "User not found"), {
        status: 400,
      });
    }

    const isCodeValid = parseInt(user.verifyCode) === parseInt(code);
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      const registeredUser = {
        name: userName,
        email: user.email,
        registrationDate: new Date().toISOString(),
      };
      await sendRegistrationEmailToAdmin(registeredUser);
      await sendRegistrationEmailToUser(registeredUser,user.email);

      user.isVerified = true;
      await user.save();
      return Response.json(new ApiResponse(true, 201, {}, "User is verified"), {
        status: 201,
      });
    } else if (!isCodeNotExpired) {
      return Response.json(
        new ApiResponse(
          false,
          400,
          {},
          "Verification Code has expired , please signup again to get new code"
        ),
        { status: 400 }
      );
    } else {
      return Response.json(
        new ApiResponse(false, 400, {}, "Incorrect verification code"),
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      new ApiResponse(false, 500, {}, "Error while code verification"),
      { status: 500 }
    );
  }
}


// pages/api/send-email.ts
import { ApiResponse } from '@/helpers/ApiResponse';
import { sendEmail } from '@/lib/emailService';
import ContactEmailToAdmin from '@/templates/contact-email-to-admin';
import { ADMIN_EMAIL } from '../../../../constants';
import { NextRequest } from 'next/server';

const sendContactEmailToAdmin = async (templateData: any) => {
  const emailResponse = await sendEmail({
    to: ADMIN_EMAIL,
    subject: "Message from user",
    template: ContactEmailToAdmin as any,
    templateData: templateData,
  });
  return emailResponse;
};

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const { name, email, phoneNumber, message } = await req.json();
      
      console.log(name, "==========", email, "--------**********");

      // Create a test account if you need to test email delivery using nodemailer (optional)
      // const testAccount = await nodemailer.createTestAccount();
      // console.log('Ethereal Credentials:', testAccount);
      
      const templateData = {
        name,
        email,
        phoneNumber,
        message,
      };

      const emailResponse = await sendContactEmailToAdmin(templateData);
      console.log(emailResponse)

      return Response.json(
        new ApiResponse(true, 200, {}, "Message sent successfully"),
        { status: 200 }
    )
    } catch (error) {
      console.error(error);

      return Response.json(
        new ApiResponse(false, 500, {}, "An error occurred while sending the message"),
        { status: 500 }
    )
      
    }
  } else {
    
    return Response.json(
        new ApiResponse(false, 405, {}, "Not allowed"),
        { status: 405 }
    )
  }
}

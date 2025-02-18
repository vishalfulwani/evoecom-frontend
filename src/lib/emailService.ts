

// import nodemailer from "nodemailer";
// import { render } from "@react-email/render";

// // Define reusable types for email
// export type EmailTemplateData = Record<string, any>;

// export interface EmailOptions {
//   to: string; // Recipient email
//   subject: string; // Email subject
//   from?: string; // Optional sender email, defaults to app's email
//   template: (data: EmailTemplateData) => any; // Template function
//   templateData: EmailTemplateData; // Data to populate template
// }

// // Configure the transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Change this to your email provider
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // App-specific password
//   },
// });

// let testAccount = await nodemailer.createTestAccount();
// console.log('Ethereal Credentials:', testAccount);
// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.ethereal.email', // Use your SMTP provider's host here
// //   port: 587, // Or the appropriate port (Mailtrap uses 587)
// //   auth: {
// //     user: process.env.SMTP_USER,  // Store sensitive credentials in .env
// //     pass: process.env.SMTP_PASS,  // Same here
// //     // user:testAccount.user,
// //     // pass:testAccount.pass,
// //   },
// // });




// export const sendEmail = async ({
//   to,
//   subject,
//   from,
//   template,
//   templateData,
// }: EmailOptions): Promise<{ success: boolean; message: string }> => {
//   try {
//     // Render the email template into HTML and await the result
//     const emailHtml = await render(template(templateData)); // Correctly handle the Promise

//     await transporter.sendMail({
//       // from: from || `Your App <${process.env.EMAIL_USER}>`, // Use provided 'from' or default to app's email
//       from: from || `Your App <vk1906@gmail.com>`, // Use provided 'from' or default to app's email
//       to,
//       subject,
//       html: emailHtml, // Pass the awaited HTML string
//     });

//     console.log(`Email sent to ${to}`);

//     // Return success response
//     return { success: true, message: "Email sent successfully" };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     // Return failure response with error message
//     return { success: false, message: "Failed to send email" };
//   }
// };























// import { resend } from "@/lib/resend"; // Assuming you have set up resend correctly

// // Define reusable types for email
// export type EmailTemplateData = Record<string, any>;

// export interface EmailOptions {
//   to: string; // Recipient email
//   subject: string; // Email subject
//   from?: string; // Optional sender email, defaults to app's email
//   template: (data: EmailTemplateData) => any; // Template function
//   templateData: EmailTemplateData; // Data to populate template
// }

// export const sendEmail = async ({
//   to,
//   subject,
//   from = 'onboarding@resend.dev', // Default sender email
//   template,
//   templateData,
// }: EmailOptions): Promise<{ success: boolean; message: string }> => {
//   try {
//     // Render the email content using the provided template function
//     const htmlContent = template(templateData);

//     // Send email using the resend API
//     await resend.emails.send({
//       from: "onboarding@resend.dev", 
//       to: to, 
//       subject: subject, 
//       html: "<h1>Test Email</h1><p>This is a test email.</p>", // Basic HTML content for testing
//     });

//     // Return success status
//     console.log("senddddddddddddd")
//     return { success: true, message: "Verification email sent successfully" };
//   } catch (emailError) {
//     console.log("Error sending verification email", emailError);
//     // Return failure status
//     return { success: false, message: "Failed to send verification email" };
//   }
// };







import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

// Define reusable types for email
export type EmailTemplateData = Record<string, any>;

export interface EmailOptions {
  to: string; // Recipient email
  subject: string; // Email subject
  from?: string; // Optional sender email, defaults to app's email
  template: (data: EmailTemplateData) => any; // Template function
  templateData: EmailTemplateData; // Data to populate template
}

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's SMTP service or adjust to your provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // App-specific password or your email password
  },
});

// Ensure EMAIL_USER and EMAIL_PASS are present in the environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email credentials are missing in the environment variables.');
}

// Send email function
export const sendEmail = async ({
  to,
  subject,
  from,
  template,
  templateData,
}: EmailOptions): Promise<{ success: boolean; message: string }> => {
  try {
    // Render the email template into HTML and await the result
    console.log(templateData,"temppppp")
    const emailHtml = await render(template(templateData)); // Correctly handle the Promise
    console.log(emailHtml,"emlllllllll")

    // Send the email using the transporter
    await transporter.sendMail({
      from: from || `Your App <${process.env.EMAIL_USER}>`, // Use provided 'from' or default to app's email
      to,
      subject,
      html: emailHtml, // Pass the awaited HTML string
    });

    console.log(`Email sent to ${to}`);

    // Return success response
    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Enhanced error logging with error details
    const errorMessage = error.response ? error.response : error.message || 'Unknown error';
    
    // Return failure response with error message
    return { success: false, message: `Failed to send email: ${errorMessage}` };
  }
};







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

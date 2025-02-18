import { z } from 'zod';

export const contactUsSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name should not exceed 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required')
    .max(255, 'Email should not exceed 255 characters'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(150, 'Subject should not exceed 150 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message should not exceed 1000 characters'),
});

export type ContactUsSchema = z.infer<typeof contactUsSchema>;

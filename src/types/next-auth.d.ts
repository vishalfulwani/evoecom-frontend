

import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        userName?: string;
        firstName?: string;
        lastName?: string;
        role?: string;
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
        phone?:string;
    }

    interface Session {
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
        user: {
            _id?: string;
            isVerified?: boolean;
            userName?: string;
            lastName?: string;
            firstName?: string;
            role?: string;
        } & DefaultSession['user'];
        phone?:string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        userName?: string;
        firstName?: string;
        lastName?: string;
        role?: string;
        platform?: string;
        address?: {
            street: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        } | null; // Allow address to be null
    }
}

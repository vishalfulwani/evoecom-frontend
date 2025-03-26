

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/dbconfig/dbConnect";
import UserModel from "@/models/user.models";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Unified Authentication Options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({ 
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        platform: { label: "Platform", type: "text" }, 
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          let user;

          if (credentials.platform === "ecommerce") {
            user = await UserModel.findOne({ email: credentials.email });

            console.log("iscorrecttttttt",user)
            if (!user) throw new Error("No user found with this email");
            if (!user.isVerified) throw new Error("Please verify your account before login");

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            console.log("iscorrecttttttt",isPasswordCorrect)
            if (!isPasswordCorrect) throw new Error("Incorrect Password");

            // Prepare the user object with platform and default address
            return {
              ...user.toObject(),
              platform: "ecommerce",
              address: user.address || {
                street: null,
                city: null,
                state: null,
                postalCode: null,
              },
            };
          } 
        } catch (error) {
          console.log(error)
          throw new Error("Email or Password is incorrect.........");
        }
      },
    }),
      // Google Sign-In Provider
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
  
      // Facebook Sign-In Provider
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.userName = user.userName ;
        token.firstName = user.firstName ;
        token.lastName = user.lastName ;
        token.role = user.role;
        token.email = user.email;
        token.platform = user.platform;
        token.address = (user as any).address || null;
        token.phone = user.phone
      }
      return token;
    },

    async session({ session, token }) {
        session.user._id = token._id;
        session.user.userName = token.userName;
        session.user.firstName = token.firstName;
        session.user.email = token.email;
        session.user.email = token.email;
        session.user.role = token.role;
        session.platform = token.platform;

      // Ensure the latest address is fetched from the database
      await dbConnect();
      const dbUser = await UserModel.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.firstName = dbUser.firstName || token.firstName || null;
        session.user.lastName = dbUser.lastName || token.lastName || null;
        session.user.userName = dbUser.userName || token.userName || null;


        session.address = dbUser.address || {
          street: null,
          city: null,
          state: null,
          postalCode: null,
        };
        session.phone = dbUser.phone
      } else {
        session.address = {
          street: null,
          city: null,
          state: null,
          postalCode: null,
        };
      }

      return session;
    },
  },

  pages: {
    signIn: "/signin", // Unified sign-in page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

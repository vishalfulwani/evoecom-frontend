import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/EcommerceFooter/page";
import Navbar from "@/components/EcommerceNavbar/page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Site Title",  // Customize the title for your app
  description: "Your Site Description",  // Add a description for your site
  icons: {
    icon: "/assets/images/favicon-32x32.png", // Link to favicon inside the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <AuthProvider>
       
        <div className="">
          <div className="bg-theme bg-theme1">

            <Navbar />
            <div className="bg-theme  bg-theme1">
              {children}
              <ToastContainer />
            </div>
            <Footer />
          </div>

        </div>
      </AuthProvider>
    </div>
  );
}






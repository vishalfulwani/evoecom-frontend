'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Your global styles
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/EcommerceFooter/page";
import "./globals.css"; // Import global CSS again to ensure it's included
import Script from "next/script"; // Import the next/script component
import Navbar from "@/components/EcommerceNavbar/page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { setCart } from "@/redux/cartSlice";
import { useEffect } from "react";
import CartInitializer from "@/components/CartInitializer/page";
import WishlistInitializer from "@/components/WishlistInitializer/page";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <AuthProvider>
        <head>
          {/* External Stylesheets */}
          <link href="/assets/plugins/OwlCarousel/css/owl.carousel.min.css" rel="stylesheet" />
          <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
          <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
          <link href="/assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />

          {/* Loader CSS */}
          <link href="/assets/css/pace.min.css" rel="stylesheet" />

          {/* Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

          {/* Bootstrap CSS */}
          <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />

          {/* Your custom app CSS */}
          <link href="/assets/css/app.css" rel="stylesheet" />
          <link href="/assets/css/icons.css" rel="stylesheet" />
        </head>
        <body className="">
          <Provider store={store}>
            <CartInitializer/>
            <WishlistInitializer/>

            <div className="">

              {/* <Navbar /> */}
              <div className="">
                {children}
                <ToastContainer />
              </div>
              {/* <Footer /> */}
            </div>
          </Provider>

          {/* External Scripts */}
          {/* Bootstrap Bundle */}
          <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />

          {/* jQuery */}
          <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
          <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />

          {/* Plugin Scripts */}
          <Script src="/assets/plugins/simplebar/js/simplebar.min.js" strategy="beforeInteractive" />
          <Script src="/assets/plugins/OwlCarousel/js/owl.carousel.min.js" strategy="beforeInteractive" />
          <Script src="/assets/plugins/OwlCarousel/js/owl.carousel2.thumbs.min.js" strategy="beforeInteractive" />
          <Script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js" strategy="beforeInteractive" />
          <Script src="/assets/plugins/metismenu/js/metisMenu.min.js" strategy="beforeInteractive" />

          {/* App-specific JS */}
          <Script src="/assets/js/app.js" strategy="afterInteractive" />
          <Script src="/assets/js/index.js" strategy="afterInteractive" />



        </body>
      </AuthProvider>
    </html>
  );
}













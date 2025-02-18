

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import AdminHeader from "@/components/AdminHeader/page";
//  // Import global CSS again to ensure it's included
//  import Layout from './layout';



// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Your Site Title",  // Customize the title for your app
//   description: "Your Site Description",  // Add a description for your site
//   icons: {
//     icon: "/assets/images/favicon-32x32.png", // Link to favicon inside the public folder
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // <Layout>

//     <div lang="en">

// <link href="/assets/css/pace.min.css" rel="stylesheet" />
//           <link href="/assets/css/portal.css" rel="stylesheet" />
//             <div className=" app">
//             <AdminHeader />
//               {children}

//               <ToastContainer />
//             </div>

            
//     </div>
//     // </Layout>
//   );
// }






// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // // import "./globals.css"; // Your global styles
// // import AuthProvider from "@/context/AuthProvider";
// // import Footer from "@/components/EcommerceFooter/page";
// // // import "./globals.css"; // Import global CSS again to ensure it's included
// // import Script from "next/script"; // Import the next/script component
// // import Navbar from "@/components/EcommerceNavbar/page";
// // import { ToastContainer } from "react-toastify";
// // import 'react-toastify/dist/ReactToastify.css'; 
// // import AdminHeader from "@/components/AdminHeader/page";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //   title: "Your Site Title",  // Customize the title for your app
// //   description: "Your Site Description",  // Add a description for your site
// //   icons: {
// //     icon: "/assets/images/favicon-32x32.png", // Link to favicon inside the public folder
// //   },
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <AuthProvider>
// //         <head>
// //           {/* External Stylesheets */}
// //           <link href="/assets/plugins/OwlCarousel/css/owl.carousel.min.css" rel="stylesheet" />
// //           <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
// //           <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
// //           <link href="/assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />

// //           {/* Loader CSS */}
// //           <link href="/assets/css/pace.min.css" rel="stylesheet" />

// //           {/* Google Fonts */}
// //           <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

// //           {/* Bootstrap CSS */}
// //           <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />

// //           {/* Your custom app CSS */}
// //           {/* <link href="/assets/css/app.css" rel="stylesheet" /> */}
// //           {/* <link href="/assets/css/icons.css" rel="stylesheet" /> */}
// //           <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
// //           <link href="/assets/css/pace.min.css" rel="stylesheet" />
// //           <link href="/assets/css/portal.css" rel="stylesheet" />
// //         </head>
// //         <body className="">

// //           <AdminHeader />

// //           {children }
// //           <ToastContainer />

// //           {/* External Scripts */}
// //           {/* Bootstrap Bundle */}
// //           <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
          
// //           {/* jQuery */}
// //           <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
          
// //           {/* Plugin Scripts */}
// //           <Script src="/assets/plugins/simplebar/js/simplebar.min.js" strategy="beforeInteractive" />
// //           <Script src="/assets/plugins/OwlCarousel/js/owl.carousel.min.js" strategy="beforeInteractive" />
// //           <Script src="/assets/plugins/OwlCarousel/js/owl.carousel2.thumbs.min.js" strategy="beforeInteractive" />
// //           <Script src="/assets/plugins/metismenu/js/metisMenu.min.js" strategy="beforeInteractive" />
// //           <Script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js" strategy="beforeInteractive" />

// //           {/* App-specific JS */}
// //           <Script src="/assets/js/app.js" strategy="afterInteractive" />
// //           <Script src="/assets/js/index.js" strategy="afterInteractive" />
// //         </body>
// //       </AuthProvider>
// //     </html>
// //   );
// // }



'use client'


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from "@/components/AdminHeader/page";
// Import global CSS again to ensure it's included
import Layout from './layout';
import Script from "next/script"; // Import the Script component from Next.js

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      {/* External Stylesheets */}
      <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/assets/css/pace.min.css" rel="stylesheet" />
      <link href="/assets/css/portal.css" rel="stylesheet" />
      <link href="/assets/plugins/OwlCrousel/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
        <link href="/assets/plugins/metisMenu/css/metisMenu.min.css" rel="stylesheet" />
        <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />


      <div className="app">
        <AdminHeader />
        {children}

        {/* Toast Notifications */}
        <ToastContainer />

        {/* External Scripts */}
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="/assets/plugins/simplebar/js/simplebar.min.js" strategy="beforeInteractive" />
        <Script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js" strategy="beforeInteractive" />
        <Script src="/assets/plugins/OwlCarousel/js/owl.carousel.min.js" strategy="beforeInteractive" />
        <Script src="/assets/plugins/metismenu/js/metisMenu.min.js" strategy="beforeInteractive" />

        {/* Your app-specific JS */}
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
        <Script src="/assets/js/index.js" strategy="afterInteractive" />
      </div>
    </div>
  );
}

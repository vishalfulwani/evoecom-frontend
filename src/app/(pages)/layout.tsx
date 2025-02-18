'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/EcommerceFooter/page";
import Navbar from "@/components/EcommerceNavbar/page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <div >
      {/* <AuthProvider> */}
       
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
      {/* </AuthProvider> */}
    </div>
  );
}












// // // import type { Metadata } from "next";
// // // import { Inter } from "next/font/google";
// // // import AuthProvider from "@/context/AuthProvider";
// // // import Footer from "@/components/EcommerceFooter/page";
// // // // import "./globals.css"; // Import global CSS again to ensure it's included
// // // import Script from "next/script"; // Import the next/script component
// // // import Navbar from "@/components/EcommerceNavbar/page";
// // // import { ToastContainer } from "react-toastify";
// // // import 'react-toastify/dist/ReactToastify.css';


// // // const inter = Inter({ subsets: ["latin"] });

// // // export const metadata: Metadata = {
// // //   title: "Your Site Title",  // Customize the title for your app
// // //   description: "Your Site Description",  // Add a description for your site
// // //   icons: {
// // //     icon: "/assets/images/favicon-32x32.png", // Link to favicon inside the public folder
// // //   },
// // // };

// // // export default function RootLayout({
// // //   children,
// // // }: Readonly<{
// // //   children: React.ReactNode;
// // // }>) {
// // //   return (
// // //     <html lang="en">
// // //       <AuthProvider>
// // //         <head>
// // //           {/* External Stylesheets */}
// // //           <link href="/assets/plugins/OwlCarousel/css/owl.carousel.min.css" rel="stylesheet" />
// // //           <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
// // //           <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
// // //           <link href="/assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />

// // //           {/* Loader CSS */}
// // //           <link href="/assets/css/pace.min.css" rel="stylesheet" />

// // //           {/* Google Fonts */}
// // //           <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

// // //           {/* Bootstrap CSS */}
// // //           <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />

// // //           {/* Your custom app CSS */}
// // //           {/* <link href="/assets/css/bootstrap.min.css" rel="stylesheet" /> */}
// // //           <link href="/assets/css/app.css" rel="stylesheet" />
// // //           {/* <link href="/assets/css/pace.min.css" rel="stylesheet" /> */}
// // //           <link href="/assets/css/icons.css" rel="stylesheet" />
// // //           {/* <link href="/assets/css/portal.css" rel="stylesheet" /> */}
// // //         </head>
// // //         <body className="">
// // //           <div className="bg-theme bg-theme1">

// // //             <Navbar />
// // //             <div className="bg-theme  bg-theme1">
// // //               {children}
// // //               <ToastContainer />
// // //             </div>
// // //             <Footer />
// // //           </div>

// // //           {/* External Scripts */}
// // //           {/* Bootstrap Bundle */}
// // //           <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />

// // //           {/* jQuery */}
// // //           <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />

// // //           {/* Plugin Scripts */}
// // //           <Script src="/assets/plugins/simplebar/js/simplebar.min.js" strategy="beforeInteractive" />
// // //           <Script src="/assets/plugins/OwlCarousel/js/owl.carousel.min.js" strategy="beforeInteractive" />
// // //           <Script src="/assets/plugins/OwlCarousel/js/owl.carousel2.thumbs.min.js" strategy="beforeInteractive" />
// // //           <Script src="/assets/plugins/metismenu/js/metisMenu.min.js" strategy="beforeInteractive" />
// // //           <Script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js" strategy="beforeInteractive" />

// // //           {/* App-specific JS */}
// // //           <Script src="/assets/js/app.js" strategy="afterInteractive" />
// // //           <Script src="/assets/js/index.js" strategy="afterInteractive" />

// // //           {/* <!-- Javascript -->           */}
// // //           <script src="assets/plugins/popper.min.js"></script>
// // //           <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>

// // //           {/* <!-- Charts JS --> */}
// // //           <script src="assets/plugins/chart.js/chart.min.js"></script>
// // //           <script src="assets/js/index-charts.js"></script>

// // //           {/* <!-- Page Specific JS --> */}
// // //           <script src="assets/js/app.js"></script>

// // //         </body>
// // //       </AuthProvider>
// // //     </html>
// // //   );
// // // }




// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import AuthProvider from "@/context/AuthProvider";
// import Footer from "@/components/EcommerceFooter/page";
// import Navbar from "@/components/EcommerceNavbar/page";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Import CSS and JS files
// import "assets/css/bootstrap.min.css";
// import "assets/plugins/simplebar/css/simplebar.css";
// import "assets/plugins/metismenu/css/metisMenu.min.css";
// import "assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
// import "assets/css/app.css";
// import "assets/css/icons.css";
// import "assets/css/dark-theme.css";
// import "assets/css/semi-dark.css";
// import "assets/css/header-colors.css";

// import Script from "next/script";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Your Site Title", // Customize the title for your app
//   description: "Your Site Description", // Add a description for your site
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
//     <div className={inter.className} lang="en">
//       <AuthProvider>
//         <div className="bg-theme bg-theme1 min-h-screen flex flex-col">
//           {/* Navbar */}
//           <Navbar />

//           {/* Content Wrapper */}
//           <main className="flex-grow bg-theme bg-theme1">
//             {children}
//             <ToastContainer />
//           </main>

//           {/* Footer */}
//           <Footer />
//         </div>

//         {/* Include JavaScript files */}
//         <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
//         <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
//         <Script src="/assets/plugins/simplebar/js/simplebar.min.js" strategy="beforeInteractive" />
//         <Script src="/assets/plugins/OwlCarousel/js/owl.carousel.min.js" strategy="beforeInteractive" />
//         <Script src="/assets/plugins/metismenu/js/metisMenu.min.js" strategy="beforeInteractive" />
//         <Script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js" strategy="beforeInteractive" />
//         <Script src="/assets/js/app.js" strategy="afterInteractive" />
//         <Script src="/assets/js/index.js" strategy="afterInteractive" />
//       </AuthProvider>
//     </div>
//   );
// }




// 'use client'

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import AuthProvider from "@/context/AuthProvider";
// import Footer from "@/components/EcommerceFooter/page";
// import Navbar from "@/components/EcommerceNavbar/page";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";
// import Script from "next/script";
// // import "./globals.css"; // Your global styles

// const inter = Inter({ subsets: ["latin"] });



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <AuthProvider>
//       <head>
//         {/* External Stylesheets */}
//         <link href="/assets/plugins/OwlCrousel/css/owl.carousel.min.css" rel="stylesheet" />
//         <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
//         <link href="/assets/plugins/metisMenu/css/metisMenu.min.css" rel="stylesheet" />
//         <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />

//         {/* Loader CSS */}
//         <link href="/assets/css/pace.min.css" rel="stylesheet" />

//         {/* Google Fonts */}
//         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

//         {/* Bootstrap CSS */}
//         <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />

//         {/* Your custom app CSS */}
//         <link href="/assets/css/app.css" rel="stylesheet" />
//         <link href="/assets/css/icons.css" rel="stylesheet" />
//       </head>

//       <div className={inter.className}>
//         <Provider store={store}>
//           {/* Navbar */}
//           <Navbar />

//           <div className="bg-theme bg-theme1 min-h-screen flex flex-col">
//             {/* Content Wrapper */}
//             <main className="flex-grow">
//               {children}
//               <ToastContainer />
//             </main>

//             {/* Footer */}
//             <Footer />
//           </div>
//         </Provider>
//       </div>

//       {/* External Scripts */}
//       {/* Bootstrap Bundle */}
//       <Script src="/assets/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />

//       {/* jQuery */}
//       <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
//       <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />

//       {/* Plugin Scripts */}
//       <Script src="/assets/js/simplebar.min.js" strategy="beforeInteractive" />
//       <Script src="/assets/js/owl.carousel.min.js" strategy="beforeInteractive" />
//       <Script src="/assets/js/owl.carousel2.thumbs.min.js" strategy="beforeInteractive" />
//       <Script src="/assets/js/perfect-scrollbar.js" strategy="beforeInteractive" />
//       <Script src="/assets/js/metisMenu.min.js" strategy="beforeInteractive" />

//       {/* App-specific JS */}
//       <Script src="/assets/js/app.js" strategy="afterInteractive" />
//       <Script src="/assets/js/index.js" strategy="afterInteractive" />
//     </AuthProvider>
//   );
// }

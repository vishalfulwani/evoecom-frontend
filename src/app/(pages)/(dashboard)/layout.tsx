
// 'use client'
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

// const inter = Inter({ subsets: ["latin"] });



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname(); // Get the current path

//   return (
//     <div className="page-wrapper">
//       <div className="page-content">
//         {/* Breadcrumb Section */}
//         <section className="py-3 border-bottom d-none d-md-flex">
//           <div className="container">
//             <div className="page-breadcrumb d-flex align-items-center">
//               <h3 className="breadcrumb-title pe-3">My Orders</h3>
//               <div className="ms-auto">
//                 <nav aria-label="breadcrumb">
//                   <ol className="breadcrumb mb-0 p-0">
//                     <li className="breadcrumb-item">
//                       <Link href="/" passHref>
//                           <i className="bx bx-home-alt"></i> Home
//                       </Link>
//                     </li>
//                     <li className="breadcrumb-item">
//                       <Link href="/account" passHref>
//                         Account
//                       </Link>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">
//                       My Orders
//                     </li>
//                   </ol>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Main Content Section */}
//         <section className="py-4">
//           <div className="container">
//             <h3 className="d-none">Account</h3>
//             <div className="card">
//               <div className="card-body">
//                 <div className="row">
//                   {/* Sidebar */}
//                   <div className="col-lg-4">
//                     <div className="card shadow-none mb-3 mb-lg-0">
//                       <div className="card-body">
//                         <div className="list-group list-group-flush">
//                           <Link href="/dashboard"

//                               className={`list-group-item d-flex justify-content-between align-items-center ${
//                                 pathname === "/dashboard" ? "active" : ""
//                               }`}
//                             >
//                               Dashboard <i className="bx bx-tachometer fs-5"></i>

//                           </Link>
//                           <Link href="/orders"

//                               className={`list-group-item d-flex justify-content-between align-items-center bg-transparent ${
//                                 pathname === "/orders" ? "active" : ""
//                               }`}
//                             >
//                               Orders <i className="bx bx-cart-alt fs-5"></i>

//                           </Link>
//                           <Link href="/downloads"

//                               className={`list-group-item d-flex justify-content-between align-items-center bg-transparent ${
//                                 pathname === "/downloads" ? "active" : ""
//                               }`}
//                             >
//                               Downloads <i className="bx bx-download fs-5"></i>

//                           </Link>
//                           <Link href="/address"

//                               className={`list-group-item d-flex justify-content-between align-items-center bg-transparent ${
//                                 pathname === "/address" ? "active" : ""
//                               }`}
//                             >
//                               Addresses <i className="bx bx-home-smile fs-5"></i>

//                           </Link>
//                           <Link href="/user-payment-methods"

//                               className={`list-group-item d-flex justify-content-between align-items-center bg-transparent ${
//                                 pathname === "/user-payment-methods" ? "active" : ""
//                               }`}
//                             >
//                               Payment Methods <i className="bx bx-credit-card fs-5"></i>

//                           </Link>
//                           <Link href="/user-details"

//                               className={`list-group-item d-flex justify-content-between align-items-center bg-transparent ${
//                                 pathname === "/user-details" ? "active" : ""
//                               }`}
//                             >
//                               Account Details <i className="bx bx-user-circle fs-5"></i>

//                           </Link>
//                           <Link href="/logout"
//                              className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
//                               Logout <i className="bx bx-log-out fs-5"></i>

//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Main Content */}
//                   <div className="col-lg-8">{children}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }



'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/* Breadcrumb Section */}
        <section className="py-3 border-bottom d-none d-md-flex">
          <div className="container">
            <div className="page-breadcrumb d-flex align-items-center">
              <h3 className="breadcrumb-title pe-3">My Orders</h3>
              <div className="ms-auto">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <Link href="/" passHref>
                        <i className="bx bx-home-alt"></i> Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/account" passHref>
                        Account
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Orders
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-4">
          <div className="container">
            <h3 className="d-none">Account</h3>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {/* Sidebar */}
                  <div className="col-lg-4">
                    <div className="card shadow-none mb-3 mb-lg-0">
                      <div className="card-body">
                        <div className="list-group list-group-flush">
                          {[
                            { href: "/dashboard", label: "Dashboard", icon: "bx bx-tachometer" },
                            { href: "/orders", label: "Orders", icon: "bx bx-cart-alt" },
                            { href: "/downloads", label: "Downloads", icon: "bx bx-download" },
                            { href: "/address", label: "Addresses", icon: "bx bx-home-smile" },
                            { href: "/user-payment-methods", label: "Payment Methods", icon: "bx bx-credit-card" },
                            { href: "/user-details", label: "Account Details", icon: "bx bx-user-circle" },
                            // { href: "/logout", label: "Logout", icon: "bx bx-log-out" },
                          ].map(({ href, label, icon }) => (
                            <Link
                              key={href}
                              href={href}
                              className="list-group-item d-flex justify-content-between align-items-center"
                              style={{
                                backgroundColor: pathname === href ? "rgba(255, 255, 255, 0.12)" : "transparent",
                              }}
                            >
                              {label} <i className={`${icon} fs-5`}></i>
                            </Link>
                          ))}
                          <div
                            className="cursor-pointer text-white list-group-item d-flex justify-content-between align-items-center"
                            style={{
                              backgroundColor: "transparent",
                            }}
                            data-bs-toggle="modal" data-bs-target="#signoutModal"
                          >
                            Logout <i className={`bx bx-log-out fs-5`}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="col-lg-8">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* modal */}
        <div className="modal fade" id="signoutModal" tabIndex={-1} aria-labelledby="wishlistModalLabel" aria-hidden="true" style={{ borderColor: "#5180ba" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header border-top" style={{ borderColor: "#5180ba" }}>
                <h5 className="modal-title text-center w-100" id="wishlistModalLabel">
                  Are you sure you want to Signout?
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn text-white fw-bold"
                  style={{ backgroundColor: "#5180ba", border: "none" }}
                  data-bs-dismiss="modal"
                  onClick={() => signOut()}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#416898")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5180ba")}
                >
                  Signout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

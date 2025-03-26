// // import React from "react";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       [elemName: string]: any;
//     }
//   }
// }




declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-element": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

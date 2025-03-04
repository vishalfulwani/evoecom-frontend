// "use client";

// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface ProductProps {
//   images: string[];
// }

// const ProductImageCarousel = ({ images }: ProductProps) => {
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);

//   const mainSettings = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     fade: true,
//     asNavFor: nav2!,
//   };

//   const thumbSettings = {
//     slidesToShow: images.length < 4 ? images.length : 4,
//     slidesToScroll: 1,
//     asNavFor: nav1!,
//     focusOnSelect: true,
//     centerMode: true,
//     centerPadding: "10px",
//   };

//   return (
//     <div className="image-zoom-section">
//       {/* Main Image Slider */}
//       <div className="product-gallery border p-3">

//       <Slider {...mainSettings} ref={(slider) => setNav1(slider)}>
//         {images.map((img, index) => (
//             <div key={index} className="p-2">
//             <img src={img} alt={`Product ${index}`} className="w-full h-auto" />
//           </div>
//         ))}
//       </Slider>
//         </div>

//       {/* Thumbnail Slider */}
//       <div className="mt-4 gap-2">
//         <Slider {...thumbSettings} ref={(slider) => setNav2(slider)}>
//           {images.map((img, index) => (
//             <div key={index} className="p-2 mx-2 item border">
//               <img
//                 src={img}
//                 alt={`Thumbnail ${index}`}
//                 className=" object-contain img-fluid cursor-pointer"
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default ProductImageCarousel;



"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductProps {
  images?: string[]; // Make images optional to prevent errors
}

const ProductImageCarousel = ({ images = [] }: ProductProps) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images available</p>;
  }

  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: nav2!,
  };

  const thumbSettings = {
    slidesToShow: Math.min(images.length, 4),
    slidesToScroll: 1,
    asNavFor: nav1!,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "10px",
  };

  return (
    <div className="image-zoom-section">
      {/* Main Image Slider */}
      <div className="product-gallery p-2 border">

      <Slider {...mainSettings} ref={(slider) => setNav1(slider)}>
        {images.map((img, index) => (
            <div key={index} className="p-2">
            <img src={img} alt={`Product ${index}`} className="w-full h-auto " />
          </div>
        ))}
      </Slider>
        </div>

      {/* Thumbnail Slider */}
      {/* <div className="mt-4 p-4">
        <Slider {...thumbSettings} ref={(slider) => setNav2(slider)}>
          {images.map((img, index) => (
            <div key={index} className="p-2 border " style={{margin:"0 8px"}}>
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className=" object-contain  cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      </div> */}
      <div className="mt-4 p-4">
  <Slider 
    {...thumbSettings} 
    ref={(slider) => setNav2(slider)}
    className="space-x-2" // Add spacing between slides
  >
    {images.map((img, index) => (
      <div 
        key={index} 
        className="p-2 border mx-2" // Add left-right margin to each slide
      >
        <img
          src={img}
          alt={`Thumbnail ${index}`}
          className="object-contain cursor-pointer w-full h-auto"
        />
      </div>
    ))}
  </Slider>
</div>

    </div>
  );
};

export default ProductImageCarousel;

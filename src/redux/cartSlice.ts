
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { RootState } from "./store";

// // // Define the structure of the cart item
// // export interface ICartItem {
// //   product: {
// //     _id: string;
// //     productName: string;
// //     productDesc: string;
// //     fullProductName: string;
// //     price: string;
// //     sellingPrice: string;
// //     images: string[];
// //     category: string;
// //     subCategory: string;
// //     rating: string;
// //     availableColors: string;
// //     sizes: string;
// //   };
// //   quantity: number;
// //   selectedSize?: string;
// //   selectedColor?: string;
// // }

// // interface CartState {
// //   cart: ICartItem[];
// // }

// // // Get the cart from localStorage if it exists, otherwise use an empty array
// // const loadCartFromLocalStorage = (): ICartItem[] => {
// //   if (typeof window !== "undefined") {
// //     const storedCart = localStorage.getItem("cart");
// //     return storedCart ? JSON.parse(storedCart) : [];
// //   }
// //   return []; // Return empty array on the server-side
// // };

// // const initialState: CartState = {
// //   cart: loadCartFromLocalStorage(),
// // };

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     addToCart: (state, action: PayloadAction<ICartItem>) => {
// //       const existingItem = state.cart.find(
// //         (item) => item.product._id === action.payload.product._id
// //       );
// //       if (existingItem) {
// //         existingItem.quantity += action.payload.quantity;
// //       } else {
// //         state.cart.push(action.payload);
// //       }
// //       // Persist the updated cart in localStorage (only on client-side)
// //       if (typeof window !== "undefined") {
// //         localStorage.setItem("cart", JSON.stringify(state.cart));
// //       }
// //     },
// //     removeFromCart: (state, action: PayloadAction<string>) => {
// //       state.cart = state.cart.filter(
// //         (item) => item.product._id !== action.payload
// //       );
// //       // Persist the updated cart in localStorage (only on client-side)
// //       if (typeof window !== "undefined") {
// //         localStorage.setItem("cart", JSON.stringify(state.cart));
// //       }
// //     },
// //     updateQuantity: (
// //       state,
// //       action: PayloadAction<{ productId: string; quantity: number }>
// //     ) => {
// //       const existingItem = state.cart.find(
// //         (item) => item.product._id === action.payload.productId
// //       );
// //       if (existingItem) {
// //         existingItem.quantity = action.payload.quantity;
// //       }
// //       // Persist the updated cart in localStorage (only on client-side)
// //       if (typeof window !== "undefined") {
// //         localStorage.setItem("cart", JSON.stringify(state.cart));
// //       }
// //     },
// //     clearCart: (state) => {
// //       state.cart = [];
// //       // Clear cart from localStorage (only on client-side)
// //       if (typeof window !== "undefined") {
// //         localStorage.removeItem("cart");
// //       }
// //     },
// //     updateSize: (
// //       state,
// //       action: PayloadAction<{ productId: string; selectedSize: string }>
// //     ) => {
// //       const item = state.cart.find(
// //         (item) => item.product._id === action.payload.productId
// //       );
// //       if (item) {
// //         item.selectedSize = action.payload.selectedSize;
// //       }
// //     },
// //     updateColor: (
// //       state,
// //       action: PayloadAction<{ productId: string; selectedColor: string }>
// //     ) => {
// //       const item = state.cart.find(
// //         (item) => item.product._id === action.payload.productId
// //       );
// //       if (item) {
// //         item.selectedColor = action.payload.selectedColor;
// //       }
// //     },
// //   },
// // });

// // // Selectors for cart
// // export const selectCartItems = (state: RootState) => state.cart.cart;
// // export const selectCartItemCount = (state: RootState) =>
// //   state.cart.cart.reduce((total, item) => total + item.quantity, 0);

// // export const selectCartTotalPrice = (state: RootState) =>
// //   state.cart.cart.reduce(
// //     (total, item) =>
// //       total + parseFloat(item.product.sellingPrice) * item.quantity,
// //     0
// //   );

// // export const { addToCart, removeFromCart, updateQuantity, clearCart ,updateColor,updateSize} =
// //   cartSlice.actions;
// // export default cartSlice.reducer;







// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";

// export interface ICartItem {
//   product: {
//     _id: string;
//     productName: string;
//     productDesc: string;
//     fullProductName: string;
//     price: string;
//     sellingPrice: string;
//     images: string[];
//     category: string;
//     subCategory: string;
//     rating: string;
//     availableColors: string;
//     sizes: string;
//   };
//   quantity: number;
//   selectedSize?: string;
//   selectedColor?: string;
// }

// interface CartState {
//   cart: ICartItem[];
// }

// const initialState: CartState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart: (state, action: PayloadAction<ICartItem[]>) => {
//       state.cart = action.payload;
//     },
//     addToCart: (state, action: PayloadAction<ICartItem>) => {
//       const existingItem = state.cart.find(
//         (item) => item.product._id === action.payload.product._id
//       );
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.cart.push(action.payload);
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.cart = state.cart.filter(
//         (item) => item.product._id !== action.payload
//       );
//     },
//     updateQuantity: (
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) => {
//       const existingItem = state.cart.find(
//         (item) => item.product._id === action.payload.productId
//       );
//       if (existingItem) {
//         existingItem.quantity = action.payload.quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     },
//     updateSize: (
//       state,
//       action: PayloadAction<{ productId: string; selectedSize: string }>
//     ) => {
//       const item = state.cart.find(
//         (item) => item.product._id === action.payload.productId
//       );
//       if (item) {
//         item.selectedSize = action.payload.selectedSize;
//       }
//     },
//     updateColor: (
//       state,
//       action: PayloadAction<{ productId: string; selectedColor: string }>
//     ) => {
//       const item = state.cart.find(
//         (item) => item.product._id === action.payload.productId
//       );
//       if (item) {
//         item.selectedColor = action.payload.selectedColor;
//       }
//     },
//   },
// });

// export const {
//   setCart,
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
//   updateSize,
//   updateColor,
// } = cartSlice.actions;

// export const selectCartItems = (state: RootState) => state.cart.cart;
// export const selectCartItemCount = (state: RootState) =>
//   state.cart.cart.reduce((total, item) => total + item.quantity, 0);
// export const selectCartTotalPrice = (state: RootState) =>
//   state.cart.cart.reduce(
//     (total, item) =>
//       total + parseFloat(item.product.sellingPrice) * item.quantity,
//     0
//   );

// export default cartSlice.reducer;




import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define the structure of the cart item
export interface ICartItem {
  product: {
    _id: string;
    productName: string;
    productDesc: string;
    fullProductName: string;
    price: string;
    sellingPrice: string;
    images: string[];
    category: string;
    subCategory: string;
    rating: string;
    availableColors: string;
    sizes: string;
  };
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  cart: ICartItem[];
}

// ✅ Start with an empty cart (to prevent SSR hydration issues)
const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.product._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save updated cart
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const existingItem = state.cart.find((item) => item.product._id === action.payload.productId);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to localStorage
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart"); // ✅ Remove from localStorage
    },
    updateSize: (state, action: PayloadAction<{ productId: string; selectedSize: string }>) => {
      const item = state.cart.find((item) => item.product._id === action.payload.productId);
      if (item) {
        item.selectedSize = action.payload.selectedSize;
      }
    },
    updateColor: (state, action: PayloadAction<{ productId: string; selectedColor: string }>) => {
      const item = state.cart.find((item) => item.product._id === action.payload.productId);
      if (item) {
        item.selectedColor = action.payload.selectedColor;
      }
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateColor,
  updateSize,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectCartItemCount = (state: RootState) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.cart.reduce((total, item) => total + parseFloat(item.product.sellingPrice) * item.quantity, 0);

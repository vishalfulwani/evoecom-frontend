
// // store/wishlistSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';

// interface WishlistState {
//   items: string[];
// }

// // ✅ Avoid initializing state from localStorage directly inside `initialState`
// const initialState: WishlistState = {
//   items: [],
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action: PayloadAction<string>) => {
//       if (!state.items.includes(action.payload)) {
//         state.items.push(action.payload);
//         localStorage.setItem('wishlist', JSON.stringify(state.items));
//       }
//     },
//     removeFromWishlist: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((id) => id !== action.payload);
//       localStorage.setItem('wishlist', JSON.stringify(state.items));
//     },
//     clearWishlist: (state) => {
//       state.items = [];
//       localStorage.removeItem('wishlist');
//     },
//     loadWishlist: (state) => {
//       // ✅ Load wishlist from localStorage AFTER hydration
//       if (typeof window !== 'undefined') {
//         state.items = JSON.parse(localStorage.getItem('wishlist') || '[]');
//       }
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist, clearWishlist, loadWishlist } = wishlistSlice.actions;

// // ✅ Selector for wishlist count
// export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;

// export default wishlistSlice.reducer;



// store/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items)); // ✅ Persist to localStorage
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items)); // ✅ Persist to localStorage
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist'); // ✅ Remove from localStorage
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

// ✅ Selector for wishlist count
export const selectWishlistItemCount = (state: RootState) => state.wishlist.items.length;

export default wishlistSlice.reducer;

'use client'

import { setWishlist } from "@/redux/wishlistSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function WishlistInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        dispatch(setWishlist(JSON.parse(storedWishlist)));
      }
    }
  }, [dispatch]);

  return null; // No UI needed
}

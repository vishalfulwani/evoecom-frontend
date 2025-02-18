import { setCart } from "@/redux/cartSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        dispatch(setCart(JSON.parse(storedCart)));
      }
    }
  }, [dispatch]);

  return null; // No UI needed
}

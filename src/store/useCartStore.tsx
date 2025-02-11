import { create } from "zustand";
import { api } from "../lib/axios";

interface ProductInCart {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface CartState {
  cart: ProductInCart[];
  isLoading: boolean;
  error: string | null;
  totalPrice: number;
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity: number,
    type: string | null
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  error: null,
  totalPrice: 0,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/cart");
      set({
        cart: res.data.items,
        totalPrice: res.data.items.reduce(
          (sum: number, item: ProductInCart) =>
            sum + item.productId.price * item.quantity,
          0
        ),
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (productId, quantity, type) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/cart/add", { productId, quantity, type });
      set({ cart: res.data.cart.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await api.delete("/cart/remove", { data: { productId } });
      console.log(res.data);
      set({ cart: res.data.cart.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true });
    try {
      const res = await api.delete("/cart/clear");
      set({ cart: res.data.cart.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCartStore;

import { create } from "zustand";
import { api } from "../lib/axios";

interface CartItem {
  productId: string;
  name: string;
  quantity: string;
  price: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/cart");
      set({ cart: res.data.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/cart/add", { productId, quantity });
      set({ cart: res.data.cart.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await api.delete("/cart/remove", { data: { productId } });
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

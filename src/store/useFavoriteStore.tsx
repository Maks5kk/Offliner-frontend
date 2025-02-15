import { create } from "zustand";
import { api } from "../lib/axios";

interface ProductInFavorite {
  productId: {
    _id: string;
    name: string;
    price: string;
    image: string;
  };
}

interface FavoriteState {
  favorite: ProductInFavorite[];
  isLoading: boolean;
  error: string | null;
  fetchFavoriteList: () => Promise<void>;
  addToFavorite: (productId: string) => Promise<void>;
}

const useFavoriteStore = create<FavoriteState>((set) => ({
  favorite: [],
  isLoading: false,
  error: null,

  fetchFavoriteList: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/favorite");
      set({
        favorite: res.data.items,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToFavorite: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/favorite/add", { productId });
      set({
        favorite: res.data.favorite.items,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useFavoriteStore;

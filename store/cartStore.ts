import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  url?: string;
  retailer: string;
  calculatedPrice?: string;
  quantity?: number;
  category?: string;
  badge?: string;
  description?: string;
  rating?: number;
  isNew?: boolean;
}

interface CartState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const existingIndex = state.products.findIndex(
            (p) => p.id === product.id && p.retailer === product.retailer,
          );

          if (existingIndex >= 0) {
            const updatedProducts = [...state.products];
            const currentQuantity =
              updatedProducts[existingIndex].quantity || 1;
            updatedProducts[existingIndex] = {
              ...updatedProducts[existingIndex],
              quantity: currentQuantity + 1,
            };
            return { products: updatedProducts };
          }

          return {
            products: [...state.products, { ...product, quantity: 1 }],
          };
        }),

      removeProduct: (index) =>
        set((state) => ({
          products: state.products.filter((_, i) => i !== index),
        })),

      updateQuantity: (index, quantity) =>
        set((state) => {
          const updatedProducts = [...state.products];
          updatedProducts[index] = {
            ...updatedProducts[index],
            quantity: Math.max(1, quantity),
          };
          return { products: updatedProducts };
        }),

      clearCart: () => set({ products: [] }),

      getTotalItems: () => {
        const state = get();
        return state.products.reduce(
          (total, product) => total + (product.quantity || 1),
          0,
        );
      },

      getTotalPrice: () => {
        const state = get();
        return state.products.reduce(
          (total, product) =>
            total + (product.price || 0) * (product.quantity || 1),
          0,
        );
      },
    }),
    {
      name: "gift-cart-storage",
    },
  ),
);

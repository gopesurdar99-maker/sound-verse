import { create } from "zustand";
import { Product } from "@/types";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type ShippingAddress = {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

type CartStore = {
  items: CartItem[];
  shippingAddress: ShippingAddress | null;
  selectedPaymentMethod: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setSelectedPaymentMethod: (method: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  shippingAddress: null,
  selectedPaymentMethod: "UPI",

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      ),
    })),

  clearCart: () =>
    set({
      items: [],
      shippingAddress: null,
      selectedPaymentMethod: "UPI",
    }),

  setShippingAddress: (address) => set({ shippingAddress: address }),

  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  colorwayIndex: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (productId: string, colorwayIndex: number) => void;
  removeItem: (productId: string, colorwayIndex: number) => void;
  setQuantity: (productId: string, colorwayIndex: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (productId, colorwayIndex) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.colorwayIndex === colorwayIndex,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + 1 } : i,
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { productId, colorwayIndex, quantity: 1 }],
            isOpen: true,
          };
        }),
      removeItem: (productId, colorwayIndex) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.colorwayIndex === colorwayIndex),
          ),
        })),
      setQuantity: (productId, colorwayIndex, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && i.colorwayIndex === colorwayIndex),
                )
              : state.items.map((i) =>
                  i.productId === productId && i.colorwayIndex === colorwayIndex
                    ? { ...i, quantity }
                    : i,
                ),
        })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: "urbanessentials-cart", partialize: (state) => ({ items: state.items }) },
  ),
);

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((sum, i) => sum + i.quantity, 0));
}

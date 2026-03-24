import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variantName?: string;
}

interface CartState {
  items: CartItem[];
  storeSlug: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantName?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantName?: string) => void;
  clearCart: () => void;
  setStoreSlug: (slug: string) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      storeSlug: null,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantName === item.variantName
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantName === item.variantName
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId, variantName) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantName === variantName)
          ),
        })),

      updateQuantity: (productId, quantity, variantName) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && i.variantName === variantName)
                )
              : state.items.map((i) =>
                  i.productId === productId && i.variantName === variantName
                    ? { ...i, quantity }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),
      setStoreSlug: (slug) => set({ storeSlug: slug }),

      getTotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: 'soukly-cart',
    }
  )
);

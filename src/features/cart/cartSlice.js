import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, price, main_image, name } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (!existingItem) {
        state.cartItems.push({ id, price, main_image, name, quantity: 1 });
        state.cartCount++;
        state.cartTotal += price;
      } else {
        state.cartTotal += price;
        existingItem.quantity++;
      }
      state.cartTotal = state.cartItems.reduce(
        (acc, items) => acc + items.price * items.quantity,
        0
      );
      toast.success("Product Added to Cart", { icon: "🛒" });
    },
    increaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      item.quantity++;
      state.cartTotal += item.price;
      state.cartTotal = state.cartItems.reduce(
        (acc, items) => acc + items.price * items.quantity,
        0
      );
      toast.success("Product Quantity Increased ", { icon: "↗️" });
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item.quantity > 1) {
        item.quantity--;
        state.cartTotal -= item.price;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.cartCount--;
        state.cartTotal -= item.price;
      }

      state.cartTotal = state.cartItems.reduce(
        (acc, items) => acc + items.price * items.quantity,
        0
      );
      toast.success("Product Quantity Decreased ", { icon: "↘️" });
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.cartCount--;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.cartTotal = state.cartItems.reduce(
        (acc, items) => acc + items.price * items.quantity,
        0
      );

      toast.success("Product Removed from Cart ", { icon: "🗑️" });
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartCount = 0;
      state.cartTotal = 0;
    },
  },
});

export const {
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectCartTotal = (state) => state.cart.cartTotal;

export default cartSlice.reducer;

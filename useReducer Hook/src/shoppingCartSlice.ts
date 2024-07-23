import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingCartItem {
  id: number;
  name: string;
  price: number;
}

interface ShoppingCartState {
  items: ShoppingCartItem[];
  total: number;
}

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ShoppingCartItem>) {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem(state, action: PayloadAction<number>) {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total -= item.price;
      }
    },
    calculateTotal(state) {
      state.total = state.items.reduce((total, item) => total + item.price, 0);
    },
  },
});

export const { addItem, removeItem, calculateTotal } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

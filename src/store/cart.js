import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  showCart: false,
  items: [],
  numberOfItemsInCart: 0,
  totalPrice: 0,
};

function handleAddItemToCart(state, action) {
  const itemIdx = state.items.findIndex(
    (item) => item.id === action.payload.id,
  );

  if (itemIdx === -1) {
    state.items.push({
      id: action.payload.id,
      title: action.payload.title,
      price: action.payload.price,
      description: action.payload.description,
      quantity: 1,
    });
    state.totalPrice += action.payload.price;
  } else {
    state.items[itemIdx].quantity += 1;
    state.totalPrice += state.items[itemIdx].price;
  }

  state.numberOfItemsInCart += 1;
  console.log(state.totalPrice);
}

function handleRemoveItemFromCart(state, action) {
  const itemIdx = state.items.findIndex(
    (item) => item.id === action.payload.id,
  );

  state.items[itemIdx].quantity -= 1;
  state.numberOfItemsInCart -= 1;
  state.totalPrice -= state.items[itemIdx].price;
  console.log(state.totalPrice);

  if (state.items[itemIdx].quantity <= 0) {
    state.items = state.items.filter((item) => item.id !== action.payload.id);
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItemToCart(state, action) {
      handleAddItemToCart(state, action);
    },
    removeItemFromCart(state, action) {
      handleRemoveItemFromCart(state, action);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

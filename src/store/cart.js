import { createSlice } from '@reduxjs/toolkit';

import { uiActions } from './ui';

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
}

function handleRemoveItemFromCart(state, action) {
  const itemIdx = state.items.findIndex(
    (item) => item.id === action.payload.id,
  );

  state.items[itemIdx].quantity -= 1;
  state.totalPrice -= state.items[itemIdx].price;

  if (state.items[itemIdx].quantity <= 0) {
    state.items = state.items.filter((item) => item.id !== action.payload.id);
  }

  state.numberOfItemsInCart -= 1;
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

export function sendCartData(cart) {
  const cartBackend = process.env.REACT_APP_CART_BACKEND;

  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(cartBackend, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed!',
        }),
      );
    }
  };
}

export const cartActions = cartSlice.actions;

export default cartSlice;

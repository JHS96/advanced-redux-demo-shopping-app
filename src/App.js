import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const cart = useSelector((state) => state.cart);
  const cartBackend = process.env.REACT_APP_CART_BACKEND;

  useEffect(() => {
    fetch(cartBackend, {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart, cartBackend]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

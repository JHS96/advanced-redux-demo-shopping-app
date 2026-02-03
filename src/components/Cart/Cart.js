import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <h3>Total: ${cartTotalPrice.toFixed(2)}</h3>
      {cartItems.length < 1 && <p>Your cart is empty...</p>}
      {cartItems.length >= 1 && (
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.price * item.quantity,
                price: item.price,
                description: item.description,
              }}
            />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default Cart;

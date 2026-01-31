import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length < 1 && <p>Your cart is empty...</p>}
      {cartItems.length >= 1 && (
        <ul>
          {cartItems.map((item) => (
            <CartItem
              id={item.id}
              key={item.id}
              item={{
                title: item.title,
                quantity: item.quantity,
                total: item.price * item.quantity,
                price: Number(item.price),
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

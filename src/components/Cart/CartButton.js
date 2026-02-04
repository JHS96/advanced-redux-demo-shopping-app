import { useSelector, useDispatch } from 'react-redux';

import classes from './CartButton.module.css';
// import { cartActions } from '../../store/cart';
import { uiActions } from '../../store/ui';

const CartButton = () => {
  const dispatch = useDispatch();
  const numberOfItemsInCart = useSelector(
    (state) => state.cart.numberOfItemsInCart,
  );

  function handleToggleCart() {
    // dispatch(cartActions.toggleCart());
    dispatch(uiActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfItemsInCart}</span>
    </button>
  );
};

export default CartButton;

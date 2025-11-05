import {useContext} from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import {currencyFormat} from '../utils/formatting';
import Button from './UI/Button';

export default function Cart(){
    const cartCtx = useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((acc,curr)=>{
        return acc + (curr.price * curr.quantity)
    },0);

    function hideCartHandler(){
        userProgressCtx.hideCart();
    }

return <Modal open={userProgressCtx.progress ==='cart'}>
    <h2>Your Cart</h2>
    <ul>
        {cartCtx.items.map(item=><li key={item.id}>{item.name}</li>)}
    </ul>
    <p className="cart-total">{currencyFormat.format(cartTotal)}</p>
    <p className="modal-actions">
        <Button textOnly onClick={hideCartHandler}>Close</Button>
        <Button>Go To Checkout</Button>
    </p>
    </Modal>
}
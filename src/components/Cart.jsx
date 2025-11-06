import {useContext} from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import {currencyFormat} from '../utils/formatting';
import Button from './UI/Button';
import CartItem from './CartItem';

export default function Cart(){
    const cartCtx = useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((acc,curr)=>{
        return acc + (curr.price * curr.quantity)
    },0);

    function hideCartHandler(){
        userProgressCtx.hideCart();
    }

    function handleCheckout(){
        userProgressCtx.showCheckout()
    }

return <Modal open={userProgressCtx.progress ==='cart'} onClose={userProgressCtx.progress ==='cart' ? hideCartHandler :  null}>
    <h2>Your Cart</h2>
    <ul>
        {cartCtx.items.map(item=><CartItem key={item?.id} name={item?.name} quantity={item?.quantity} price={item?.price} onInc={()=>cartCtx.addItem(item)} onDec={()=>cartCtx.removeItem(item.id)}/>)}
    </ul>
    <p className="cart-total">{currencyFormat.format(cartTotal)}</p>
    <p className="modal-actions">
        <Button textOnly onClick={hideCartHandler}>Close</Button>
        {cartCtx.items.length > 0 && <Button onClick={handleCheckout}>Go To Checkout</Button>}
    </p>
    </Modal>
}
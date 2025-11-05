import { currencyFormat } from "../utils/formatting";

function CartItem({name,quantity,price,onInc,onDec}){
return <li className="cart-item">
    <p>{name} - {quantity} * {currencyFormat.format(price)} </p>
    <p className="cart-item-actions">
        <button onClick={onDec}>-</button>
        <span>{quantity}</span>
        <button onClick={onInc}>+</button>
    </p>
</li>
}

export default CartItem;
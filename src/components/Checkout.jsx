import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormat } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";

const requestHeader = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userPrgCtx = useContext(UserProgressContext);

    const { data, isLoading: isSending, error, sendRequest,clearData } = useHttp('https://solid-zebra-67qvj97pqvp3xxrv-3001.app.github.dev/orders', requestHeader,)

    const cartTotal = cartCtx.items.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
    }, 0);

    function handleClose() {
        userPrgCtx.handleClose();
        
         clearData();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
       
    }

    let actions = (<>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </>
    )

    if (isSending) {
        actions = <span>Sending Data</span>
    }

    if (data && !error) {
        return <Modal open={userPrgCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success</h2>
            <p>Order Submitted</p>
            <p>We'll get back to you in some time</p>
            <p className="modal-actions">
                <Button onClick={handleClose}>OK</Button>
            </p>
        </Modal>
    }
    return <Modal open={userPrgCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormat.format(cartTotal)}</p>
            <Input type="text" label={'Full Name'} id="name" />
            <Input type="email" label={'E-mail'} id='email' />
            <Input type="text" label={"Street"} id="street" />
            <div className="control-row">
                <Input type="text" label={"Postal Code"} id="postal-code" />
                <Input type="text" label={"City"} id="city" />
            </div>
            {error && <Error message={error} title={"Someting went wrong"} />}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}
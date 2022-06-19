import { Fragment, useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext)

    const [isSubmit, setIsSubmit] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    // if this is true, order button can display
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {

        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (useData) => {
        setIsSubmit(true)
        await fetch('https://react-foodapp-880fa-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: useData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmit(false)
        setDidSubmit(true)
        cartCtx.clearItem();
    };
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    const modalActions = (<div className={classes.actions}>
        {/* hideCartHandler pass it to Close build by build in event onClick with the props name onClose */}
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>)

    const modalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </Fragment>


    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModal = <Fragment>
        <p>Successfully sent the order!</p>
        <button className={classes.button} onClick={props.onClose}>Close</button>
    </Fragment>
    return (
        // hideCartHandler passed onClose from App -> Cart -> Modal
        <Modal onClose={props.onClose}>
            {!isSubmit && !didSubmit && modalContent}
            {isSubmit && isSubmittingModalContent}
            {!isSubmit && didSubmit && didSubmitModal}
        </Modal>
    )
}

export default Cart;
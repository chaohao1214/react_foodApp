
import classes from './HeaderCartBtn.module.css'
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartBtn = (props) => {
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)


    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighlighted(true)

        const timer = setTimeout(() => {
            setBtnHighlighted(false)

        }, 300)

        return () => {
            clearTimeout(timer)
        }

    }, [items]);
    // finally, we pass onShow handler to button from Header component and named as "onClick"
    // on the button tag, onClick now is build in event,
    // props.onClick pass down from App -> Header -> HeaderCartBtn
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span >You Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartBtn;

import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const Checkout = props => {

    const [formInputValidation, setFormInputValidation] = useState(
        {
            name: true,
            street: true,
            city: true,
            postal: true,
        }
    );
    const isEmpty = value => value.trim() === "";
    const isFiveChars = (value) => value.trim().length === 6;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const streeIsValid = !isEmpty(enteredStreet);
        const postalIsValid = isFiveChars(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputValidation(
            {
                name: enteredNameIsValid,
                street: streeIsValid,
                city: cityIsValid,
                postal: postalIsValid,
            }
        )
        const formIsValid =
            enteredNameIsValid && streeIsValid && postalIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }
        // submit cart data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal,
        })

    }
    const nameControlClasses = `${classes.control} ${formInputValidation.name ? "" : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputValidation.street ? "" : classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputValidation.postal ? "" : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputValidation.city ? "" : classes.invalid}`

    return <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type="text" id='name' ref={nameInputRef} />
            {!formInputValidation.name && <p>Please enter a name here</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type="text" id='street' ref={streetInputRef} />
            {!formInputValidation.street && <p>Please enter a street here</p>}

        </div>
        <div className={postalControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type="text" id='postal' ref={postalInputRef} />
            {!formInputValidation.postal && <p>Please enter a postal code here</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type="text" id='city' ref={cityInputRef} />
            {!formInputValidation.city && <p>Please enter a city here</p>}

        </div>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>

}


export default Checkout;
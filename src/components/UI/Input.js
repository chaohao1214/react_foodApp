import classes from './Input.module.css'
import React from 'react';

// the second parameter ref is the set of ref parameter in MealItemForm component
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id} >
                {props.label}
            </label>
            {/* spread operator make sure all other input in in there */}
            <input ref={ref} {...props.input} />
        </div>
    )

})

export default Input;
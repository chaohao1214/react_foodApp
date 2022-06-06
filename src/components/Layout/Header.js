import React from 'react'
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartBtn from './HeaderCartBtn'

const Header = (props) => {
    return (<React.Fragment>
        <header className={classes.header} >
            <h1>ReactMeals</h1>
            {/* passing the showCartHandler name as onShow to HeaderCartBtn component. 
            On here, onClick just a name, we can named it anything we want */}
            <HeaderCartBtn onClick={props.onShow} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="a header full for delicious food!" />
        </div>
    </React.Fragment>

    )
}

export default Header;

import Header from "./components/Layout/Header";
import React from 'react'
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from 'react'
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {/* hideCartHandler named as onClose and pass the props from App -> Cart */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* passing the showCartHandler name as onShow to header component */}
      <Header onShow={showCartHandler} />
      <main>
        <Meals />
      </main>

    </CartProvider>
  );
}

export default App;

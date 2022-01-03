
import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css";
import CartItem from "./Cartitem.js";
let price,items;
function Cart(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  
  
  useEffect(() => {
    let items = 0;
    let price = 0;
    props.cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalItems(items);
    setTotalPrice(price);
  }, [props.cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

    price = totalPrice
    items = totalItems
    console.log(totalItems)
      if(totalItems === 1){
        return(
        <div >
              <div className={styles.cart}>
                <div className={styles.cart__items}>
                 {props.cart.map((item) => (
                   <CartItem key={item.id} item={item} />
                    ))}
               </div>
              <div className={styles.cart__summary}>
              <h4 className={styles.summary__title}>Cart Summary</h4>
                <div className={styles.summary__price}>
               <span>TOTAL: ({totalItems} item)</span>
               <span>Rs {totalPrice}</span>
               </div>
               <button className={styles.summary__checkoutBtn}>
                 <Link to="/checkout">Proceed To Checkout</Link>
              </button>
            </div>
           </div>
          </div>
    )}
    else if(totalItems === 0){
      return(
        <div >
              <div className={styles.cart}>
                <div className={styles.cart__items}>
                 {props.cart.map((item) => (
                   <CartItem key={item.id} item={item} />
                    ))}
               </div>
              <div className={styles.cart__summary}>
              <h4 className={styles.summary__title}>Cart Summary</h4>
                <div className={styles.summary__price}>
               <span>TOTAL: ({totalItems} items)</span>
               <span>Rs {totalPrice}</span>
               </div>
               <button className={styles.summary__checkoutBtn}>
                 Proceed To Checkout
              </button>
            </div>
           </div>
          </div>
      )
    }
    else{
      return(
        <div >
              <div className={styles.cart}>
                <div className={styles.cart__items}>
                 {props.cart.map((item) => (
                   <CartItem key={item.id} item={item} />
                    ))}
               </div>
              <div className={styles.cart__summary}>
              <h4 className={styles.summary__title}>Cart Summary</h4>
                <div className={styles.summary__price}>
               <span>TOTAL: ({totalItems} items)</span>
               <span>Rs {totalPrice}</span>
               </div>
               <button className={styles.summary__checkoutBtn}>
                 <Link to="/checkout">Proceed To Checkout</Link>
              </button>
            </div>
           </div>
          </div>
      )
    }
}


export default Cart;
export {price,items}
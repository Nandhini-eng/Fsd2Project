
import React, { useState ,useEffect} from 'react';
import { connect } from "react-redux";
import styles from "./Cart.module.css";
import CartItem from "./Cartitem.js";

export default function Cart(props) {
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

  
  
  // function c(){
  //   props.getproducts(props.newspapers,props.magazines)


  // };
  // c()
  const x=()=>{
    
    props.getproducts(props.newspapers,props.magazines)


};

  


    return (
     
       <div >
              <button onClick={()=>props.getproducts(props.newspapers,props.magazines)}>click</button>  
              
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



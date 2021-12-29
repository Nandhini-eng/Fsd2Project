import React, { useState } from "react";
import styles from "./Cartitem.module.css";

import { connect } from "react-redux";
import {removefromCart,adjustQty} from '../redux/ActionCreators';


function CartItem({ item, adjustQty, removefromCart }){
  
    const [input, setInput] = useState(item.qty);
    const onChangeHandler = (e) => {
        setInput(e.target.value);
        adjustQty(item.id, e.target.value);
      };
    
      return (
        <div className={styles.cartItem}>
          <img
            className={styles.cartItem__image}
            src={item.image}
            alt={item.title}
          />
          <div className={styles.cartItem__details}>
            <p className={styles.details__title}>{item.title}</p>
          
            <p className={styles.details__price}>$ {item.price}</p>
          </div>
          <div className={styles.cartItem__actions}>
            <div className={styles.cartItem__qty}>
              <label htmlFor="qty">Months</label>
              <input
                min="1"
                type="number"
                id="qty"
                name="qty"
                value={input}
                onChange={onChangeHandler}
              />
            </div>
            <button
              onClick={() => removefromCart(item.id)}
              className={styles.actions__deleteItemBtn}
            >
              
              -
            </button>
          </div>
        </div>
      );
    };


    const mapDispatchToProps = (dispatch) => {
        return {
          adjustQty: (id, value) => dispatch(adjustQty(id, value)),
          removefromCart: (id) => dispatch(removefromCart(id)),
        };
      };
      
      export default connect(null, mapDispatchToProps)(CartItem);
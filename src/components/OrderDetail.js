
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cart.module.css";
import CartItem from "./Cartitem.js";
import { Button } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import OrderItem from './Orderitem';


function RenderOrders({order}){
    console.log("entered order details");
    return(
  
        <div>
          <div className={styles.cart}>
            <div className={styles.cart__items}>
  
              {/* we send each items in cart of cart state to cartitem component to render it as card aong with styling */}
              <div>
                <h7 style={{color:"white"}}>Order id : {order._id}</h7>
                <br></br>
                <h7 style={{color:"white"}}>Total Price : {order.price}</h7>
                <br></br>
                <h7 style={{color:"white"}}>Order Placed At : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(order.updatedAt)))}</h7>
                <br></br>
                <h7 style={{color:"white"}}>Address : {order.address}</h7>
                
              </div>
              {order.cart.map((item) => (
                <Fade left>
                  <Pulse>
                <OrderItem key={item._id} item={item} id={order._id}/>
                </Pulse>
                </Fade>
              ))}
            </div>
            
          </div>
        </div>
      



    );


}


const OrderDetail=(props)=>{
    console.log("entered order details func1");
    return(
    <div>
       <RenderOrders order={props.orderSelected} />
    </div>
    );
}


export default OrderDetail;
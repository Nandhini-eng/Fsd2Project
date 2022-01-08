import "./Orders.css";
import {user_real} from "./Login";

function OrdersComponent(props){
    const errMess = props.ordersErrMess
    const orders = props.orders
    if (errMess === null){
      if(user_real){
       if (orders.length){
          return(
            <div className="mo">
            <div style={{paddingLeft:"13%", paddingBottom:"20px"}}>
                <h3>ORDERS</h3>
                <table style={{backgroundColor: "#91eded"}}>
                  <tr>
                    <th>Subscribed on</th>
                    <th>Shipping Address</th>
                    <th>Items Subscribed</th>
                    <th>Subscription plan(months)</th>
                    <th>Total subscription amount</th>
                  </tr>
                  {orders.map((order)=> orders.items === '1' ?(
                    
                  <tr key={order.id}>
                    <td><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(order.date)))}</p></td>
                    <td><p>{order.address}</p></td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td><p style={{fontFamily:"sans-serif"}}>{order.price} ({order.items} item)
                      </p></td>
                  </tr>
            
                  ):(
                    <tr key={order.id}>
                    <td><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(order.date)))}</p></td>
                    <td><p>{order.address}</p></td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td><p style={{fontFamily:"sans-serif"}}>{order.price} ({order.items} items)
                      </p></td>
                  </tr>
                  ))
                }
                </table>  
            </div>
            </div>
          );
       }
       else {
          return(
            <div className="mo">
              <div className="container">
                <div className="col-12 col-md-10">
                    <h3 style={{color:"#d10a9c"}}>ORDERS</h3>
                    <h4 style={{fontSize:"20px", color:"#07ada5"}}>No Orders placed.</h4>
                </div>
              </div>
            </div>
          ); 
       }
      }
      else{
        return(
          <div className="mo">
            <div className="container">
              <div className="col-12 col-md-10">
                  <h4 style={{fontSize:"20px", color:"#07ada5"}}>You must be logged in to display your orders</h4>
              </div>
            </div>
          </div>
        );
      }
    }
    else {
      return (
        <div className="mo">
          <div className="col-12 col-md-10">
            <h5>{errMess}</h5>
          </div>
        </div>
      );
    } 

}

export default OrdersComponent;
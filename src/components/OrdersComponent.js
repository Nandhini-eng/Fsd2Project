import "./Orders.css";
function OrdersComponent(props){
    const errMess = props.ordersErrMess
    const orders = props.orders
    if (errMess === null){
       if (orders.length){
          return(
            <div style={{paddingLeft:"13%", paddingBottom:"20px"}}>
                <h3>ORDERS</h3>
                <table>
                  <tr>
                    <th>Subscribed on</th>
                    <th>Shipping Address</th>
                    <th>Items Subscribed</th>
                    <th>Subscription plan(months)</th>
                    <th>Total subscription amount</th>
                  </tr>
                  {orders.map((order)=> orders.items === '1' ?(
                    
                  <tr key={order.id}>
                    <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(order.date)))}</td>
                    <td>{order.address}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td>{order.price} ({order.items} item)
                      </td>
                  </tr>
            
                  ):(
                    <tr key={order.id}>
                    <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(order.date)))}</td>
                    <td>{order.address}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item)=>(
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td>{order.price} ({order.items} items)
                      </td>
                  </tr>
                  ))
                }
                </table> 
              
            </div>
          );
       }
       else{
          return(
            <div className="col-12 col-md-10 m-1">
                <h3>ORDERS</h3>
                <h5>No Orders placed.</h5>
            </div>
          ); 
       }
    }
    else{
      return(
          <div className="col-12 col-md-10 m-1">
            <h5>{errMess}</h5>
          </div>
      ); 
    }

}


export default OrdersComponent;
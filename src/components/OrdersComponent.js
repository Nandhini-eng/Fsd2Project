import "./Orders.css";
import { user_real } from "./Login";
import { Breadcrumb,BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
function OrdersComponent(props) {
  const errMess = props.ordersErrMess
  const orders = props.orders
  if (errMess === null) {
    if (user_real) {
      if (orders.length) {
        //Displying orders of a particular user if there is no error and atleast one order is placed by them
        return (
          <div className="mo">
            <div style={{ paddingLeft: "6%", paddingBottom: "20px" }}>
            <Breadcrumb style={{ fontSize: "20px",padding:"3px" }} className='bdcrum'>
              <BreadcrumbItem><Link to="/myaccount">Account</Link></BreadcrumbItem>
              <BreadcrumbItem active>Orders</BreadcrumbItem>
            </Breadcrumb>
              <h3>ORDERS</h3>
              <table style={{ backgroundColor: "#91eded" }}>
                {/* Required headings to be displayed */}
                <tr>
                  <th>Subscribed on</th>
                  <th>Shipping Address</th>
                  <th>Items Subscribed</th>
                  <th>Subscription plan(months)</th>
                  <th>Total subscription amount</th>
                </tr>
                {/* Displaying each order with required information */}
                {orders.map((order) => orders.items === '1' ? (

                  <tr key={order.id}>
                    <td><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(order.date)))}</p></td>
                    <td><p>{order.address}</p></td>
                    <td>{order.cart.map((item) => (
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item) => (
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td><p style={{ fontFamily: "sans-serif" }}>{order.price} ({order.items} item)
                    </p></td>
                  </tr>

                ) : (
                  <tr key={order.id}>
                    <td><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(order.date)))}</p></td>
                    <td><p>{order.address}</p></td>
                    <td>{order.cart.map((item) => (
                      <p key={item.id}>{item.name}</p>
                    ))}</td>
                    <td>{order.cart.map((item) => (
                      <p key={item.id}>{item.qty}</p>
                    ))}</td>
                    <td><p style={{ fontFamily: "sans-serif" }}>{order.price} ({order.items} items)
                    </p></td>
                  </tr>
                ))
                }
              </table>
            </div>
          </div>
        );
      }
      //If there are no orders, a statement stating that is displayed
      else {
        return (
          <div className="mo">
            <div className="container">
              <div className="col-12 col-md-10">
                <h3 style={{ color: "#d10a9c" }}>ORDERS</h3>
                <h4 style={{ fontSize: "20px", color: "#07ada5" }}>No Orders placed.</h4>
              </div>
            </div>
          </div>
        );
      }
    }
    //If user is not logged in, displaying login message
    else {
      return (
        <div className="mo">
          <div className="container">
            <div className="col-12 col-md-10">
              <h4 style={{ fontSize: "20px", color: "#07ada5" }}>You must be logged in to display your orders</h4>
            </div>
          </div>
        </div>
      );
    }
  }
  //If any error occurs, an error message is displayed
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
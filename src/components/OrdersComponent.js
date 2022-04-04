import "./Orders.css";
import { user_real } from "./Login";
import { Breadcrumb,BreadcrumbItem ,Card,CardHeader,CardBody}   from "reactstrap";
import { Link } from "react-router-dom";


function RenderItem({ order }) {

  return (
    <div >
      <Card style={{backgroundColor:"#c9ece4"}}>
        <Link to={`/orders/${order._id}`}>
          
            
            <div >
            <p style={{fontSize:"30px", color:"black",alignContent:"center"}}>Click to view complete order details</p>
            {/* <CardHeader><h4>Order Id:{order._id}</h4></CardHeader> */}
              <p style={{fontSize:"20px", color:"black"}}>{order.fullName}</p>
              <p style={{fontSize:"20px",color:"black"}}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(order.updatedAt)))}</p>
              <p style={{fontSize:"20px",color:"black"}}>Total Amount:{order.price}</p>

          
            </div>
    
        </Link>

      </Card>
    </div>
  );
}







function OrdersComponent(props) {
  const errMess = props.ordersErrMess
  const orders = props.orders


  const items = orders.map((order)=> {
             
    return (
       <div key={order._id}>
     <RenderItem order={order}  />
       <br />
      </div>
         )
         }
         )


  const displayOrders =items.map((order) => {
          return (
            <div style={{ width: 1000}}>
              {order}
            </div>
          );
        });       

  if (errMess === null) {
    if (user_real) {
      if (orders.length) {
        //Displying orders of a particular user if there is no error and atleast one order is placed by them
        return (
          <div className="container">
          <div >
            <div style={{ paddingLeft: "6%", paddingBottom: "20px"}}>
            <Breadcrumb style={{ fontSize: "20px",padding:"3px" }} className='bdcrum'>
              <BreadcrumbItem><Link to="/myaccount">Account</Link></BreadcrumbItem>
              <BreadcrumbItem active>Orders</BreadcrumbItem>
            </Breadcrumb>
              <h3 style={{color:'white'}}>ORDERS</h3>
              
              {displayOrders}
              

            
            


             


              </div>
              
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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentDetails } from './../redux/ActionCreators';
import "./Checkout.css";

export default function PaymentMethodScreen(props) {
  // const cart = useSelector((state) => state.cart);
  // const { shippingAddress } = cart;

  const [Name, setName] = useState('');
  const [CreditCardNum, setCreditCardNum] = useState('');
  const [ExpMon, setExpMon] = useState('');
  const [ExpYear, setExpYear] = useState('');
  const [Cvv, setCvv] = useState('');
  // if (!shippingAddress.address) {
  //   props.history.push('/address');
  // }
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentDetails({Name,CreditCardNum,ExpMon,ExpYear,Cvv}));
    alert("Subscription added succesfully");
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <label htmlFor="fname">Accepted Cards</label>
            <div class="icon-container">
              <i class="fa fa-cc-visa" style={{color:"navy"}}></i>
              <i class="fa fa-cc-amex" style={{color:"blue"}}></i>
              <i class="fa fa-cc-mastercard" style={{color:"red"}}></i>
              <i class="fa fa-cc-discover" style={{color:"orange"}}></i>
        </div>
        <div>
        <label htmlFor="cname">Name on Card</label>
          <input type="text" id="cname" name="cardname" placeholder="Enter name on card"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
        <label htmlFor="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="Enter card number" 
            value={CreditCardNum}
            onChange={(e) => setCreditCardNum(e.target.value)}
            required
          ></input>
        </div>
        <div>
        <label htmlFor="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="Enter expiry month" 
            value={ExpMon}
            onChange={(e) => setExpMon(e.target.value)}
            required
          ></input>
        </div>
        <div className="row1">
            <div className='col-50'>
              <label for="expyear">Exp Year</label>
              <input type="text" id="expyear" name="expyear" placeholder="Enter expiry year"
              value={ExpYear}
              onChange={(e) => setExpYear(e.target.value)}
              required></input>
            </div>
            <div className='col-50'>
              <label for="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" placeholder="Enter CVV"
               value={Cvv}
            onChange={(e) => setCvv(e.target.value)}
            required></input>
            </div>
          </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
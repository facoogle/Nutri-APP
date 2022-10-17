import React, { useState, useEffect } from "react";
import {
  CardElement,
  // Elements,
  // PaymentElement,
  // PaymentRequestButtonElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  FpxBankElement,
  CardCvcElement
  // loadStripe
} from "@stripe/react-stripe-js";
import swal from 'sweetalert';
import { NavBar } from "../nav/nav";
import { useNavigate } from "react-router-dom"
import './checkoutForm.css' 
const { REACT_APP_HOST } =
  process.env;


export function PaymentForm() {

  const navigate2 = useNavigate()
  useEffect(() => {
    const loggedUserSession = window.sessionStorage.getItem("user")
    if(loggedUserSession){
      const userLogged = JSON.parse(loggedUserSession)
      setUser(userLogged)
    }
    if(!loggedUserSession){
      navigate2("/home")
    }
  },[])
  

  const [user, setUser] = useState('')

  const stripe = useStripe();
  const elements = useElements();


  const createSubscription = async () => {
    
    try {

      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement("cardNumber"),
        type: "card",
      });

      const response = await fetch(`${REACT_APP_HOST}/user/premium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user.username,
          userEmail: user.email,
          paymentMethod: paymentMethod.paymentMethod.id,
        }),
      });


      if (!response.ok) return alert("Payment unsuccessful!");
      const data = await response.json();
      // const datae = JSON.parse(data)

      // console.log('ESTIIIII', data.respuesta)
      const confirm = await stripe.confirmCardPayment(data.respuesta.clientSecret);
      if (confirm.error) return alert("Payment unsuccessful!");
      swal("Payment Successful! Subscription active.").then(navigate2('/home'))
      

    } catch (err) {
      // console.error(err);
      swal("Payment failed! Please checkout the given information", `Error message: ${err.message}`  );
    }
  };

  //style 
  const inputStyle = {
    iconColor: '#c4f0ff',
    color: '#ff0',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
}

  return (
    <div>
      <NavBar/>
    <div className='paymentContainer'>
      <div className='promotion'>
          <h1 className='title'>Why you have to be a Premium User?</h1>
          <br/>
          <div className='listDiv'>
            <ul className='list'>
              <li>✅ You can chat with real nutritionists</li>
              <li>✅ You can see more details from the recipes you search</li>
              <li>✅ You will have more slots in your favourite recipe list</li>
              <li>✅ you will have exclusive access to the new features that we implement in the future</li>
            </ul>
          </div>
          <br/>
      </div>   
      <h1>BE PREMIUM NOW!</h1>
      <div className='cardContainer'>
        <div >
          <br/>
          {/* <label className='label'>Card Name:</label>
          <br/>
          <input className='nameInput' placeholder='Name'/> */}
          <br/>
          <label className='label'>Card Number:</label>
          <CardNumberElement className='cardInputWrapper' />
          <label className='label'>Card Expiry Date:</label>
          <CardExpiryElement className='cardInputWrapper' />
          <label className='label'>Card CVC:</label>
          <CardCvcElement className='cardInputWrapper' />
          <br/>
          <button onClick={createSubscription} className='button' class="btn btn-secondary">Subscribe - 5 USD</button>
        </div>
      </div>
    </div>
    </div>
  );
}

// export default PaymentForm;
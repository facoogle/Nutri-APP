import React, { useState, useEffect } from "react";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import swal from 'sweetalert';
import { NavBar } from "../nav/nav";
import { useNavigate } from "react-router-dom"
import { Spinner } from '../spinner/spinner'
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
  const [loader, setLoader] = useState(true)

  const stripe = useStripe();
  const elements = useElements();


  const createSubscription = async () => {
    
    try {
      
      setLoader(false)

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

      //  console.log('ESTIIIII', data.respuesta)
      const confirm = await stripe.confirmCardPayment(data.respuesta.clientSecret);
      // console.log('estoo',confirm)
      if (confirm.error) return alert("Payment unsuccessful!");
      if (confirm) setLoader(true)
      sessionStorage.setItem('user', JSON.stringify(data.respuesta.user))
      sessionStorage.setItem('token', JSON.stringify(data.respuesta.token))
      swal("Payment Successful! Subscription active.").then(navigate2('/home'))
      
    } catch (err) {
      // console.error(err);
      swal("Payment failed! Please checkout the given information", `Error message: ${err.message}`  );
      setLoader(true)
    }
  };



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
              <li>✅ You will have exclusive access to the new features that we implement in the future</li>
            </ul>
          </div>
          <br/>
      </div>   
      <h1>BE PREMIUM NOW!</h1>
      {
        loader === false ? <Spinner className='spinner'/> : <></>
      }
      <div className='cardContainer'>
        <div >
          <br/>
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

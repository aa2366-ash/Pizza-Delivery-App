import React from 'react'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delCart } from '../Redux/Cart/cartAction';

import {  Button } from 'react-bootstrap';


function RazorPay() {
    const cart = useSelector((state) => state.cart)
    const clearCart = useDispatch()
    const history = useHistory()

    const paymentHandler = async (e) => {
        const API_URL = 'https://pizza-planet-server.herokuapp.com/'
        e.preventDefault();
        console.log(cart.reduce((a , c) => a + c.price , 0 ))
        const orderUrl = `${API_URL}order`;
        const res = await fetch(orderUrl , {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
              
              amount : cart.reduce((a , c) => a + c.price , 0 ) })
        } )
        const response = await res.json()
        const  data  = response;
        console.log(data)
        const options = {
          key: "rzp_test_OcgwC6Xd8dyDg8",
          name: "Pizza Planet",
          description: "New order from ",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {amount : cart.reduce((a , c) => a + c.price , 0 )} )
             console.log(captureResponse ,captureResponse.data.order_id,captureResponse.data.amount );
             await Axios.post(API_URL + 'kitchen' , {
              email : JSON.parse(localStorage.getItem('userDetails')).email ,
              orderDetails : cart,
              order_id : JSON.parse(captureResponse.data).order_id,
              amount : JSON.parse(captureResponse.data).amount //captureResponse.data.amount
          } )
          history.push('/track');
          clearCart(delCart())
            } catch (err) {
              console.log(err);
            }
            
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };
      const cancelOrder = () => {
        clearCart(delCart())
      }
       
    return (
      <>
      <Button variant={'success'} onClick = {paymentHandler} className={'mx-3'} >
        Pay Now
      </Button>
      <Button variant={'danger'} onClick = {cancelOrder} className={'mx-3'} >
        Cancel Order
      </Button>
      </>
    )
}

export default RazorPay

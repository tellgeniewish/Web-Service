import React, { useState, useRef } from 'react';
import './breakneck_new.css';

export default function PizzaApp() {  

  const [phone, setPhone] = useState("");
   
  const greetingRef = useRef();   // useRef Hook 이용, <span id="greeting"> 엘리먼트에 대한 참조 변수 생성
  const msgDivRef = useRef();   // useRef Hook 이용, <div id="resp"> 엘리먼트에 대한 참조 변수 생성

  const lookupCustomerUrl = "/AjaxLab/pizza_json/lookupCustomer_json.jsp?phone="; 
  const submitOrderUrl = "/AjaxLab/pizza_json/placeOrder_json.jsp";      

  const getCustomerInfo = e => {
    if (e.target.value === "") {
    
    }
    else {
      // fetch(lookupCustomerUrl +  

    }      
  };

  const submitOrder = (e) => {
    e.preventDefault();

    // const submitData = {
    //  phone: 
    //  address: { street:  },	// city, state, zipCode는 생략 -> null 값을 가짐				
    //  recentOrder: 
    //};
    
    // fetch(submitOrderUrl,     
  };
  
  return (
    <div id="pizza">
      <div><img src="ex9/breakneck-logo_new.gif" alt="Break Neck Pizza" /></div>
      <form id="order-form" onSubmit={submitOrder}>
        <div>
          Enter your phone number:
          <input type="text" size="14" name="phone" 
            onBlur={getCustomerInfo} />
        </div>
        <div>
          <span id="greeting" ref={greetingRef}></span>
          Type your order in here:
          <textarea name="order" rows="6" cols="50" />   {/* 이 엘리먼트를 참조 */} 
        </div>
        <div>
          Your order will be delivered to:
          <textarea name="address" rows="4" cols="50" />  {/* 이 엘리먼트를 참조 */} 
        </div>
        <input type="submit" value="Order Pizza" />
        <div id="resp" ref={msgDivRef}></div>   {/* msgDivRef가 이 엘리먼트를 참조함 */} 
      </form>
    </div>
  );
}  
import React, { useState, useRef } from 'react';
import './CDCatalog.css';

export default function CDCatalog() {  
 
  return (
    <div className="catalog">       
 	    Click button:      
      <button onclick="loadDoc()">Get my CD collection</button>	
	    <table id="demo"></table>
	    <div id="msg"></div>

      {/* 추가: clear button 생성 */}              
    </div>
  );
}  
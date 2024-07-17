import React, { useState, useRef } from 'react';

export default function KeywordSuggestion() {  

  const [suggestions, setSuggestions] = useState("");   // useState Hook 이용, state 변수 생성
  const serverUrl = "/AjaxLab/keywordSuggestion/gethint.jsp?q=";      

  return (
    <div className="catalog">       
	    <h3>Start typing a name in the input field below:</h3>
	    <form>         
        <input type="text" id="txt1" onkeyup="" />
      </form>	
	    <p>Suggestions: <span id="txtHint"></span></p> 
    </div>
  );
}  
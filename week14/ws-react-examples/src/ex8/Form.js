import {useRef} from 'react';

function Form1({onInputColor}) {
  const submit = (e) => {       
    // e: onsubmit event 객체
    // e.target: onsubmit event가 발생한 엘리먼트인 <form>을 참조
    // e.target.title: <form>의 자식 엘리먼트들 중 name="title"인 것을 참조  
    // e.target.title.value: <input name="title">의 value 속성 값 (즉, 입력 값)

    e.preventDefault();    // onsubmit 이벤트의 default action(새로운 요청 발생)을 막음    
    onInputColor(e.target.title.value, e.target.color.value);                  
    e.target.title.value = "";
    e.target.color.value = "#0";
    e.target.title.focus();
  };

  return (
    <form onSubmit={submit}>
      Form 1: 
      <input type="text"  name="title"    // name 속성 필요        
        placeholder="Enter a color title"/>
      <input type="text"  name="color"    // name 속성 필요
        placeholder="Enter a color name"/>
      <button type="submit">go</button>
    </form>
  );
}

function Form2({onInputColor}) {
  const titleRef = useRef();   // useRef Hook 이용
  const colorRef = useRef();   // useRef Hook 이용

  const submit = (e) => {      // e: onsubmit event 객체    
    e.preventDefault();        // form의 submit 동작을 방지

    // event 객체 대신 ref 이용
    // titleRef.current : titleRef가 현재 참조하는 엘리먼트
    // colorRef.current : colorRef가 현재 참조하는 엘리먼트
    onInputColor(titleRef.current.value, colorRef.current.value);  
    titleRef.current.value = "";
    colorRef.current.value = "#0";
    titleRef.current.focus();
  };

  return (
    <form onSubmit={submit}>
      Form 2:      
      <input type="text"  
        // name="title" 
        placeholder="Enter a color title"
        ref={titleRef} />    {/* titleRef가 이 <input> 엘리먼트를 참조하도록 함 */}  
      <input type="text"  
        // name="color" 
        placeholder="Enter a color name"
        ref={colorRef} />    {/* colorRef가 이 <input> 엘리먼트를 참조하도록 함 */}
      <button type="submit">go</button>
    </form>
  );
}

export {Form1, Form2};
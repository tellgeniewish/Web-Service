import { useContext } from 'react';                   // 추가
import { ColorContext } from './ColorizerProvider';   // 추가

export default function Form1() {      //  {onInputColor} Props 생략
  const { newColor } = useContext(ColorContext);     // ColorContext에서 newColor 함수 추출

  const submit = (e) => {       
    // e: onsubmit event 객체
    // e.target: onsubmit event가 발생한 엘리먼트인 <form>을 참조
    // e.target.title: <form>의 자식 엘리먼트들 중 name="title"인 것을 참조  
    // e.target.title.value: <input name="title">의 value 속성 값 (즉, 입력 값)

    e.preventDefault();    // onsubmit 이벤트의 default action(새로운 요청 발생)을 막음    
    //onInputColor(e.target.title.value, e.target.color.value);                  
    newColor(e.target.title.value, e.target.color.value);                  
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

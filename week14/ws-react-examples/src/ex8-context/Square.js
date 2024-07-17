import { useContext } from 'react';         // 추가
import { ColorContext } from './ColorizerProvider'; // 추가

export default function Square() {               // {color} props 생략
  const { color } = useContext(ColorContext);    // ColorContext에서 color 상태 추출

  var squareStyle = {
    width: "240px",
    height: "120px",
    boxShadow: "0px 0px 25px 0px #333",
    marginBottom: "20px"
  };

  squareStyle = { 
    ...squareStyle, 
    backgroundColor: color    // 배경색을 color 상태 값으로 설정
  }  

  return (
    <div style={squareStyle}></div>
  );
}

import {useState, createContext} from 'react';    // createContext 추가
import Square from './Square';
import Form1 from './Form';
import './Colorizer.css';

export const ColorContext = createContext();      // context 정의

export default function ColorizerProvider() {
  const [title, setTitle] = useState("파랑");
  const [color, setColor] = useState("blue");
  
  const newColor = (title, color) => {
    setTitle(title);
    setColor(color);
  };
  
  return (
    <ColorContext.Provider value={{ color, newColor }}>   {/* Context Provider 정의 */}
      <div className="colorArea">
        <h3>Title: {title}</h3>
        <Square/>    {/* color={color} 속성 생략 */} 
        <Form1/>      {/* onInputColor={newColor} 속성 생략 */}
      </div>
    </ColorContext.Provider>
  );
}

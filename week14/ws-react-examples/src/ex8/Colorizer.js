import {useState} from 'react';
import Square from './Square';
import {Form1, Form2} from './Form';
import './Colorizer.css';

export default function Colorizer() {
  const [title, setTitle] = useState("흰색");
  const [color, setColor] = useState("white");
  
  const newColor = (title, color) => {
    setTitle(title);
    setColor(color);
  };
  
  return (
    <div className="colorArea">
      <h3>Title: {title}</h3>
      <Square color={color}/>      
      <Form1 onInputColor={newColor}/> 
      <Form2 onInputColor={newColor}/>        
    </div>
  );
}

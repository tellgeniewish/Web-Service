export default function Square({color}) {
  var squareStyle = {
    width: "240px",
    height: "120px",
    boxShadow: "0px 0px 25px 0px #333",
    marginBottom: "20px"
  };

  squareStyle = { 
    ...squareStyle, 
    backgroundColor: color  // 배경색을 color props 값으로 설정
  }  

  return (
    <div style={squareStyle}></div>
  );
}

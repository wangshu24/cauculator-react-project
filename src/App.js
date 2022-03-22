import "./style.css";

function App() {
  return (
    <div className="calculatr-grid">
      <div className="output-grid">
        <div className="previous-operand">121234123431</div>
        <div className="current-operand">213213123123</div>
      </div>

      <button className="span-two-column">AC</button>
      <button>DEL</button>
      <button>/</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>+</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two-column">=</button>
    </div>
  );
}

export default App;

import "./style.css";
import {useReducer} from 'react'
import DigitButton from './DigitButton'
import OperandButton from './OperandButton'

export const ACTIONS = {
  CHOOSE_OPERTATION: 'choose-operation',
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  CLEAR_ALL: 'clear-all',
}

function reducer(state, {type, payload}) {
  switch(type){
    case ACTIONS.CHOOSE_OPERTATION:
      if(state.currentOperand ==null && state.previousOperand==null) {return state}
      if(state.previousOperand == null){
        return {
          currentOperand: null, 
          previousOperand: state.currentOperand, 
          operations: payload.operand}
        }
      if(state.currentOperand == null) {
        return {
          ...state, 
          operations: payload.operand
        }
      }

      return {
        ...state, 
        previousOperand: evaluate(state), 
        operations: payload.operand, 
        currentOperand: null
      }
    case ACTIONS.CLEAR_ALL:
        return {}
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state, 
          currentOperand: payload.digit, 
          overwrite: false
        }
      }
      if(payload.digit==="0" && state.currentOperand === "0") {return state}
      if(payload.digit==="." && state.currentOperand.includes(".")) {return state}
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.EVALUATE: 
      if (state.currentOperand == null || state.previousOperand == null || state.operations == null) {return state}
      return {
        ...state, 
        previousOperand: null, 
        operations: null, 
        currentOperand: evaluate(state),
        overwrite: true
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state, 
          currentOperand: null,
          overwrite: false
        }      
      }
      if (state.currentOperand == null) {return state}
      if(state.currentOperand.length === 1){return {...state, currentOperand: null}}
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
    default: return state
  }
}

function evaluate({previousOperand, currentOperand, operations}){
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(curr) || isNaN(prev)) {return ""}
  let result = ""

  switch(operations){
    case "+": 
      result = prev + curr
      break
    case "-": 
      result = prev - curr 
      break
    case "x": 
      result = prev * curr 
      break
    case "÷": 
      result = prev /  curr 
      break
    
  }
  return result.toString();
}

function App() {
  const [{currentOperand, previousOperand,operations},dispatch] = useReducer(reducer, {});
  
  return (
    <div className="calculatr-grid">
      <div className="output-grid">
        <div className="previous-operand">{previousOperand} {operations}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button className="span-two-column" onClick={() => dispatch({type: ACTIONS.CLEAR_ALL})}>AC</button> {/*ACTIONS.CLEAR_ALL*/}
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button> {/*ACTIONS.DELETE_DIGIT*/}
      <OperandButton operand={"x"} dispatch={dispatch}/>
      <DigitButton digit={"1"} dispatch={dispatch}/>
      <DigitButton digit={"2"} dispatch={dispatch}/>
      <DigitButton digit={"3"} dispatch={dispatch}/>
      <OperandButton operand={"÷"} dispatch={dispatch}/>
      <DigitButton digit={"4"} dispatch={dispatch}/>
      <DigitButton digit={"5"} dispatch={dispatch}/>
      <DigitButton digit={"6"} dispatch={dispatch}/>
      <OperandButton operand={"+"} dispatch={dispatch}/>
      <DigitButton digit={"7"} dispatch={dispatch}/>
      <DigitButton digit={"8"} dispatch={dispatch}/>
      <DigitButton digit={"9"} dispatch={dispatch}/>
      <OperandButton operand={"-"} dispatch={dispatch}/>
      <DigitButton digit={"."} dispatch={dispatch}/> 
      <DigitButton digit={"0"} dispatch={dispatch}/>
      <button className="span-two-column" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button> {/*ACTIONS._EVALUATE*/}
    </div>
  );
}

export default App;

import React from 'react'
import { ACTIONS } from './App'

export default function OperandButton({operand,dispatch}) {
  return (
    <button 
    onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERTATION, payload: {operand}})}
    >
        {operand}
    </button>
  )
}

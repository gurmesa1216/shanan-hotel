import React from 'react'
import './QuantityStepper.css'

export default function QuantityStepper({ value, onDecrement, onIncrement, min = 1 }) {
  return (
    <div className="qty-stepper">
      <button
        className="qty-stepper__btn"
        onClick={onDecrement}
        disabled={value <= min}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      </button>
      <span className="qty-stepper__value">{value}</span>
      <button className="qty-stepper__btn qty-stepper__btn--plus" onClick={onIncrement}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  )
}

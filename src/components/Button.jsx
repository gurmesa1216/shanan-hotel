import React from 'react'
import './Button.css'

export default function Button({ children, variant = 'primary', size = 'md', onClick, fullWidth, className = '', disabled }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

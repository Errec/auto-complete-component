import React, { forwardRef } from 'react'
import './Input.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className="input" ref={ref} {...props} />
})

Input.displayName = 'Input'
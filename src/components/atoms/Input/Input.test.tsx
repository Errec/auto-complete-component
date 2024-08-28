import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Input } from './Input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test placeholder" />)
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('handles onChange event', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('handles onKeyDown event', () => {
    const handleKeyDown = jest.fn()
    render(<Input onKeyDown={handleKeyDown} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter' })
    expect(handleKeyDown).toHaveBeenCalled()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
import { act, render, screen } from '@testing-library/react'
import { Toast } from './Toast'

jest.useFakeTimers()

describe('Toast', () => {
  it('renders correctly', () => {
    const onClose = jest.fn()
    render(<Toast message="Test message" type="error" onClose={onClose} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('applies correct CSS class based on type', () => {
    const onClose = jest.fn()
    render(<Toast message="Test message" type="success" onClose={onClose} />)
    expect(screen.getByText('Test message').parentElement).toHaveClass('success')
  })

  it('calls onClose after 3 seconds', () => {
    const onClose = jest.fn()
    render(<Toast message="Test message" type="info" onClose={onClose} />)
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(onClose).toHaveBeenCalled()
  })
})
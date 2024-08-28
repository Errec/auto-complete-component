import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastWithHook: React.FC<Omit<React.ComponentProps<typeof Toast>, 'onClose'>> = (args) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <button onClick={() => setVisible(true)}>Show Toast Again</button>;
  }

  return <Toast {...args} onClose={() => setVisible(false)} />;
};

export const Error: Story = {
  render: () => <ToastWithHook message="An error occurred!" type="error" />,
};

export const Success: Story = {
  render: () => <ToastWithHook message="Operation successful!" type="success" />,
};

export const Info: Story = {
  render: () => <ToastWithHook message="Here's some information." type="info" />,
};

export const LongMessage: Story = {
  render: () => (
    <ToastWithHook
      message="This is a very long message that might wrap to multiple lines in the toast component."
      type="info"
    />
  ),
};
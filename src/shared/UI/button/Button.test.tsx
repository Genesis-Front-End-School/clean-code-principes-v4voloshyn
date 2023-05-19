import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from './Button.component';

describe('Button', () => {
  it('should render a button with the given text', () => {
    const { getByText } = render(<Button buttonText="Hello World" />);
    const button = getByText('Hello World');

    expect(button).toBeInTheDocument();
  });

  it('should render a button with the given icon', () => {
    const { getByTestId } = render(
      <Button
        startIcon={<i className="fa fa-check" data-testid="test-icon" />}
      />
    );
    const icon = getByTestId('test-icon');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('fa fa-check');
  });

  it('should call the onClick handler when the button is clicked', async () => {
    const onClickFn = vi.fn();
    render(<Button onClick={onClickFn} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClickFn).toHaveBeenCalled();
  });
});

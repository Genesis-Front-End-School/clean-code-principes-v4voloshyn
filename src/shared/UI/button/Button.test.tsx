import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';

import { Button } from './Button.component';

vi.mock('../spinner/Spinner.component', () => ({
  Spinner: () => <div data-testid="spinner-test" />,
}));

describe('Button component', () => {
  let mockOnClick: Mock;

  beforeEach(() => {
    mockOnClick = vi.fn();
  });

  afterEach(() => vi.resetAllMocks());

  it('renders with the provided text and without spinner', () => {
    const buttonText = 'Awesome button';
    render(<Button onClick={mockOnClick} buttonText={buttonText} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId('spinner-test')).not.toBeInTheDocument();
  });

  it('calls the onClick function when clicked', async () => {
    render(<Button onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disabled when status isLoading', () => {
    const { rerender } = render(<Button isLoading />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    rerender(<Button />);

    expect(button).not.toBeDisabled();
  });

  it('displays the spinner when status isLoading', async () => {
    const { rerender } = render(<Button onClick={mockOnClick} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);
    rerender(<Button onClick={mockOnClick} isLoading />);

    expect(mockOnClick).toHaveBeenCalled();
    expect(screen.getByTestId('spinner-test')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner.component';

describe('Spinner component', () => {
  let loadingText: HTMLElement | null;

  beforeEach(() => {
    loadingText = null;
  });

  it('should render small size spinner by default without variant prop', () => {
    const { getByRole } = render(<Spinner />);
    loadingText = screen.getByText('Loading...');
    expect(getByRole('status')).toHaveClass('spinner', 'spinner-small');
    expect(loadingText).toBeInTheDocument();
  });

  it('should render small size spinner with "small" variant prop', () => {
    const { getByRole } = render(<Spinner variant="small" />);
    loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(getByRole('status')).toHaveClass('spinner', 'spinner-small');
  });

  it('should render as fullscreen variant if prop was passed', () => {
    const { getByRole } = render(<Spinner variant="fullscreen" />);
    loadingText = screen.queryByText('Loading...');
    expect(loadingText).toBeNull();
    expect(getByRole('status')).toHaveClass('spinner');
    expect(getByRole('status')).not.toHaveClass('spinner-small');
  });
});

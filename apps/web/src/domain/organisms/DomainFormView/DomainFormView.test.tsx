import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DomainFormView, { type DomainFormData } from './DomainFormView';

describe('DomainFormView', () => {
  const defaultValues: DomainFormData = { domain: 'example.com' };
  const onSubmit = jest.fn();

  it('renders the form with default value', () => {
    render(<DomainFormView defaultValues={defaultValues} onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/domain/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('shows validation error for empty domain', async () => {
    render(<DomainFormView defaultValues={{ domain: '' }} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/domain/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => {
      expect(screen.getByText(/domain is required/i)).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for invalid domain', async () => {
    render(<DomainFormView defaultValues={{ domain: '' }} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/domain/i), {
      target: { value: 'invalid_domain' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid domain name/i),
      ).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid domain', async () => {
    render(<DomainFormView defaultValues={{ domain: '' }} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/domain/i), {
      target: { value: 'test.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('disables button when isSubmitting is true', () => {
    render(
      <DomainFormView
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isSubmitting={true}
      />,
    );
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });
});

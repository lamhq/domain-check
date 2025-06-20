import { render, screen } from '@testing-library/react';
import StatusIcon from './StatusIcon';

describe('StatusIcon', () => {
  it('renders HourglassTopTwoToneIcon for pending', () => {
    render(<StatusIcon status="pending" />);
    // The icon should have a title or accessible name containing 'Hourglass' or use role 'img'
    // MUI icons default to role 'img' and aria-label from the icon name
    expect(screen.getByTestId('HourglassTopTwoToneIcon')).toBeInTheDocument();
  });

  it('renders VerifiedTwoToneIcon for passed', () => {
    render(<StatusIcon status="passed" />);
    expect(screen.getByTestId('VerifiedTwoToneIcon')).toBeInTheDocument();
  });

  it('renders CancelTwoToneIcon for failed', () => {
    render(<StatusIcon status="failed" />);
    expect(screen.getByTestId('CancelTwoToneIcon')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('Portal Component', () => {
  test('renders the logo', () => {
    render(<Portal tabs={[]} auth={{ getUser: () => ({}) }} logout={() => {}} />);
    const logoElement = screen.getByAltText(/Bridge Financial logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  // Additional tests here
});

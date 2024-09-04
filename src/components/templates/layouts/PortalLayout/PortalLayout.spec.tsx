import { render } from '@testing-library/react';
import Portal from './PortalLayout.component';

describe('Portal Component', () => {
  test('renders the logo', () => {
    const { getByAltText } = render(<Portal tabs={[]} user={{ 
      firstName: "Landon",
      lastName: "Johnson",
      email: "myemail@gmail.com"
     }} logout={() => {}} />);
    const logoElement = getByAltText(/Bridge Financial logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  // Additional tests here
});
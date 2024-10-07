import { render } from "@testing-library/react";
import Portal from "./PortalLayout.component";

describe("Portal Component", () => {
  test("renders the logo", () => {
    const { getByAltText } = render(<Portal tabs={[]} />);
    const logoElement = getByAltText(/Bridge Financial logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  // Additional tests here
});

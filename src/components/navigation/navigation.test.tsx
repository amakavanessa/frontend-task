import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import NavigationComponent from "./navigation";

// Mocking the fetch function
// jest.mock('node-fetch');

describe("Navigation", () => {
  test("renders navigation component correctly", () => {
    render(<NavigationComponent />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    const navLogo = screen.getByAltText("mainstack-logo");
    expect(navLogo).toBeInTheDocument();

    const navLogoSmall = screen.getByAltText("mainstack-logo-small");
    expect(navLogoSmall).toBeInTheDocument();

    const navHome = screen.getByText(/home/i);
    expect(navHome).toBeInTheDocument();

    const navAnalytics = screen.getByText(/analytics/i);
    expect(navAnalytics).toBeInTheDocument();

    const navRevenue = screen.getByText(/revenue/i);
    expect(navRevenue).toBeInTheDocument();

    const navCRM = screen.getByText(/crm/i);
    expect(navCRM).toBeInTheDocument();

    const navApps = screen.getByText(/apps/i);
    expect(navApps).toBeInTheDocument();

    const navPanel = screen.getByTestId("nav-panel");
    expect(navPanel).toBeInTheDocument();
  });

  test("does not render navigation modals", () => {
    render(<NavigationComponent />);
    const navAppModal = screen.queryByTestId("nav-app-modal");
    expect(navAppModal).not.toBeInTheDocument();

    const navMenuModal = screen.queryByTestId("nav-menu-modal");
    expect(navMenuModal).not.toBeInTheDocument();
  });

  test("modals display after click", async () => {
    render(<NavigationComponent />);
    const navAppTrigger = screen.getByTestId("nav-app-trigger");

    await userEvent.click(navAppTrigger);
    const navApps = screen.getByTestId("nav-app-modal");
    expect(navApps).toBeInTheDocument();
    const navMenu = screen.queryByTestId("nav-menu-modal");
    expect(navMenu).not.toBeInTheDocument();

    const navMenuTrigger = screen.getByTestId("nav-menu-trigger");
    expect(navMenuTrigger).toBeInTheDocument();
    await userEvent.click(navMenuTrigger);
    const navMenuModal = screen.getByTestId("nav-menu-modal");
    expect(navMenuModal).toBeInTheDocument();

    const navAppModal = screen.queryByTestId("nav-app-modal");
    expect(navAppModal).not.toBeInTheDocument();
  });
});

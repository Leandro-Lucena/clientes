import { render, screen, fireEvent } from "@testing-library/react";
import UserMenu from "./UserMenu";
import { ColorModeContext } from "../../../theme/ColorModeContext";
import { MemoryRouter } from "react-router-dom";
import { logout } from "../../../services/authService";

jest.mock("../../../services/authService", () => ({
  logout: jest.fn(),
}));

const renderWithProviders = () => {
  const toggleColorMode = jest.fn();
  const mode = "light";

  render(
    <MemoryRouter>
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <UserMenu />
      </ColorModeContext.Provider>
    </MemoryRouter>
  );

  return { toggleColorMode };
};

describe("UserMenu", () => {
  it("Deve abrir o menu ao clicar no avatar e chamar logout ao clicar em 'Sair'", () => {
    const { toggleColorMode } = renderWithProviders();
    console.log(toggleColorMode);

    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    expect(screen.getByText("Sair")).toBeInTheDocument();
    expect(screen.getByText("Tema")).toBeInTheDocument();

    const logoutButton = screen.getByText("Sair");
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalled();
  });
});

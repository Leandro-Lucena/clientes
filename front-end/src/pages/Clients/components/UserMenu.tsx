import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useContext, useState } from "react";
import { ThemeSwitch } from "../../../components/ThemeSwitch";
import { ColorModeContext } from "../../../theme/ColorModeContext";
import { logout } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <IconButton
        onClick={handleMenuOpen}
        size="medium"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar alt="Admin" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          Tema
          <ThemeSwitch checked={mode === "dark"} onChange={toggleColorMode} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Stack>
  );
}

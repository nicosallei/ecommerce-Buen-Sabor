import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Buen Sabor
        </Typography>
        <Button color="inherit" onClick={() => handleNavigation("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => handleNavigation("/productos")}>
          Productos
        </Button>
        <Button
          color="inherit"
          onClick={() => handleNavigation("/promociones")}
        >
          Promociones
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

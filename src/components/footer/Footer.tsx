import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "static",
        textAlign: "center",
        padding: 0,
        height: "64px",
        backgroundColor: "primary.main",
        color: "white",
        display: "flex", // Añade flexbox
        alignItems: "center", // Centra verticalmente
        justifyContent: "center", // Centra horizontalmente
      }}
    >
      <Typography variant="body1">
        © 2024 Mi E-Commerce. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;

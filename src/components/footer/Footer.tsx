import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        padding: 2,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="body1">
        © 2024 Mi E-Commerce. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;

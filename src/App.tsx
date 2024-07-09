import React from "react";
import { Box } from "@mui/material";
import Rutas from "./Routes/Rutas";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Rutas />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;

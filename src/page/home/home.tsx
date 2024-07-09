import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
// Import the ContactSection component

const Home: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="https://plus.unsplash.com/premium_photo-1713793236003-bf10d934825e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Comida Rápida"
              style={{ width: "100%", height: "auto", borderRadius: "1rem" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: isMobile ? "1.85rem" : "3rem",
                fontWeight: "semibold",
              }}
            >
              Buen Sabor: Donde cada bocado es una delicia.
            </Typography>
            <Typography variant="body1" paragraph>
              Únete a nosotros y descubre por qué en 'El Buen Sabor', cada
              comida es una experiencia memorable.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ my: 4 }}></Box>

      <Box sx={{ my: 4 }}></Box>

      <Box sx={{ my: 7 }}></Box>

      <Box sx={{ my: 4 }}>
        <Divider />
      </Box>

      <Container sx={{ my: 4 }}></Container>

      <Container sx={{ my: 4 }}></Container>
    </div>
  );
};

export default Home;

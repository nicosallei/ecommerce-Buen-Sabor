// LoadingComponent.tsx
import { Box, Typography } from "@mui/material";

const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <Typography variant="h4">Cargando...</Typography>
  </Box>
);

export default LoadingComponent;

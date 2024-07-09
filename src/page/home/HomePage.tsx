import imagenFondo from "../../assets/img/restaurante.jpg";
import imagenProducto from "../../assets/img/producto.jpg";
import imagenPromocion from "../../assets/img/promociones.png";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Card
            sx={{
              width: 345, // Ajusta el ancho de la tarjeta
              height: 200, // Ajusta la altura de la tarjeta
              cursor: "pointer",
              backgroundImage: `url(${imagenProducto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}
            onClick={() => handleNavigation("/productos")}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Productos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              width: 345, // Asegura que ambas tarjetas tengan el mismo tamaño
              height: 200, // Ajusta la altura de la tarjeta
              cursor: "pointer",
              backgroundImage: `url(${imagenPromocion})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}
            onClick={() => handleNavigation("/promociones")}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Promociones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HomePage;

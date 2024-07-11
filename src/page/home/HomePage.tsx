import imagenFondo from "../../assets/img/restaurante.jpg";
import imagenProducto from "../../assets/img/producto.jpg";
import imagenPromocion from "../../assets/img/promociones.png";
import { Card, CardContent, Typography, Grid, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import carrusel1 from "../../assets/imgCarrusel/carrusel1.jpg";
import carrusel2 from "../../assets/imgCarrusel/carrusel2.jpg";
import carrusel3 from "../../assets/imgCarrusel/carrusel3.jpg";
import carrusel4 from "../../assets/imgCarrusel/carrusel4.jpeg";
import carrusel5 from "../../assets/imgCarrusel/carrusel5.jpg";
import carrusel6 from "../../assets/imgCarrusel/carrusel6.jpg";
import carrusel7 from "../../assets/imgCarrusel/carrusel7.jpg";
import carrusel8 from "../../assets/imgCarrusel/carrusel8.jpg";
import carrusel9 from "../../assets/imgCarrusel/carrusel9.jpg";

interface GroupItemProps {
  group: {
    imgPath: string;
    label: string;
  }[];
}
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const items = [
    {
      imgPath: carrusel1,
      label: "Producto 1",
    },
    {
      imgPath: carrusel2,
      label: "Producto 2",
    },
    {
      imgPath: carrusel3,
      label: "Producto 3",
    },
    {
      imgPath: carrusel4,
      label: "Producto 4",
    },
    {
      imgPath: carrusel5,
      label: "Producto 5",
    },
    {
      imgPath: carrusel6,
      label: "Producto 6",
    },
    {
      imgPath: carrusel7,
      label: "Producto 7",
    },
    {
      imgPath: carrusel8,
      label: "Producto 8",
    },
    {
      imgPath: carrusel9,
      label: "Producto 9",
    },
  ];
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 3) {
    groupedItems.push(items.slice(i, i + 3));
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Cambiado a flex-start para alinear los elementos al principio
        alignItems: "center",
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backgroundBlendMode: "overlay",
        overflow: "hidden",
        paddingTop: "20px", // Añade un padding en la parte superior para empujar todo hacia abajo
      }}
    >
      <Carousel
        fullHeightHover={false}
        sx={{
          width: "100%", // Asegura que el carrusel ocupe todo el ancho disponible
          marginBottom: "150px",
        }}
      >
        {groupedItems.map((group, i) => (
          <GroupItem key={i} group={group} />
        ))}
      </Carousel>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Card
            sx={{
              width: 400,
              height: 200,
              cursor: "pointer",
              backgroundImage: `url(${imagenProducto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.8)", // Sombra blanca transparente
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Sombra más oscura al pasar el mouse
              },
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
              width: 400,
              height: 200,
              cursor: "pointer",
              backgroundImage: `url(${imagenPromocion})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.8)", // Sombra blanca transparente
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)", // Sombra más oscura al pasar el mouse
              },
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

const GroupItem = ({ group }: GroupItemProps) => {
  return (
    <Grid container spacing={2}>
      {group.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper
            elevation={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Fondo semi-transparente
              overflow: "hidden", // Asegura que la imagen no se desborde del contenedor
            }}
          >
            <img
              src={item.imgPath}
              alt={item.label}
              style={{
                width: "100%", // Ajusta el ancho al 100% del contenedor para llenar el espacio
                height: "auto", // Mantiene la proporción de la imagen
                opacity: 0.8, // Hace la imagen ligeramente transparente
              }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;

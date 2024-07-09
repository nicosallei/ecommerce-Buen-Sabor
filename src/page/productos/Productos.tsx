import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { fetchCategories } from "../../service/CategoriaService";

import Categoria from "../../types/ICategoria";

const Productos: React.FC = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleCardClick = (categoryId: number) => {
    // Función para manejar el clic en la tarjeta
    navigate(`/categoria/${categoryId}`); // Navega a la vista de la categoría
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/path/to/your/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category.id}>
            <Card
              sx={{
                width: 345, // Ajusta el ancho de la tarjeta
                height: 200, // Ajusta la altura de la tarjeta
                cursor: "pointer",
                backgroundImage: `url(${
                  category.image || "/path/to/default-image.jpg"
                })`, // Usa imagen de categoría o una por defecto
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleCardClick(category.id)} // Agrega el manejador de clic
            >
              <CardContent
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
                  color: "white", // Texto blanco para mejorar la legibilidad
                  height: "100%", // Asegura que el contenido cubra toda la altura de la tarjeta
                  display: "flex", // Usa flexbox para centrar el contenido
                  flexDirection: "column", // Orientación vertical del flexbox
                  justifyContent: "center", // Centra el contenido verticalmente
                  alignItems: "center", // Centra el contenido horizontalmente
                }}
              >
                <Typography variant="h5" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Productos;

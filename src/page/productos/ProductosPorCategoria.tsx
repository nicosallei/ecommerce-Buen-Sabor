import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getProductosPorCategoria } from "../../service/ProductosService"; // Asume una función de servicio para cargar productos

import Producto from "../../types/IProducto"; // Asume un tipo para tus productos

const ProductosPorCategoria: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Obtiene el ID de la categoría
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductos = async () => {
      try {
        if (!categoryId) {
          setError("Category ID is required");
          setLoading(false);
          return;
        }
        const data = await getProductosPorCategoria(parseInt(categoryId)); // Usa el ID de la categoría
        setProductos(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    getProductos();
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Grid container spacing={4} justifyContent="center">
      {productos.map((producto) => (
        <Grid item key={producto.id}>
          <Card sx={{ width: 345, height: 200 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {producto.name}
              </Typography>
              {/* Agrega más detalles del producto como desees */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductosPorCategoria;

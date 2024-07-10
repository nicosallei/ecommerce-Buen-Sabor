import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Pagination,
  Box,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getProductosPorCategoria } from "../../service/ProductosService";
import Producto from "../../types/IProducto";
import DetalleProducto from "./DetalleProducto";
import ImagenMenu from "../../assets/img/MenuProductos.jpg";

const ProductosPorCategoria: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6; // Número de productos por página

  useEffect(() => {
    const getProductos = async () => {
      try {
        if (!categoryId) {
          setError("Category ID is required");
          setLoading(false);
          return;
        }
        const data = await getProductosPorCategoria(parseInt(categoryId));
        setProductos(data);
        setFilteredProductos(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    getProductos();
  }, [categoryId]);

  useEffect(() => {
    const filtered = productos.filter((producto) =>
      producto.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(filtered);
    setCurrentPage(1);
  }, [searchTerm, productos]);

  const handleOpenModal = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = filteredProductos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${ImagenMenu})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "64px", // Ajusta este valor según la altura de tu cabecera
      }}
    >
      <Container maxWidth="lg">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar Producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { background: "rgba(255, 255, 255, 0.8)" }, // Fondo blanco transparente
          }}
          sx={{ marginBottom: 2 }}
        />
      </Container>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        style={{ margin: "0 auto", maxWidth: "1200px" }} // Ajusta el ancho máximo según tu diseño
      >
        {selectedProducts.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Efecto de sombra
                margin: "0 auto", // Centrado horizontal en el contenedor
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  producto.imagenes.length > 0
                    ? "http://localhost:8080/images/" + producto.imagenes[0].url
                    : "http://localhost:8080/images/sin-imagen.jpg"
                }
                alt={producto.denominacion}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {producto.denominacion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {producto.descripcion}
                </Typography>
                <Typography variant="h6">${producto.precioVenta}</Typography>
                <Button onClick={() => handleOpenModal(producto)}>
                  Detalle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {productoSeleccionado && (
          <DetalleProducto
            producto={productoSeleccionado}
            onClose={() => setProductoSeleccionado(null)}
          />
        )}
      </Grid>
      <Box
        mt={4}
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Pagination
          count={Math.ceil(filteredProductos.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductosPorCategoria;

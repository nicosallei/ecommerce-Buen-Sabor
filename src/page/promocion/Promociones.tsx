import React, { useEffect, useState } from "react";
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
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImagenMenu from "../../assets/img/MenuProductos.jpg";
import SinImagen from "../../assets/img/sin-imagen.jpg";
import { getPromocionesActivas } from "../../service/PromocionService"; // Ajusta la importación según tu servicio de promociones
import Promocion from "../../types/IPromocion"; // Ajusta el tipo de datos según tu modelo de promoción

const Promociones: React.FC = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [filteredPromociones, setFilteredPromociones] = useState<Promocion[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promocionSeleccionada, setPromocionSeleccionada] =
    useState<Promocion | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal
  const itemsPerPage = 6; // Número de promociones por página

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const data = await getPromocionesActivas(); // Utiliza tu función para obtener promociones
        // Ajusta las URLs de las imágenes en el JSON
        const promocionesConURL = data.map((promocion: any) => ({
          ...promocion,
          imagen: promocion.imagen
            ? `http://localhost:8080/images/${promocion.imagen
                .split("\\")
                .pop()}`
            : SinImagen, // Si no hay imagen, usar imagen por defecto
        }));
        setPromociones(promocionesConURL);
        setFilteredPromociones(promocionesConURL);
        setLoading(false);
      } catch (error) {
        setError("Error fetching promotions");
        setLoading(false);
      }
    };

    fetchPromociones();
  }, []);

  useEffect(() => {
    const filtered = promociones.filter((promocion) =>
      promocion.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPromociones(filtered);
    setCurrentPage(1);
  }, [searchTerm, promociones]);

  const handleOpenModal = (promocion: Promocion) => {
    setPromocionSeleccionada(promocion);
    setModalOpen(true); // Abrir el modal al seleccionar una promoción
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPromociones = filteredPromociones.slice(
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
          placeholder="Buscar Promoción"
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
        {selectedPromociones.map((promocion) => (
          <Grid item key={promocion.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Efecto de sombra
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={promocion.imagen || SinImagen} // Mostrar la imagen por defecto si no hay imagen definida
                alt={promocion.denominacion}
                sx={{ objectFit: "cover", maxHeight: 180 }}
              />
              <CardContent
                sx={{
                  padding: "8px",
                  "&:last-child": { paddingBottom: "8px" },
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ minHeight: 40, marginBottom: "4px" }}
                >
                  {promocion.denominacion}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "4px" }}
                >
                  {promocion.descripcionDescuento}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                  ${promocion.precioPromocional}
                </Typography>
                <Button onClick={() => handleOpenModal(promocion)} size="small">
                  Detalle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        mt={4}
        width="100%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Pagination
          count={Math.ceil(filteredPromociones.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Modal de Detalle de Promoción */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {promocionSeleccionada && (
            <>
              <Avatar
                alt="Imagen de la Promoción"
                src={
                  promocionSeleccionada.imagen ||
                  "http://localhost:8080/images/imagen_por_defecto.jpg"
                }
                style={{ width: 128, height: 128, margin: "auto" }} // Ajusta el tamaño y la posición según necesites
              />
              <Typography variant="h6" id="modal-title" gutterBottom>
                {promocionSeleccionada.denominacion}
              </Typography>
              <Typography variant="body2" id="modal-description">
                <br />
                <strong>Descripción:</strong>{" "}
                {promocionSeleccionada.descripcionDescuento}
                <br />
                <span style={{ color: "green", fontSize: "1.1rem" }}>
                  <strong>Precio:</strong> $
                  {promocionSeleccionada.precioPromocional}
                </span>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Productos:
              </Typography>
              <List>
                {promocionSeleccionada.promocionDetallesDto.map(
                  (detalle: any, index: any) => {
                    // Función para procesar la URL de la imagen
                    const procesarUrlImagen = (url: any) => {
                      if (!url) {
                        // Proporciona la URL de una imagen por defecto
                        return "http://localhost:8080/images/imagen_por_defecto.jpg";
                      }
                      return `http://localhost:8080/images/${url
                        .split("\\")
                        .pop()}`;
                    };

                    return (
                      <ListItem key={index} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Artículo"
                            src={procesarUrlImagen(
                              detalle.articuloManufacturadoDto.imagenes[0]?.url
                            )}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            detalle.articuloManufacturadoDto.denominacion
                          }
                          secondary={`Cantidad: ${detalle.cantidad}`}
                        />
                      </ListItem>
                    );
                  }
                )}
              </List>
            </>
          )}
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Promociones;

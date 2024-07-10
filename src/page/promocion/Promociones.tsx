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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImagenMenu from "../../assets/img/MenuProductos.jpg";
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
          imagen: `http://localhost:8080/images/${promocion.imagen
            .split("\\")
            .pop()}`,
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
                maxWidth: 345,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Efecto de sombra
                margin: "0 auto", // Centrado horizontal en el contenedor
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={promocion.imagen} // Ajusta la lógica para la imagen según tu JSON
                alt={promocion.denominacion}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {promocion.denominacion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {promocion.descripcionDescuento}
                </Typography>
                <Typography variant="h6">
                  ${promocion.precioPromocional}
                </Typography>
                <Button onClick={() => handleOpenModal(promocion)}>
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
              <Typography variant="h6" id="modal-title" gutterBottom>
                Detalle de Promoción
              </Typography>
              <Typography variant="body2" id="modal-description">
                <strong>Nombre:</strong> {promocionSeleccionada.denominacion}
                <br />
                <strong>Descripción:</strong>{" "}
                {promocionSeleccionada.descripcionDescuento}
                <br />
                <strong>Precio Promocional:</strong> $
                {promocionSeleccionada.precioPromocional}
              </Typography>
            </>
          )}
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Promociones;

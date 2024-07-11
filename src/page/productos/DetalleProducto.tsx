import React from "react";
import { Modal, Box, Typography, Button, CardMedia } from "@mui/material";

interface DetalleProductoProps {
  producto: any;
  onClose: () => void;
}

const DetalleProducto: React.FC<DetalleProductoProps> = ({
  producto,
  onClose,
}) => {
  if (!producto) {
    return <div>Cargando...</div>;
  }

  // URL de imagen por defecto
  const imagenPorDefecto =
    import.meta.env.VITE_API_URL + "/images/sin-imagen.jpg";
  // Determina la imagen a mostrar
  const imagenAMostrar =
    producto.imagenes && producto.imagenes.length > 0
      ? import.meta.env.VITE_API_URL + "/images/" + producto.imagenes[0].url
      : imagenPorDefecto;

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Ancho del modal ajustado
          maxWidth: 400, // Ancho máximo del modal
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "90%", // Altura máxima del modal ajustada
          overflowY: "auto", // Habilita el desplazamiento vertical si el contenido excede el tamaño del modal
        }}
      >
        <CardMedia
          component="img"
          image={imagenAMostrar}
          alt="Imagen del producto"
          sx={{
            maxHeight: 300,
            width: "100%",
            objectFit: "contain",
            marginBottom: 2,
          }} // Ajusta el estilo de la imagen según sea necesario
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center", // Centra el texto
            fontWeight: "bold", // Opcional: hace el texto más grueso para darle énfasis
            marginBottom: 2, // Agrega un margen inferior para separarlo del contenido siguiente
          }}
        >
          {producto.denominacion}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "green", // Cambia el color del texto a verde
            fontSize: "1.25rem", // Aumenta el tamaño del texto
          }}
        >
          Precio: ${producto.precioVenta}
        </Typography>
        <Typography variant="body1">
          Tiempo de preparacion: {producto.tiempoEstimadoMinutos} minutos
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Descripcion: {producto.descripcion}
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            sx={{
              bgcolor: "primary.main", // Color de fondo primario
              color: "white", // Color del texto
              ":hover": {
                bgcolor: "primary.dark", // Color de fondo al pasar el cursor
              },
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetalleProducto;

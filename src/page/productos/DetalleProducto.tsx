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
  const imagenPorDefecto = "http://localhost:8080/images/sin-imagen.jpg";
  // Determina la imagen a mostrar
  const imagenAMostrar =
    producto.imagenes && producto.imagenes.length > 0
      ? "http://localhost:8080/images/" + producto.imagenes[0].url
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {producto.denominacion}
        </Typography>
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {producto.descripcion}
        </Typography>
        <Typography variant="body1">Código: {producto.codigo}</Typography>
        <Typography variant="body1">
          Precio de venta: {producto.precioVenta}
        </Typography>
        <Typography variant="body1">
          Categoría: {producto.categoriaId}
        </Typography>
        <Typography variant="body1">Sucursal: {producto.sucursalId}</Typography>
        {/* Aquí puedes agregar más detalles del producto según sea necesario */}
        <Box sx={{ mt: 2 }}>
          <Button onClick={onClose}>Cerrar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetalleProducto;

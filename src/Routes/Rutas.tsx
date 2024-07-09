import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../page/home/HomePage";
import Productos from "../page/productos/Productos";
import Promociones from "../page/promocion/Promociones";
import ProductosPorCategoria from "../page/productos/ProductosPorCategoria"; // Importa el nuevo componente

const Rutas: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/promociones" element={<Promociones />} />
      <Route
        path="/categoria/:categoryId"
        element={<ProductosPorCategoria />}
      />{" "}
      {/* Nueva ruta */}
    </Routes>
  );
};

export default Rutas;

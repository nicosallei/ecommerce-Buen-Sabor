export const getPromocionesActivas = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/local/promocion/activas`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

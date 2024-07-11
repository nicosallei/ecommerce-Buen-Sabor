export const getPromocionesActivas = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/local/promocion/activas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
    if (!response.ok) {
      // Actualizado para reflejar el propósito real de la función
      throw new Error("Error al obtener las promociones activas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Considera devolver algo más específico para la UI, como un objeto de error
    return null;
  }
};

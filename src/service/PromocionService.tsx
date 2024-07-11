export const getPromocionesActivas = async () => {
  try {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/local/promocion/activas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
      }
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

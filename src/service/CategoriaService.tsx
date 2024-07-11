export const fetchCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categorias/traer-categoria-padre`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching categories");
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categorias/traer-categoria-padre`
  );
  if (!response.ok) {
    throw new Error("Error fetching categories");
  }
  return response.json();
};

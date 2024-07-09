export const fetchCategories = async () => {
  const response = await fetch(
    "http://localhost:8080/api/categorias/traer-categoria-padre"
  );
  if (!response.ok) {
    throw new Error("Error fetching categories");
  }
  return response.json();
};

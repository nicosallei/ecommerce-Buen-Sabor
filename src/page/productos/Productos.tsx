import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchCategories } from "../../service/CategoriaService";
import ImagenCategoria from "../../assets/img/categorias.jpg";
import Categoria from "../../types/ICategoria";

const Productos: React.FC = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setFilteredCategories(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, categories]);

  const handleCardClick = (categoryId: number) => {
    navigate(`/categoria/${categoryId}`);
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${ImagenCategoria})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backgroundBlendMode: "overlay",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: 4,
          padding: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 1,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar Categoría"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {selectedCategories.map((category) => (
          <Grid item key={category.id}>
            <Card
              sx={{
                width: 345,
                height: 200,
                cursor: "pointer",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
                  category.image ||
                  "http://localhost:8080/images/sin-imagen.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => handleCardClick(category.id)}
            >
              <CardContent
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {category.denominacion}
                </Typography>
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
          count={Math.ceil(filteredCategories.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Productos;

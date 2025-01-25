import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"; // Import Grid

import ProductGridCard from "./ProductGridCard";
import { Product } from "../../app/models/product";
import ProductGridSkeleton from "./ProductGridSkeleton";

// ----------------------------------------------------------------------

interface Props {
  products: Product[];
}

export default function ProductsList({ products }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoading = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    fakeLoading();
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2 }}
      />

      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <Stack
          spacing={5}
          divider={<Divider sx={{ borderStyle: "dashed" }} />}
        />

        {/* Grid Wrapper */}
        <Grid container spacing={4} justifyContent="center">
          <Box
            sx={{
              display: "grid",
              justifyContent: "center", // This centers the grid on all screen sizes
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)", // 1 column on mobile
                sm: "repeat(1, 1fr)", // 1 column on small devices
                md: "repeat(3, 1fr)", // 2 columns on medium devices
              },
              gap: 3, // Spacing between products
              width: "100%",
              pl: { xs: 8, sm: 8, md: 6 },
              maxWidth: "1200px", // Limit max width for large screens
              margin: "0 auto", // Center horizontally
            }}
          >
            {loading ? (
              // Skeleton Loader
              [...Array(16)].map((_, index) => (
                <ProductGridSkeleton key={index} />
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductGridCard key={product.id} product={product} />
              ))
            ) : (
              <Typography variant="h6" align="center">
                No products available
              </Typography>
            )}
          </Box>
        </Grid>
      </Stack>
    </Container>
  );
}

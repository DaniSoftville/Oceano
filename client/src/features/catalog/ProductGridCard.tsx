import { Box, Fab, Stack } from "@mui/material";
import Iconify from "../../app/components/iconify";
import TextMaxLine from "../../app/components/text-max-line";
import Image from "../../app/components/image";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import RouterLink from "../../app/components/router/RouterLink";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductGridCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Stack
      sx={{
        position: "relative",
        "&:hover .add-to-cart": {
          opacity: 1,
        },
      }}
    >
      {product.genre === "Femenino" && (
        <Box
          color="info"
          sx={{ position: "absolute", m: 1, top: 0, right: 0, zIndex: 9 }}
        >
          NEW
        </Box>
      )}

      <Box sx={{ position: "relative", mb: 2 }}>
        <Fab
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: "absolute",
            transition: (theme) =>
              theme.transitions.create("opacity", {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
          disabled={status.includes("pendingAddItem" + product.id)} // Use includes safely
        >
          {status.includes("pendingAddItem" + product.id) ? (
            <Iconify icon="eos-icons:loading" /> // Show loading spinner
          ) : (
            <Iconify
              icon="carbon:shopping-cart-plus"
              onClick={() =>
                dispatch(addBasketItemAsync({ productId: product.id }))
              }
            />
          )}
        </Fab>

        <Image
          src={product.pictureUrl}
          sx={{
            flexShrink: 0,
            borderRadius: 4,
            backgroundColor: "lightgray",
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: "text.disabled" }}>
          {product.type}
        </TextMaxLine>

        <RouterLink
          to={`/catalog/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <TextMaxLine
            variant="body2"
            line={1}
            sx={{ fontWeight: "fontWeightMedium" }}
          >
            {product.name}
          </TextMaxLine>
        </RouterLink>
      </Stack>
    </Stack>
  );
}

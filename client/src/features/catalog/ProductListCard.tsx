import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";

import { Product } from "../../app/models/product";
import Label from "../../app/components/label";
import Iconify from "../../app/components/iconify";
import { Stack } from "@mui/material";
import TextMaxLine from "../../app/components/text-max-line";
import Image from "../../../src/app/components/image";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
// ----------------------------------------------------------------------

interface Props {
  product: Product;
}

export default function EcommerceProductViewListItem({
  product,
  ...other
}: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  return (
    <Stack
      direction="row"
      sx={{
        position: "relative",
        "&:hover .add-to-cart": {
          opacity: 1,
        },
      }}
      {...other}
    >
      {product.genre === "femenino" && (
        <Label
          color="info"
          sx={{ position: "absolute", m: 1, top: 0, left: 0, zIndex: 9 }}
        >
          Femenino
        </Label>
      )}

      {product.type === "sale" && (
        <Label
          color="error"
          sx={{ position: "absolute", m: 1, top: 0, left: 0, zIndex: 9 }}
        >
          Tipo
        </Label>
      )}

      <Fab
        className="add-to-cart"
        color="primary"
        size="small"
        sx={{
          right: 8,
          zIndex: 9,
          top: 8,
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
          mr: 2,
          width: 160,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: "background.neutral",
        }}
      />

      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <TextMaxLine
            variant="caption"
            line={1}
            sx={{ color: "text.disabled" }}
          >
            {product.price}
          </TextMaxLine>

          <Link color="inherit">
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

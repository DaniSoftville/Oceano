import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Stack, { StackProps } from "@mui/material/Stack";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useResponsive } from "../../app/hooks/use-responsive";
import { useBoolean } from "../../app/hooks/use-boolean";
import Iconify from "../../app/components/iconify";
import { Button, debounce, TextField, Box } from "@mui/material";
import { useCallback, useState } from "react";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

const BRAND_OPTIONS = [
  { value: "Women", label: "Women" },
  { value: "Men", label: "Men" },
  { value: "Kids", label: "Kids" },
  { value: "Babies", label: "Babies" },
];

const TYPES_OPTIONS = [
  { value: "Hats", label: "Hats" },
  { value: "Gloves", label: "Gloves" },
  { value: "Boards", label: "Boards" },
  { value: "Boots", label: "Boots" },
];

const defaultValues = {
  orderBy: "",
  searchTerm: "",
  genres: [],
  types: [],
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function Filters({ open, onClose }: Props) {
  const mdUp = useResponsive("up", "md");
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const handleClearAll = useCallback(() => {
    // Reset productParams to default values
    dispatch(setProductParams(defaultValues));
  }, [dispatch]);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  // Get darkMode from Redux or local state
  const darkMode = useAppSelector((state) => state);

  const primaryColor = darkMode ? "#76b6c4" : "#76b6c4";
  const secondaryColor = darkMode ? "#9fcffb" : "#1da2d8";

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      {/* Search Field */}
      <TextField
        label="Search products"
        variant="outlined"
        fullWidth
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: primaryColor,
            },
            "&:hover fieldset": {
              borderColor: secondaryColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: secondaryColor,
            },
          },
        }}
      />

      {/* Sort Options */}
      <Block title="Order By">
        <Box
          sx={{
            "& .MuiRadio-root": {
              color: primaryColor,
            },
            "& .Mui-checked": {
              color: secondaryColor,
            },
          }}
        >
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Box>
      </Block>

      {/* Types Filter */}
      <Block title="Types">
        <Box
          sx={{
            "& .MuiRadio-root": {
              color: primaryColor,
            },
            "& .Mui-checked": {
              color: secondaryColor,
            },
          }}
        >
          <RadioButtonGroup
            selectedValue={productParams.types}
            options={TYPES_OPTIONS}
            onChange={(e) =>
              dispatch(setProductParams({ types: e.target.value }))
            }
          />
        </Box>
      </Block>

      {/* Genre Filter */}
      <Block title="Genre">
        <Box
          sx={{
            "& .MuiRadio-root": {
              color: primaryColor,
            },
            "& .Mui-checked": {
              color: secondaryColor,
            },
          }}
        >
          <RadioButtonGroup
            selectedValue={productParams.genres}
            options={BRAND_OPTIONS}
            onChange={(e) =>
              dispatch(setProductParams({ genres: e.target.value }))
            }
          />
        </Box>
      </Block>

      {/* Clear All Button */}
      <Button
        fullWidth
        size="large"
        variant="contained"
        startIcon={<Iconify icon="carbon:trash-can" />}
        onClick={handleClearAll}
        sx={{
          backgroundColor: primaryColor,
          color: "#fff",
          "&:hover": {
            backgroundColor: secondaryColor,
          },
        }}
      >
        Clear All
      </Button>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// Block Component
interface BlockProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

function Block({ title, children, ...other }: BlockProps) {
  const contentOpen = useBoolean(true);

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={contentOpen.onToggle}
        sx={{ width: 1, cursor: "pointer" }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={contentOpen.value ? "carbon:subtract" : "carbon:add"}
          sx={{ color: "text.secondary" }}
        />
      </Stack>

      <Collapse unmountOnExit in={contentOpen.value} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}

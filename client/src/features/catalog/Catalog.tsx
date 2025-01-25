/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  StackProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Iconify from "../../app/components/iconify";
import FilterBrand from "./FilterBrand";
import { useResponsive } from "../../app/hooks/use-responsive";
import { useBoolean } from "../../app/hooks/use-boolean";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import Filters from "./Filters";
import AppPagination from "../../app/components/AppPagination";

const VIEW_OPTIONS = [
  { value: "list", icon: <Iconify icon="carbon:list-boxes" /> },
  { value: "grid", icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "High" },
  { value: "price", label: "Low" },
];
export type IProductFiltersProps = {
  filterTag: string[];
  filterStock: boolean;
  filterBrand: string[];
  filterShipping: string[];
  filterCategories: string;
  filterRating: string | null;
  filterPrice: {
    start: number;
    end: number;
  };
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
};
export default function Catalog() {
  const mdUp = useResponsive("up", "md");
  const products = useAppSelector(productSelectors.selectAll);
  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("Alfhabetical");
  const {
    productsLoaded,
    filtersLoaded,
    types,
    genres,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const mobileOpen = useBoolean();
  type Props = {
    open: boolean;
    onClose: VoidFunction;
  };

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
    { value: "Hat", label: "Hats" },
    { value: "Gloves", label: "Gloves" },
    { value: "Board", label: "Boards" },
    { value: "Boots", label: "Boots" },
  ];
  const defaultValues = {
    filterBrand: [BRAND_OPTIONS[1]],
    filterCategories: "",
    filterRating: null,
    filterStock: false,
    filterShipping: [],
    filterTag: [],
    filterPrice: {
      start: 0,
      end: 0,
    },
  };

  /*   const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item]; */

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  /*  const handleChangeViewMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
      if (newAlignment !== null) {
        setViewMode(newAlignment);
      }
    },
    []
  );

  const handleChangeSort = useCallback((event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  }, []);
  const [filters, setFilters] = useState<IProductFiltersProps>(defaultValues);
  const handleChangeBrand = useCallback(
    (name: string) => {
      setFilters({
        ...filters,
        filterBrand: getSelected(filters.filterBrand, name),
      });
    },
    [filters]
  ); */
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  return (
    <>
      <Container>
        <Grid container columnSpacing={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center" // Center horizontally
            sx={{
              py: 5,
              pl: 4,
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon="carbon:filter" width={18} />}
              onClick={mobileOpen.onTrue}
              sx={{
                px: 4,
                ml: 2,
                display: { md: "none" }, // Hide on medium and larger screens
              }}
            >
              Filters
            </Button>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} mb={5}>
            <Filters open={mobileOpen.value} onClose={mobileOpen.onFalse} />

            <Box
              sx={{
                flexGrow: 1,
                pl: { md: 8 },
                width: { md: `calc(100% - ${280}px)` },
              }}
            >
              <ProductList products={products} />
            </Box>
          </Stack>
        </Grid>
        <Divider />

        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Container>
    </>
  );
}

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

{
  /* <Grid container spacing={4}>
  <Grid item xs={3}>
    <Paper sx={{ mb: 2 }}>
      <ProductSearch />
    </Paper>
    <Paper sx={{ p: 2, mb: 2 }}>
      <RadioButtonGroup
        selectedValue={productParams.orderBy}
        options={sortOptions}
        onChange={(e) =>
          dispatch(setProductParams({ orderBy: e.target.value }))
        }
      />
    </Paper>
    <Paper sx={{ p: 2, mb: 2 }}>
      <RadioButtonGroup
        selectedValue={productParams.types}
        options={TYPES_OPTIONS}
        onChange={(e) =>
          dispatch(setProductParams({ types: e.target.value }))
        }
      />
    </Paper>
    <Paper sx={{ mb: 2, p: 2, mt: 1 }}>
      <RadioButtonGroup
        selectedValue={productParams.genres}
        options={BRAND_OPTIONS}
        onChange={(e) =>
          dispatch(setProductParams({ genres: e.target.value }))
        }
      />
    </Paper>
  </Grid>
  <Grid item xs={9}>
    <ProductList products={products} />
  </Grid>
  <Grid item xs={3} />
  <Grid item xs={9}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography>Displaying 1-6 of 20 items</Typography>
    </Box>
  </Grid>
</Grid> */
}

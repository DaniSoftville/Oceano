import {
  Box,
  Typography,
  Pagination,
  paginationClasses,
  Stack,
} from "@mui/material";
import { MetaData } from "../models/pagination";
import { useState } from "react";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);
  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }
  return (
    <Box
      display="flex"
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically
      sx={{
        height: "20vh", // Full height for vertical centering
      }}
    >
      <Stack
        justifyContent="center" // Center items within the stack
        alignItems="center" // Center items horizontally within the stack
        spacing={2} // Add space between items
      >
        <Typography variant="body1">
          Displaying {(currentPage - 1) * pageSize + 1}-
          {currentPage * pageSize > totalCount!
            ? totalCount
            : currentPage * pageSize}{" "}
          of {totalCount} results
        </Typography>
        <Pagination
          size="large"
          count={totalPages}
          page={pageNumber}
          onChange={(_e, page) => handlePageChange(page)}
          sx={{
            mt: 2,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: "center", // Center pagination
            },
            [`& .MuiPaginationItem-root`]: {
              color: "#1da2d8", // Sea blue color for the text
              borderColor: "#006994", // Sea blue for border (if applicable)
            },
            [`& .MuiPaginationItem-root.Mui-selected`]: {
              backgroundColor: "#064273", // Sea blue background for selected
              color: "#fff", // White text for selected
            },
          }}
        />
      </Stack>
    </Box>
  );
}

import { Box, Pagination } from "@mui/material";
import { PaginationColor } from "./types";

export interface PaginationBasicProps {
  page: number;
  handlePageChange: (e: any, value: number) => void;
  countTotalPage: number;
  color: PaginationColor;
}

const PaginationComponent = ({
  page,
  handlePageChange,
  countTotalPage,
  color,
}: PaginationBasicProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        py: 1,
      }}
    >
      {" "}
      <Pagination
        page={page}
        onChange={handlePageChange}
        count={countTotalPage}
        color={color}
        className="w-full"
      />
    </Box>
  );
};

export default PaginationComponent;

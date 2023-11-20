import { TextField, debounce } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debounceSearch = debounce((event: any) => {
    dispatch(
      setProductParams({ searchTerm: event.target.value, pageNumber: 1 })
    );
  }, 1000);

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debounceSearch(event);
      }}
      value={searchTerm || ""}
    />
  );
};

export default ProductSearch;

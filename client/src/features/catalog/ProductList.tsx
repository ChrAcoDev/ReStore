import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import { FC } from "react";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

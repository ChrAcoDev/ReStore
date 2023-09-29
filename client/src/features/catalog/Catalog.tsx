import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import { FC, useEffect, useState } from "react";

const Catalog: FC<{}> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;

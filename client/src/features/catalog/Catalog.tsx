import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import { FC, useEffect, useState } from "react";

const Catalog: FC<{}> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;

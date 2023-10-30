import { FC, useEffect } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

const Catalog: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending")) return <Loading />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;

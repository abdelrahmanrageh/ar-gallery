import { useEffect, useMemo, useRef } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
// import PropTypes from 'prop-types';

function Products({ filter, sectionName }) {
  const products = useSelector((state) => state.products.products);
  const searchValue = useSelector((state) => state.products.searchValue);
  const productsRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!searchValue) {
      return products;
    }
    return filterProducts(searchValue);
  },[searchValue, products]);

  function filterProducts(searchValue) {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  function filterCategrory(category) {
    return products.filter((product) => product.category === category);
  }
  const categoryProducts = filterCategrory(filter);
  // console.log(filterCategrory('jewelery'));

  return (
    <>
      {!filter && (
        <div className="container">
          <div
            className=" relative flex flex-wrap content-center justify-center mt-40"
            id="products"
            ref={productsRef}
          >
            <h2 className=" relative dark:text-teal-50 text-slate-900 font-semibold text-xl ml-2 mb-5 w-full">
              {searchValue &&
                filteredProducts.length > 0 &&
                `Results for: ${searchValue}`}
              {!searchValue && "All Products"}
            </h2>

            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            {filteredProducts.length === 0 && (
              <div
                className="flex flex-col items-center justify-center w-full mb-16"
                style={{ height: "calc(100vh - 400px)" }}
              >
                <img
                  className="text-2xl text-center"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
                />
                <h2 className="text-2xl text-center text-slate-600 dark:text-slate-300 -mt-10">
                  Nothing here
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
      {filter && (
        <>
          <h2 className="mt-24 relative dark:text-teal-50 text-slate-900 font-bold text-4xl ml-2 mb-5 w-full">
            {sectionName}
          </h2>
          <div
            style={{ scrollbarWidth: "none" }}
            className="products snap-x snap-mandatory flex flex-wrap content-center justify-center fxs:justify-center z-50"
            id="products"
            ref={productsRef}
          >
            {categoryProducts.map((product, index) => {
              if(index >= 5) return null;
              return (
                <Product
                  className="snap-center"
                  key={product._id}
                  product={product}
                />
              );
            })}
            {filter !== "electronics" && (
              <div className="shape bg-slate-100 dark:bg-slate-600"></div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Products;

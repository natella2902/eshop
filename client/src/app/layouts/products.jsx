import React from "react";
import ProductsList from "../components/common/products/productsList";
import Tags from "../components/common/tags/tags";
import { useSelector } from "react-redux";
import { getProductById, getProducts, getProductsLoadingStatus } from "../store/products";
import { useParams } from "react-router-dom";
import ProductCard from "../components/page/productCard/product";
import ProductCardEdit from "../components/page/productCardEdit/productCardEdit";

const Products = () => {
    const params = useParams();
    const { productId, edit } = params;
    const isLoading = useSelector(getProductsLoadingStatus());
    const productsList = useSelector(getProducts());
    const product = useSelector(getProductById(productId));
    return (
        <div className="container">
            <>
                    {productId ? (
                        edit ? (
                                <ProductCardEdit productId={productId}/>
                            )
                         : (
                            !isLoading && <ProductCard product={ product }/>
                        )
                    ) : (
                        <div className="container__products">
                            <h2 className="subtitle">Our products.</h2>
                            <Tags/>
                            { !isLoading && <ProductsList productsList={productsList}/> }
                        </div>
                    )}
            </>
        </div>
    );
};

export default Products;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts, getProductsLoadingStatus } from "../../../store/products";
import s from "./productsList.module.css";

const ProductsList = () => {
    const isLoading = useSelector(getProductsLoadingStatus());
    const productsList = useSelector(getProducts());
    const addToCart = (productId) => {
        console.log(productId);
    };
    return (
            <ul className={s.products__list}>
                {!isLoading && productsList.map((prod) => (
                    <li key={ prod._id } className={s.product__item}>
                        <div className={s.product_img}>
                            <img src={prod.img} alt="Product" className={s.product__pic}/>
                        </div>
                        <p className={s.product__rate}>rate: ({ prod.rate })</p>
                        <h4 className={s.subtitle}>
                            <Link to={`/product/${prod._id}`} className={s.product__link} > { prod.name } </Link>
                        </h4>
                        <div className={s.footer}>
                            <span className={s.price + " price"}>
                                ${ prod.price }
                            </span>
                            <button className={s.card__btn}>
                                <img src="../assets/icon_cart.png" alt="cart pic" className={s.cart__pic} onClick={() => addToCart(prod._id)}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>);
};

export default ProductsList;

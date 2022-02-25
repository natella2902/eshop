import React from "react";
import propTypes from "prop-types";
import s from "./product.module.css";
import { useHistory } from "react-router-dom";

const ProductCard = ({ product }) => {
    const history = useHistory();
    const editProduct = () => {
        history.push(history.location.pathname + "/edit");
    };
    const addToCart = (productId) => {
        console.log(productId);
    };
    return (
        <div className={s.product__card}>
            <div className={s.product__image}>
                <div className={s.product__img}>
                    <img src={product.img} alt="card" className="product__pic"/>
                </div>
            </div>
            <div className={s.product__content}>
                <h4 className={s.subtitle}>
                     { product.name }
                </h4>
                <span> VEGETABLES </span>
                <p className={s.text}>
                    { product.text }
                </p>
                <span>{product._id}</span>
                <div className={s.footer}>
                            <span className={s.price + " price"}>
                                ${ product.price }
                            </span>
                    <div className={s.btn__group} >
                        <button className={s.card__btn}>
                            <img src="../assets/icon_edit.png" alt="cart pic" className={s.cart__pic} onClick={ editProduct }/>
                        </button>
                        <button className={s.card__btn}>
                            <img src="../assets/icon_cart.png" alt="cart pic" className={s.cart__pic} onClick={ () => addToCart(product._id)}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: propTypes.object
};
export default ProductCard;

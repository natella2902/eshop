import React from "react";
import s from "./cart.module.css";
import { useSelector } from "react-redux";
import { getCartLoadingStatus, getProductsCart } from "../../../store/cart";
const Cart = () => {
    const productList = useSelector(getProductsCart());
    const isLoadingCart = useSelector(getCartLoadingStatus());

    console.log(productList, isLoadingCart);

    return (<div className="container">
        <h2 className={s.subtitle}>Your cart.</h2>
        <div className="cart">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">PRODUCT DETAILS</th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row">Product name</td>
                    <td>2</td>
                    <td>20</td>
                    <td>40</td>
                    <td>Delete</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>);
};

export default Cart;

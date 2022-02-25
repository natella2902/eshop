import { createAction, createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import productService from "../services/product.service";
import history from "../utils/history";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
                ] = action.payload;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFiled, productUpdateSuccessed } =
    actions;

const productUpdateFailed = createAction("product/productUpdateFailed");
const productUpdateRequested = createAction("product/productUpdateRequested");

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().product;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.get();
            dispatch(productsReceived(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};
export const getProducts = () => (state) => state.product.entities;
export const getProductsLoadingStatus = () => (state) =>
    state.product.isLoading;
export const getProductById = (id) => (state) => {
    if (state.product.entities) {
        return state.product.entities.find((p) => p._id === id);
    }
};

export const updateProduct = (payload) => async (dispatch, getState) => {
    dispatch(productUpdateRequested());
    try {
        const { content } = await productService.update(payload);
        dispatch(productUpdateSuccessed(content));
        history.push(`/product/${content._id}`);
    } catch (error) {
        dispatch(productUpdateFailed(error.message));
    }
};
export default productsReducer;

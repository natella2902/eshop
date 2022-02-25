import { createAction, createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        cartRequested: (state) => {
            state.isLoading = true;
        },
        cartReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        cartRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        cartProductCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        cartProductRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    cartRequested,
    cartReceived,
    cartRequestFiled,
    cartProductCreated,
    cartRemoved
} = actions;

const addProductCartRequested = createAction("cart/addProductCartRequested");
const removeProductCartRequested = createAction("cart/removeProductCartRequested");

export const loadCartList = () => async (dispatch) => {
    dispatch(cartRequested());
    try {
        const { content } = await cartService.getProductsCart();
        dispatch(cartReceived(content));
    } catch (error) {
        dispatch(cartRequestFiled(error.message));
    }
};
export const addProductToCart = (payload) => async (dispatch, getState) => {
    dispatch(addProductCartRequested());
    try {
        const { content } = await cartService.addProductsToCart(payload);
        dispatch(cartProductCreated(content));
    } catch (error) {
        dispatch(cartRequestFiled(error.message));
    }
};
export const removeComment = (productId) => async (dispatch) => {
    dispatch(removeProductCartRequested());
    try {
        const { content } = await cartService.removeProductFromCart(productId);
        if (!content) {
            dispatch(cartRemoved(productId));
        }
    } catch (error) {
        dispatch(cartRequestFiled(error.message));
    }
};

export const getProductsCart = () => (state) => state.cart.entities;
export const getCartLoadingStatus = () => (state) =>
    state.cart.isLoading;

export default cartReducer;

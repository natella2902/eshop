import httpService from "./http.service";
const cartEndpoint = "cart/";

const cartService = {
    addProductsToCart: async (payload) => {
        const { data } = await httpService.post(cartEndpoint, payload);
        return data;
    },
    getProductsCart: async () => {
        const { data } = await httpService.get(cartEndpoint);
        return data;
    },
    removeProductFromCart: async (productId) => {
        const { data } = await httpService.delete(cartEndpoint + productId);
        return data;
    }
};
export default cartService;

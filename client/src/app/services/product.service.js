import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
    get: async () => {
        const req = await httpService.get(productEndpoint);
        return req.data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default productService;

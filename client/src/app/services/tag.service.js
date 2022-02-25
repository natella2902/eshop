import httpService from "./http.service";

const tagEndpoint = "tag/";

const tagService = {
    get: async () => {
        const req = await httpService.get(tagEndpoint);
        return req.data;
    }
};
export default tagService;

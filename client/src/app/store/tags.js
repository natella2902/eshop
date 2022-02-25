import { createSlice } from "@reduxjs/toolkit";
import tagService from "../services/tag.service";

const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        tagsRequested: (state) => {
            state.isLoading = true;
        },
        tagsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        tagsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: tagsReducer, actions } = tagsSlice;
const { tagsRequested, tagsReceived, tagsRequestFiled } =
    actions;

export const loadTagsList = () => async (dispatch, getState) => {
        dispatch(tagsRequested());
        try {
            const { content } = await tagService.get();
            dispatch(tagsReceived(content));
        } catch (error) {
            dispatch(tagsRequestFiled(error.message));
        }
};
export const getTags = () => (state) => state.tag.entities;
export const getTagsLoadingStatus = () => (state) =>
    state.tag.isLoading;
export const getTagById = (id) => (state) => {
    if (state.tag.entities) {
        return state.tag.entities.find((p) => p._id === id);
    }
};
export default tagsReducer;

import {IList} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {addToList, deleteTrack, fetchList} from "./UsersAndActivitiesThunk.ts";
import {RootState} from "../../app/store.ts";

interface UsersAndActivitiesListState {
    usersAndActivitiesList: IList[];
    fetchListLoading: boolean;
    addToListLoading: boolean;
    deleteFromListLoading: boolean;
}

const initialState: UsersAndActivitiesListState = {
    usersAndActivitiesList: [],
    fetchListLoading: false,
    addToListLoading: false,
    deleteFromListLoading: false,
}

export const usersAndActivitiesListSlice = createSlice({
    name: "usersAndActivitiesList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchList.pending, (state) => {
            state.fetchListLoading = true;
        });
        builder.addCase(fetchList.fulfilled, (state, {payload: list}) => {
            state.fetchListLoading = false;
            state.usersAndActivitiesList = list
        });
        builder.addCase(fetchList.rejected, (state) => {
            state.fetchListLoading = false;
        });

        builder.addCase(addToList.pending, (state) => {
            state.addToListLoading = true;
        });
        builder.addCase(addToList.fulfilled, (state) => {
            state.addToListLoading = false;
        });
        builder.addCase(addToList.rejected, (state) => {
            state.addToListLoading = false;
        });

        builder.addCase(deleteTrack.pending, (state) => {
            state.deleteFromListLoading = true;
        });
        builder.addCase(deleteTrack.fulfilled, (state) => {
            state.deleteFromListLoading = false;
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.deleteFromListLoading = false;
        });
    }
});

export const selectList = (state: RootState) => state.usersAndActivitiesList.usersAndActivitiesList;
export const selectListLoading = (state: RootState) => state.usersAndActivitiesList.fetchListLoading;
export const addToListLoading = (state: RootState) => state.usersAndActivitiesList.addToListLoading;
export const deleteFromListLoading = (state: RootState) => state.usersAndActivitiesList.deleteFromListLoading;

export const usersAndActivitiesListReducer = usersAndActivitiesListSlice.reducer;
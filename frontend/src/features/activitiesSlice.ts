import {IActivity} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {
    activitiesFetch,
    createActivity,
    deleteActivity,
    makePublicActivity,
    oneActivityFetch
} from "./activitiesThunk.ts";

interface activitiesState {
    activities: IActivity[];
    activity: IActivity | null;
    fetchActivitiesLoading: boolean;
    fetchOneActivityLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean | string;
    publicLoading: boolean | string;
}

const initialState: activitiesState = {
    activities: [],
    activity: null,
    fetchActivitiesLoading: false,
    fetchOneActivityLoading: false,
    createLoading: false,
    deleteLoading: false,
    publicLoading: false,
}

export const activitiesSlice = createSlice({
    name: "activities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(activitiesFetch.pending, (state) => {
            state.fetchActivitiesLoading = true;
        });
        builder.addCase(activitiesFetch.fulfilled, (state, {payload: activities}) => {
            state.fetchActivitiesLoading = false;
            state.activities = activities
        });
        builder.addCase(activitiesFetch.rejected, (state) => {
            state.fetchActivitiesLoading = false;
        });

        builder.addCase(oneActivityFetch.pending, (state) => {
            state.fetchOneActivityLoading = true;
        });
        builder.addCase(oneActivityFetch.fulfilled, (state, {payload: activity}) => {
            state.fetchOneActivityLoading = false;
            state.activity = activity
        });
        builder.addCase(oneActivityFetch.rejected, (state) => {
            state.fetchOneActivityLoading = false;
        });

        builder.addCase(createActivity.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createActivity.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createActivity.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(deleteActivity.pending, (state, action) => {
            state.deleteLoading = state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteActivity.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteActivity.rejected, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(makePublicActivity.pending, (state, action) => {
            state.publicLoading = action.meta.arg;
        });
        builder.addCase(makePublicActivity.fulfilled, (state ) => {
            state.publicLoading = false;
        });
        builder.addCase(makePublicActivity.rejected, (state) => {
            state.publicLoading = false;
        });
    }
})
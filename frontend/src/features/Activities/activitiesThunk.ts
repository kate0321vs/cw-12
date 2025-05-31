import axiosApi from "../../axiosApi.ts";
import {IActivity, IActivityMutation} from "../../types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const activitiesFetch = createAsyncThunk<IActivity[], string | null> (
    "activities/fetchAll",
    async (userId) => {
        const response = await axiosApi.get('/activities', {
            params: userId ? { userId } : undefined})
        return response.data;
    }
);

export const oneActivityFetch = createAsyncThunk<IActivity, string> (
    "activities/fetchOne",
    async (id) => {
        const response = await axiosApi.get(`activities/${id}`)
        return response.data;
    }
);

export const createActivity = createAsyncThunk<void, IActivityMutation>(
    "activities/create",
    async (activity) => {
        const formData = new FormData();
        const keys = Object.keys(activity) as (keyof IActivityMutation)[];

        keys.forEach((key) => {
            const value = activity[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });
        await axiosApi.post('/activities', formData);
    }
);

export const deleteActivity = createAsyncThunk<void, string>(
    "activities/delete",
    async (id) => {
        await axiosApi.delete(`activities/${id}`);
    }
);

export const makePublicActivity = createAsyncThunk<void, string>(
    "activities/makePublish",
    async (id) => {
        await axiosApi.patch(`activities/${id}/togglePublished`);
    }
);
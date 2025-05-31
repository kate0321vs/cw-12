import { createAsyncThunk } from "@reduxjs/toolkit";
import {IList} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchList = createAsyncThunk<IList[], string | null>(
    "usersList/fetchAll",
    async (activityId) => {
        const response = await axiosApi.get("/usersList", {
            params: activityId ? { activityId } : undefined});
        const tracks: IList[] = response.data;

        return tracks;
    }
);

export const addToList = createAsyncThunk<void, string>(
    "usersList/create",
    async (activity) => {
        await axiosApi.post('/usersList', {activity});
    }
);

export const deleteTrack = createAsyncThunk<void, string>(
    "usersList/delete",
    async (id) => {
        await axiosApi.delete(`usersList/${id}`);
    }
);
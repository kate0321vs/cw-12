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

interface DeleteUserFromListArgs {
    activityId: string;
    userId?: string;
}

export const deleteFromUserList = createAsyncThunk<void, DeleteUserFromListArgs>(
    "usersAndActivities/deleteFromList",
    async ({ activityId, userId }, thunkAPI) => {
        try {
            await axiosApi.delete(`/usersList?activityId=${activityId}`, {
                data: userId ? { _id: userId } : undefined,
            });
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to delete user");
        }
    }
);
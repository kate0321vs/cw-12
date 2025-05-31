import {model, Schema, Types} from "mongoose";
import User from "./User";
import Activity from "./Activity";

const UsersListSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        validate: [{
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: 'User not found',
        }]
    },
    activity: {
        type: Types.ObjectId,
        ref: "Activity",
        required: true,
        validate: [{
            validator: async (value: Types.ObjectId) => {
                const activity = await Activity.findById(value);
                return !!activity;
            },
            message: 'Activity not found',
        }]
    },
})

const UsersList = model("User", UsersListSchema);
export default UsersList;
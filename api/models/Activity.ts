import {model, Schema, Types} from "mongoose";
import User from "./User";

const ActivitySchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Activity = model("Activity", ActivitySchema);
export default Activity;
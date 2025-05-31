import express from "express";
import Activity from "../models/Activity";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";
import permit from "../middleware/permit";

const activitiesRouter = express.Router();

activitiesRouter.get("/", async (req, res) => {
    try {
        const {userId} = req.query;
        let activities
        const jwtToken = req.get("Authorization")?.replace("Bearer ", "");
        if (!jwtToken) {
            if(userId) {
                activities = await Activity.find({ user: userId, isPublished: true }).populate({
                    path: "user",
                    select: "displayName"
                });
            } else {
                activities = await Activity.find({isPublished: true}).populate({
                    path: "user",
                    select: "displayName role"
                });
            }
            res.send(activities);
            return;
        } else {
            const user = await User.findOne({token: jwtToken});
            if (!user) {
                res.status(404).send({error: "Could not find user"});
                return;
            }
            if (userId) {
                activities = await Activity.find({ user: userId }).populate({
                    path: "user",
                    select: "displayName"
                });
            } else {
                if (user.role === "admin") {
                    activities = await Activity.find().populate({
                        path: "user",
                        select: "displayName"
                    });
                } else {
                    activities = await Activity.find({isPublished: true}).populate({
                        path: "user",
                        select: "displayName avatar googleId"
                    });
                }
            }
            res.send(activities)
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

activitiesRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const activity = await Activity.findById(id).populate({
            path: "user",
            select: "displayName"
        });
        if (!activity) {
            res.status(404).send({error: "Could not find activity"});
        }
        res.send(activity);
    } catch (error) {
        res.status(500).send(error);
    }
})

activitiesRouter.post("/", auth,  imagesUpload.single('image'), async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;

        const activity = new Activity({
            user: user,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await activity.save();
        res.send(activity);
    } catch (error) {
        res.status(500).send(error);
    }
});

activitiesRouter.delete("/:id", auth, async (req, res) => {
    try{
        const activity = await Activity.findOne({_id: req.params.id});
        const user = (req as RequestWithUser).user;

        if (!activity) {
            res.status(404).send({message: 'Activity not found'});
            return
        } else if (activity.user.toString() !== user._id.toString()  && user.role !== "admin") {
            res.status(403).send({ error: 'You have no rights to delete this activity' });
            return
        }

        await Activity.deleteOne({_id: req.params.id});
        res.send({message: 'Cocktail deleted successfully'});
    } catch (error) {
        res.status(500).send(error);
    }
});

activitiesRouter.patch('/:id/togglePublished', auth, permit('admin'),async (req, res) => {
    const activity = await Activity.findOne({_id: req.params.id})
    if (!activity) {
        res.status(404).send({error: "Cocktail not found"});
        return;
    }
    activity.isPublished = !activity.isPublished;
    await activity.save();
    res.send({ message: "Activity publication status toggled"});
});

export default activitiesRouter
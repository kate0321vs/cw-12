import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import UsersList from "../models/UsersList";
import Activity from "../models/Activity";

const usersListRouter = express.Router();

usersListRouter.get("/", auth, async (req, res) => {
   try {
       const activityId = req.query.activityId;
       const user = (req as RequestWithUser).user;

       if (activityId) {
           const usersList = await UsersList.find({activity: activityId}).populate("user", "displayName")
           res.send(usersList);
           return;
       }

       if (!user) {
           res.status(404).send("User not found");
           return
       }
      const activitiesList = await UsersList.find({user: user._id}).populate("activity", ["title", "image"]).populate("user", "displayName");
       res.send(activitiesList);
   } catch (error) {
       res.status(500).send(error);
   }
});

usersListRouter.post("/", auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        const activity = await Activity.findById(req.body.activity);
        if (!activity) {
            res.status(404).send('Activity not found');
            return;
        }

        const exist = await UsersList.findOne({user: user._id, activity: req.body.activity});

        if (exist) {
            res.status(400).send({ error: "User is already in this activity" });
            return;
        }

        const usersList = new UsersList({
            activity: req.body.activity,
            user: user._id,
        })

        await usersList.save();
        res.send(usersList);
    } catch (error) {
        res.status(500).send(error);
    }
});

usersListRouter.delete("/", auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        const activityId = req.query.activityId;

        if (!activityId) {
             res.status(400).send({ error: "Missing or invalid activityId in query" });
            return
        }

        let entry;

        if (user.role === "admin") {
            const targetUserId = req.body._id;

            if (!targetUserId) {
                 res.status(400).send({ error: "Missing user _id in request body for admin" });
                return
            }

            entry = await UsersList.findOne({ user: targetUserId, activity: activityId });

            if (!entry) {
                 res.status(404).send({ error: "This user is not part of this activity" });
                return
            }

            await UsersList.deleteOne({ _id: entry._id });
             res.send({ message: "User has been removed from the activity by admin" });
            return
        }

        entry = await UsersList.findOne({ user: user._id, activity: activityId });

        if (!entry) {
             res.status(404).send({ error: "You are not part of this activity" });
            return
        }

        await UsersList.deleteOne({ _id: entry._id });
        res.send({ message: "You have been removed from the activity" });

    } catch (error) {
        res.status(500).send(error);
    }
    });

export default usersListRouter;
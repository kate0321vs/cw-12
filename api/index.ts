import express from "express";
import * as mongoose from "mongoose";
import usersRouter from "./routers/users";
import cors from "cors";
import activitiesRouter from "./routers/activities";
import usersListRouter from "./routers/usersList";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/activities', activitiesRouter);
app.use('/usersList', usersListRouter);

4
const run = async () => {
    await mongoose.connect('mongodb://localhost/activities');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect()
    })
};

run().catch((err) => console.error(err));
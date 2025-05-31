import {CircularProgress, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectActivities, selectActivitiesLoading} from "./activitiesSlice.ts";
import {useSearchParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ActivityItem from "./components/ActivityItem.tsx";
import {activitiesFetch} from "./activitiesThunk.ts";
import {useEffect} from "react";
import {selectUser} from "../Users/usersSlice.ts";

const Activities = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const loading = useAppSelector(selectActivitiesLoading);
    const activities = useAppSelector(selectActivities);
    const user = useAppSelector(selectUser)

    useEffect(() => {
        if (!userId) {
            dispatch(activitiesFetch(null));
        } else {
            dispatch(activitiesFetch(userId));
        }
    }, [dispatch, userId]);

    return (
        <>
            {loading ? (
                <CircularProgress/>
            ) : activities.length > 0 ? (
                <>
                    {userId ?
                        <>
                            {user?._id === userId ?
                                <Typography variant="h4" my={4}>
                                    My activities
                                </Typography>
                                :
                                <Typography variant="h4" my={4}>
                                    {activities[0]?.user?.displayName}'s activities
                                </Typography>
                            }
                        </>
                        :
                        <Typography variant="h4" my={4}>Activities</Typography>}

                        <Grid container spacing={2}>
                            {activities.map((activity) => {
                                return (
                                    <ActivityItem
                                        key={activity._id}
                                        title={activity.title}
                                        image={activity.image}
                                        isPublished={activity.isPublished}
                                        id={activity._id}
                                        author={activity.user}
                                    />
                                );
                            })}
                        </Grid>
                </>
            ) : (
                <Typography>No activities yet</Typography>
            )}
        </>
    );
};

export default Activities;
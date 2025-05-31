import { Box, Typography, Button, CardMedia, Container, CircularProgress } from "@mui/material";
import {baseURL} from "../../globalConstants.ts";
import {selectOneActivity, selectOneActivityLoading} from "./activitiesSlice.ts";
import {useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import {oneActivityFetch} from "./activitiesThunk.ts";



const FullInfoActivity = () => {
    const dispatch = useAppDispatch();
    const activity = useAppSelector(selectOneActivity);
    const loading = useAppSelector(selectOneActivityLoading);
    const {id} = useParams() as { id: string };

    console.log(activity);

    useEffect(() => {
        dispatch(oneActivityFetch(id));
    }, [dispatch, id]);

    const onLeave = () => {

    }

    return (
        <>
            {loading ? <CircularProgress /> :
                activity ?
                    (<Container maxWidth="md" sx={{ mt: 4 }}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
                        <CardMedia
                            component="img"
                            image={baseURL + "/" + activity.image}
                            alt={activity.title}
                            sx={{ width: 300, height: 300, objectFit: "cover", flexShrink: 0 }}
                        />

                        <Box flexGrow={1}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                {activity.title}
                            </Typography>

                            <Typography variant="h6" gutterBottom>
                                Author: <strong>{activity.user.displayName}</strong>
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 2, mb: 4, whiteSpace: "pre-line" }}>
                                {activity.description}
                            </Typography>

                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="outlined" onClick={onLeave}>
                                    Leave
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>) :
                    <Typography>Activity not found</Typography>
            }
        </>

    );
};

export default FullInfoActivity;

import {Box, Typography, Button, CardMedia, Container, CircularProgress, IconButton} from "@mui/material";
import {baseURL} from "../../globalConstants.ts";
import {selectOneActivity, selectOneActivityLoading} from "./activitiesSlice.ts";
import {useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {activitiesFetch, oneActivityFetch} from "./activitiesThunk.ts";
import CloseIcon from "@mui/icons-material/Close";
import {selectList} from "../UsersAndActivitiesList/usersAndActivitiesListSlice.ts";
import {deleteFromUserList, fetchList} from "../UsersAndActivitiesList/UsersAndActivitiesThunk.ts";
import { selectUser } from "../Users/usersSlice.ts";
import { toast } from "react-toastify";

const FullInfoActivity = () => {
    const dispatch = useAppDispatch();
    const activity = useAppSelector(selectOneActivity);
    const loading = useAppSelector(selectOneActivityLoading);
    const {id} = useParams() as { id: string };
    const usersList = useAppSelector(selectList);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(oneActivityFetch(id));
        dispatch(fetchList(id))
    }, [dispatch, id]);

    const onLeave = async () => {
        if (id) {
           await dispatch(deleteFromUserList({activityId: id}));
           await dispatch(activitiesFetch(null));
           toast.error("you left the group")
           navigate("/")
        }
    }

    const isUserDeleted = usersList.some(item => item.user._id === user?._id || item.activity._id === id);

    const onDeleteUser = async (id_user: string) => {
        await dispatch(deleteFromUserList({activityId: id, userId: id_user, }));
        await dispatch(fetchList(id))
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
                                {!isUserDeleted || user &&
                                    <Button variant="outlined" onClick={onLeave}>
                                    Leave
                                </Button>}
                            </Box>
                        </Box>
                    </Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Group people
                        </Typography>
                        {usersList.length > 0 ?
                            <Box sx={{ p: 4, }}>

                                {usersList.map((item) => (
                                    <Box
                                        key={item.user._id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderBottom: "1px solid #ccc",
                                            px: 2,
                                            py: 1,
                                        }}
                                    >
                                        <Typography>{item.user.displayName}</Typography>
                                        {user && user.role === "admin" &&
                                            <IconButton >
                                                <CloseIcon onClick={() => onDeleteUser(item.user._id)}/>
                                            </IconButton>
                                        }
                                    </Box>
                                ))}
                            </Box>
                        :
                            <Typography>No users yet</Typography>
                        }
                </Container>) :
                    <Typography>Activity not found</Typography>
            }
        </>

    );
};

export default FullInfoActivity;

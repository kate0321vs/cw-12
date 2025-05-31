import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { baseURL } from "../../../globalConstants.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import { selectUser } from "../../Users/usersSlice.ts";
import {activitiesFetch, deleteActivity, makePublicActivity} from "../activitiesThunk.ts";
import { toast } from "react-toastify";
import {selectDeleteActivityLoading, selectPublicLoading} from "../activitiesSlice.ts";
import {NavLink} from "react-router-dom";

interface Props {
    title: string;
    image: string;
    isPublished: boolean;
    author: { displayName: string; _id: string };
    id: string;
}

const ActivityItem: React.FC<Props> = ({title, image, id, isPublished, author}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteActivityLoading);
    const publishLoading = useAppSelector(selectPublicLoading);

    const onPublic = async () => {
        if (window.confirm(`Published activity ${title}?`)) {
            await dispatch(makePublicActivity(id));
            await dispatch(activitiesFetch(null));
            toast.success('Activity has been published successfully.');
        }
    };

    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this activity?")) {
            await dispatch(deleteActivity(id));
            await dispatch(activitiesFetch(null));
            toast.error('Activity was deleted Successfully!');
        }
    }

    console.log(author)

    return (
        <Grid sx={{width: 400, mb: 3, boxShadow: 3, borderRadius: 3}}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        sx={{height: 300, width: 400}}
                        image={baseURL + '/' + image}
                        title={title}
                    />
                </CardActionArea>
                <CardContent
                    style={{
                        borderRadius: '0 0 10px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Grid>
                        <Typography color='black' sx={{textDecoration: "none"}}  variant='h5'>{title}</Typography>
                        <Typography color='black' sx={{textDecoration: "none"}} component={NavLink} to={`/activities?userId=${author._id}`} variant='body1'><b>Author: </b>{author.displayName}</Typography>
                    </Grid>
                    {user && user.role === 'admin' &&
                        <Grid sx={{height: 50}}>
                            {!isPublished && (
                            <>
                                <Typography variant="body2" color="warning" pr={1}>Unpublished</Typography>
                                <IconButton title='Public' onClick={onPublic}>
                                    {publishLoading === id ? <CircularProgress size={22}/> : <CheckCircleIcon color='warning'/> }
                                </IconButton>
                            </>
                        )}
                            <IconButton onClick={onDelete}
                                        title="Delete">
                                {deleteLoading === id ? <CircularProgress size={22}/> : <DeleteIcon color='error'/>  }
                            </IconButton>
                        </Grid>
                    }
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ActivityItem;
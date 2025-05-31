import {Button, CircularProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import {IActivityMutation} from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {selectCreateActivityLoading} from "../activitiesSlice.ts";
import { toast } from "react-toastify";
import {createActivity} from "../activitiesThunk.ts";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import SendIcon from '@mui/icons-material/Send';

const initialState: IActivityMutation = {
    title: '',
    description: '',
    image: null,
}

const FormActivity = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<IActivityMutation>(initialState);
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateActivityLoading);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createActivity(state));
        toast.success('Activity was created Successfully!');
        navigate('/')
        setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => {
                return {...prevState,
                    [name]: files[0]};
            })
        }
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid>
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <TextField
                        id="description"
                        label="Description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <FileInput onChange={filesInputChangeHandler} name="image" label="Image" file={state.image}/>
                </Grid>


                <Grid>
                    <Button
                        endIcon={loading ? <CircularProgress size={24}/> : <SendIcon/>}
                        size="small"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        sx={{backgroundColor: 'black', fontWeight: '500'}}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>

        </form>
    );
};

export default FormActivity;
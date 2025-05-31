import {Container, Typography} from "@mui/material";
import FormActivity from "./components/FormActivity.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import { selectUser } from "../Users/usersSlice.ts";
import { useNavigate } from "react-router-dom";

const NewActivity = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
    }

    return (
        <Container maxWidth="sm">
            <Typography variant='h4' textAlign='center' mb={3}>Add activity</Typography>
            <FormActivity/>
        </Container>
    );
};

export default NewActivity;
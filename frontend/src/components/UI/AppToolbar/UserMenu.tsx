import React, {useState} from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {IUser} from '../../../types';
import {logout} from "../../../features/Users/usersThunk.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {unsetUser} from "../../../features/Users/usersSlice.ts";
import {toast} from "react-toastify";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink, useNavigate} from "react-router-dom";
import {activitiesFetch} from "../../../features/Activities/activitiesThunk.ts";

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        await dispatch(activitiesFetch(null));
        navigate('/');
        handleClose();
        toast.success("Logout successfully.");
    }

    return (
        <>
            <Typography marginRight={2}>{user.displayName}</Typography>
            <IconButton onClick={handleClick}>
                <MenuIcon fontSize='large' style={{color: 'white', fontSize: '2rem'}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={NavLink} to={`/activities?userId=${user._id}`}>My activities</MenuItem>
                <MenuItem component={NavLink} to={`/add-activity`}>Add activity</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
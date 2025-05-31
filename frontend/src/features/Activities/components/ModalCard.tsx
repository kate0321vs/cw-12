import {
    Modal,
    Box,
    Typography,
    Button,
    CardMedia,
} from "@mui/material";
import {baseURL} from "../../../globalConstants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    gap: 2,
    flexDirection: "column",
};

interface Props {
    open: boolean;
    handleClose: () => void;
    image: string;
    title: string;
    description: string;
    author: {displayName: string; _id: string};
}

const ModalCard: React.FC<Props> = ({ open, handleClose, image, title, description,author }) => {
    const dispatch = useAppDispatch();

   const addToActivity = () => {

    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box display="flex" gap={3}>
                    <CardMedia
                        component="img"
                        image={baseURL + "/" + image}
                        alt={title}
                        sx={{ width: 200, height: 200 }}
                    />
                    <Box flexGrow={1}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Author: <strong>{author.displayName}</strong>
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {description}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Button variant="contained" color="primary" onClick={addToActivity}>
                        Join
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalCard;
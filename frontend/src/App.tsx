import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Register from "./features/Users/Register.tsx";
import Login from "./features/Users/Login.tsx";
import Activities from "./features/Activities/Activities.tsx";
import NewActivity from "./features/Activities/NewActivity.tsx";
import FullInfoActivity from "./features/Activities/FullInfoActivity.tsx";

const App = () => {
    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Activities/>}/>
                        <Route path="/activities" element={<Activities/>}/>
                        <Route path="/add-activity" element={<NewActivity/>}/>
                        <Route path="/activities/:id" element={<FullInfoActivity/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Typography>Page not found</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
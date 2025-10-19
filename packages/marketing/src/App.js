import { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// Create a default theme
const theme = createTheme();

export default ({ history }) => {
    const [location, setLocation] = useState(history.location);

    useEffect(() => {
        // Listen to history changes and update location state
        const unlisten = history.listen((update) => {
            setLocation(update.location);
        });

        return unlisten; // Clean up the listener on unmount
    }, [history]);

    return (
        <ThemeProvider theme={theme}>
            <Router location={location} navigator={history}>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/pricing" element={<Pricing />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
};
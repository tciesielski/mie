import { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

// Create a default theme
const theme = createTheme();

// Fix the arrow function syntax (using proper named function)
export default function App({ history, onSignIn }) {
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
            <CssBaseline />
            <Router location={location} navigator={history}>
                <Routes>
                    <Route path="/auth/signin" element={<SignIn onSignIn={onSignIn} />} />
                    <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
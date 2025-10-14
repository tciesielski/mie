import { useState, useEffect } from "react";
import { Router, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

export default ({ history, onSignIn }) => {
    const [location, setLocation] = useState(history.location);

    useEffect(() => {
        // Listen to history changes and update location state
        const unlisten = history.listen((update) => {
            setLocation(update.location);
        });

        return unlisten; // Clean up the listener on unmount
    }, [history]);
    return (
        <div>
            <StyledEngineProvider injectFirst>
                <Router location={location} navigator={history}>
                    <Routes>
                        <Route path="/auth/signin">
                            <SignIn onSignIn={onSignIn} />
                        </Route>
                        <Route path="/auth/signup">
                            <SignUp onSignIn={onSignIn} />
                        </Route>
                    </Routes>
                </Router>
            </StyledEngineProvider>
        </div>
    )
};
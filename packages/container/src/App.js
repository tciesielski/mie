import { lazy, Suspense, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
const AuthApp = lazy(() => import("./components/AuthApp"));
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));


const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        setIsSignedIn(true);
        navigate('/dashboard');
    };

    return (
        <StyledEngineProvider injectFirst>
            <div>
                <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                <Suspense fallback={<Progress />}>
                    <Routes>
                        <Route path="/auth/*" element={<AuthApp onSignIn={handleSignIn} />} />
                        {/* <Route path="/dashboard" element={!isSignedIn ? <Navigate to="/" /> : <DashboardApp />} /> */}
                        {/* <Route path="/" element={MarketingApp}></Route> */}

                    </Routes>
                </Suspense>
            </div>
        </StyledEngineProvider>
    );
};

export default () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};
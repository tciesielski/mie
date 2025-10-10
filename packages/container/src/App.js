import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MarketingApp from "../components/MarketingApp";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"></Route>
                    <Route exact path="/marketing">
                    </Route>
                </Switch>
            Container
            <Link to="/marketing">Marketing</Link>
                <MarketingApp />
            </BrowserRouter>
        </div>
    );
};

export default App;
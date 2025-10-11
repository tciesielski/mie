import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MarketingApp from "../components/MarketingApp";
import Header from "../components/Header";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/"></Route>
                    <Route exact path="/marketing">
                    </Route>
                </Switch>
                {/* <Link to="/marketing">Marketing</Link> */}
                <Header />
                <MarketingApp />
            </div>
        </BrowserRouter>
    );
};

export default App;
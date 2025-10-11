import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import MarketingApp from "../components/MarketingApp";
import Header from "../components/Header";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

const App = () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
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
            </StylesProvider>
        </BrowserRouter>
    );
};

export default App;
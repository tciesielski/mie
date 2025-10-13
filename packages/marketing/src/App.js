import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma'
});

export default ({ history }) => {
    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/pricing" component={Pricing} />
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    )
};
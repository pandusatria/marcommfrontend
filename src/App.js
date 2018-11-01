import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './component/account/login';
import Layout from './component/layout';
import appconfig from './config/app.config.json';
import tokenExpired from './common/checkTokenExpired';

console.log("App.js Debugging : Check Local Storage");
console.log(localStorage.getItem(appconfig.secure_key.token));
console.log(localStorage.getItem(appconfig.secure_key.userdata));

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (
                    tokenExpired.isTokenExpired(localStorage.getItem(appconfig.secure_key.token)) === true ||
                    localStorage.getItem(appconfig.secure_key.token) == null ||
                    localStorage.getItem(appconfig.secure_key.token) === "SECURE_KEY_TOKEN" ?
                    (
                        <Route exact path='/' component={Login} />
                    ) :
                    (
                        <Layout/>
                    )
                )} />
                <Layout/>
            </Switch>
        )
    }
}

export default App;
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Dashboard from './home/dashboard';
import User from './m_user/index';
import Employee from './employee/index';
import Souvenir_Item from './t_souvenir_item';
import appconfig from '../config/app.config.json';
import tokenExpired from '../common/checkTokenExpired';

const Switcher = () => {
    return (
        <Switch>
            <PrivateRoute path = "/dashboard" component = { Dashboard } />
            <PrivateRoute path = "/employee" component = { Employee } />
            <PrivateRoute path = "/user" component = { User } />
            <PrivateRoute path = "/souvenir_item" component = { Souvenir_Item } />
        </Switch>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render = { props =>
            tokenExpired.isTokenExpired(localStorage.getItem(appconfig.secure_key.token)) === false ||
            localStorage.getItem(appconfig.secure_key.token) != null ?
            (
                console.log(tokenExpired.isTokenExpired(localStorage.getItem(appconfig.secure_key.token))),
                console.log("Lagi di sini"),
                <Component {...props} />
            ) :
            (
                <Redirect to = {{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default Switcher

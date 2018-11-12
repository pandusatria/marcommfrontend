import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import appconfig from '../../config/app.config.json';

console.log("Header.js Debugging : Check Local Storage");
console.log(localStorage.getItem(appconfig.secure_key.token));
console.log(localStorage.getItem(appconfig.secure_key.userdata));

export default class header extends Component {
    constructor(props) {
        super(props);
        this.onSignOut = this.onSignOut.bind(this);
        this.userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

        if(this.userdata == null || typeof this.userdata == undefined)
        {
            this.username = "";
            this.role = "";
            this.email = "";
            this.employee = "";
        } else {
            this.username = this.userdata[0].username;
            this.role = this.userdata[0].role;
            this.employee = this.userdata[0].employee;
            this.email = this.userdata[0].email;
        }
    }

    onSignOut() {
        console.log("Debugger Sign Out");
        localStorage.clear();
        this.props.history.push('/');
    }

    render(){
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>M</b>CA</span>
                    <span className="logo-lg">Marcomm<b>APP</b></span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={require("../../content/img/avatar.png")} className="user-image" alt="User Image"/>
                                    <span className="hidden-xs">
                                        { this.email }
                                    </span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="user-header">
                                        <img src={require("../../content/img/avatar.png")} className="img-circle" alt="User Image"/>

                                        <p>
                                            { this.employee } - { this.role }
                                        </p>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-right">
                                            <Link className="nav-link btn btn-danger btn-flat" to="" onClick={this.onSignOut}>Sign out</Link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="clearfix"></div>
            </header>
        )
    }
}
import React, {Component} from 'react';

export default class sidebar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className="active">
                            <a href="/dashboard">
                                <i className="fa fa-th"> </i> <span>Dashboard</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>
                        <li className="active">
                            <a href="/employee">
                                <i className="fa fa-th"> </i> <span>Employee</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>
                        <li className="active">
                            <a href="/event">
                                <i className="fa fa-th"> </i> <span>Event</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>
                    </ul>
                </section>
                <div className="clearfix"></div>
            </aside>
        )
    }
}

import React, {Component} from 'react';

export default class sidebar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MASTER</li>
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
                            <a href="/user">
                                <i className="fa fa-user-circle-o"> </i> <span>User</span>
                                <span className="pull-right-container">
                                </span>
                            </a>
                        </li>
                        <li className="header">TRANSACTION</li>
                        <li className="active">
                            <a href="/souvenir_item">
                                <i className="fa fa-shopping-bag"> </i> <span>Souvenir Item</span>
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

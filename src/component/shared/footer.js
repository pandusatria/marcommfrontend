import React, {Component} from 'react';

export default class footer extends Component {
    render(){
        return (
            <footer className="main-footer navbar-fixed-bottom">
                <div className="clearfix"></div>
                <div className="pull-right hidden-xs">
                    <b>Version</b> 2.4.0
                </div>
                <strong>Copyright &copy; 2018 Bootcamp Node.js 173.</strong> All rights
                reserved.
            </footer>
        )
    }
}
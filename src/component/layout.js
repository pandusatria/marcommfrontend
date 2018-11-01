import React, { Component } from 'react';
import Header from './shared/header';
import Sidebar from './shared/sidebar';
import Footer from './shared/footer';
import ContentSwitcher from './switcher';

class layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <ContentSwitcher />
                <div className="clearfix"></div>
                <Footer />
                <div className="control-sidebar-bg"></div>
            </div>
        );
    }
};

export default layout;
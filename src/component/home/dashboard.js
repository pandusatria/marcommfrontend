import React, {Component} from 'react';

export default class dashboard extends Component {
    render(){
        return (
            <div className="content-wrapper fixed">
                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>version 1.0</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Dashboard</a></li>
                        <li className="active">Index</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-aqua">
                                <div className="inner">
                                    <h3>50</h3>

                                    <p>Bobot Nilai</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-green">
                                <div className="inner">
                                    <h3>53</h3>

                                    <p>Mahasiswa</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-yellow">
                                <div className="inner">
                                    <h3>43</h3>

                                    <p>Ruang</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add"></i>
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-xs-6">
                            <div className="small-box bg-red">
                                <div className="inner">
                                    <h3>65</h3>

                                    <p>Mata Kuliah</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
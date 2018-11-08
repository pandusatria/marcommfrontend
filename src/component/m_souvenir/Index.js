import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';
import DetailMSouvenir from './Detail';
import CreateMSouvenir from './Create';
import EditMSouvenir from './Edit';
import DeleteMSouvenir from './Delete';
import { AlertList } from 'react-bs-notifier'


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msouvenir : [],
            currentMSouvenir: {},
            alertData: {
                status: 99,
                message: ''
            },
            alerts : []
        };

        this.GetAll = this.GetAll.bind(this);
        this.viewModalHandler = this.viewModalHandler.bind(this);
        this.deleteModalHandler = this.deleteModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
    }

    async GetAll() {
        let result = await msouvenirapi.GetAll();

        if(result.status === 200)
        {
            console.log('Master Souvenir - Index.js Debugger');
            console.log(result.message);
            this.setState({
                msouvenir: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.GetAll();
    }

    viewModalHandler(msouvenirid) {
        let tmp = {};

        this.state.msouvenir.map((ele) => {
            if (msouvenirid === ele._id) {
                tmp = ele;
            }
        });

        this.setState({
            currentMSouvenir : tmp
        });
    };

    editModalHandler(msouvenirid){
        let obj = {};
        this.state.msouvenir.map((ele) => {
            if(ele._id === msouvenirid)
            {
                obj = ele;
            }
        });

        this.setState({
            currentMSouvenir : obj
        });
    };


    deleteModalHandler(msouvenirid){
        let obj = {};
        this.state.msouvenir.map((ele) => {
            if(ele._id === msouvenirid)
            {
                obj = ele;
            }
        });

        this.setState({
            currentMSouvenir : obj
        });
    };

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert);

        if(idx >= 0) {
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    modalStatus(status, message) {
        this.GetAll();
        this.setState({
            alertData : {
                status : status,
                message : message
            }
        });
        if(status === 1)
        {
        this.setState({
            alerts : [{
                type: "success",
                headline: "Good Job!",
                message: "Proccess Successfully"
            }]
        });
        }
        else if(status === 0)
        {
            this.setState({
                alerts : [{
                    type: "danger",
                    headline: "Whoa!",
                    message: "Proccess Failed"
                }]
            });
        }
    };

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Souvenir
                        <small>list all Souvenir</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> App</a></li>
                        <li><a href="#">Souvenir</a></li>
                        <li className="active">List</li>
                    </ol>
                </section>
                {
                    (this.state.alertData.status === 1) ?
                    <AlertList alerts={this.state.alerts} timeout={45} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                {
                  (this.state.alertData.status === 2) ?  
                  <AlertList alerts={this.state.alerts} timeout={45} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List All Souvenir</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create" style={{float : 'right'}}><i>Add</i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Souvenir Code</th>
                                                <th>Souvenir Name</th>
                                                <th>Unit</th>
                                                <th>Created Date</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.msouvenir.map((ele,x)=>
                                                    <tr key={ele._id}>
                                                        <td>{x+1}</td>
                                                        {/* <td>{ele._id}</td> */}
                                                        <td>{ele.code}</td>
                                                        <td>{ele.name}</td>
                                                        <td>{ele.m_unit_id}</td>
                                                        <td>{ele.created_date}</td>
                                                        <td>{ele.created_by}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-info" onClick = {() => {this.viewModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-view" style={{marginRight : '5px'}}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick = {() => {this.editModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-edit" style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
                                                            <button type="button" className="btn btn-danger" onClick = {() => {this.deleteModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-delete"><i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="modal-view">
                    <div className="modal-dialog">
                            <DetailMSouvenir
                                msouvenir = {this.state.currentMSouvenir}
                            />
                    </div>
                </div>
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                            <CreateMSouvenir
                            modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>
                <div class="modal fade" id="modal-edit">
                    <div class="modal-dialog">
                        <EditMSouvenir 
                            msouvenir = {this.state.currentMSouvenir}
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
                <div class="modal fade" id="modal-delete">
                    <div class="modal-dialog">
                        <DeleteMSouvenir 
                            msouvenir = {this.state.currentMSouvenir}
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
            </div>
        )
    }
};
export default Index
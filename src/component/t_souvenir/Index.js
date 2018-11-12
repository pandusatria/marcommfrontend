import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import tsouvenirapi from '../../handler/tsouvenir';
import employee_api from '../../handler/employee';
import CreateTSouvenir from './Create';
import DetailTSouvenir from './Detail';
//import DeleteTSouvenir from './Delete';
// import EditMSouvenir from './Edit';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tsouvenir : [],
            currenttsouvenir: {},
            alertData: {
                status: 99,
                message: '',
                id: ''

            },
            alerts : [],
            formdata: {
                code: '',
                name_receiver: '',
                received_date: '',
                created_date: '',
                created_by: '' 
            },
            createdDate: '',
            receivedDate: '',
            memployee : [],
            msouvenir : [],
            currentmsouvenir: {}
        };

        this.GetAll = this.GetAll.bind(this);
        this.viewModalHandler = this.viewModalHandler.bind(this);
        // this.deleteModalHandler = this.deleteModalHandler.bind(this);
        // this.editModalHandler = this.editModalHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
        this.searchSouvenir = this.searchSouvenir.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDateRcBy = this.handleChangeDateRcBy.bind(this);
        this.GetAllEmployee = this.GetAllEmployee.bind(this);
    }

    handleChangeDate(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createdDate: date
        });
        console.log(this.state.createdDate)
    }

    handleChangeDateRcBy(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            receivedDate: date
        });
        console.log(this.state.receivedDate)
    }

    textHandler(e){
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    

    async searchSouvenir(){
        var query = [];
        var obj = {};

        console.log("search" + this.state.formdata);
        console.log(this.state.formdata.code);
        console.log(this.state.formdata.name_receiver);
        console.log(this.state.receivedDate);
        console.log(this.state.createdDate);
        console.log(this.state.formdata.created_by);

        let TrsCode = this.state.formdata.code;
        let ReceivedBy = this.state.formdata.name_receiver;
        let ReceivedDate = moment(this.state.receivedDate).format("YYYY-MM-DD");
        let CreatedDate = moment(this.state.createdDate).format("YYYY-MM-DD");
        let CreatedBy = this.state.formdata.created_by;

        query.push({
            "id" : "is_delete",
            "value" : false
        });
            
        if(this.state.formdata.code === '' || this.state.formdata.code === null || typeof this.state.formdata.code === undefined || this.state.formdata.code === undefined){
        } 
        else
        {
            query.push({
                "id" : "code",
                "value" : TrsCode
            });
        }

        if(this.state.formdata.name_receiver === '' || this.state.formdata.name_receiver === null || typeof this.state.formdata.name_receiver === undefined || this.state.formdata.name_receiver === undefined) { 
        } 
        else
        {
            query.push({
                "id" : "name_receiver",
                "value" : ReceivedBy
            });
        }

        if(this.state.receivedDate === '' || this.state.receivedDate === null || typeof this.state.receivedDate === undefined || this.state.receivedDate === undefined) { 
        } 
        else
        {
            query.push({
                "id" : "received_date",
                "value" : ReceivedDate
            });
        }

        if(this.state.formdata.created_by === '' || this.state.formdata.created_by === null || typeof this.state.formdata.created_by === undefined || this.state.formdata.created_by === undefined) {
        } 
        else
        {
            query.push({
                "id" : "created_by",
                "value" : CreatedBy
            });
        }

        if(this.state.createdDate === '' || this.state.createdDate === null || typeof this.state.createdDate === undefined || this.state.createdDate === undefined) {
        } 
        else
        {
            query.push({
                "id" : "created_date",
                "value" : CreatedDate
            });
        }

        console.log(query);
        let result = await tsouvenirapi.GetAllTSouvenirHandlerSearch(query);

        if(result.status === 200)
        {
            console.log('Souvenir - Index.js Debugger : GetAllTSupplierHandlerSearch');
            console.log(result.message);
            this.setState({
                tsouvenir: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }


    async GetAll() {
        let result = await tsouvenirapi.GetAll();

        if(result.status === 200)
        {
            console.log('Transaction Souvenir - Index.js Debugger');
            console.log(result.message);
            this.setState({
                tsouvenir: result.message
            });
            console.log(this.state.tsouvenir)
        }
        else
        {
            console.log(result.message);
        }
    }

    async GetAllEmployee() {
        let result = await employee_api.GetAll();

        if(result.status === 200)
        {
            console.log('Master Employee - Index.js Debugger');
            console.log(result.message);
            this.setState({
                memployee: result.message
            });
            console.log(this.state.memployee)
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.GetAll();
        this.GetAllEmployee();
    }


    viewModalHandler(tsouvenirid, msouvenirid) {
        let tmp = {};
        let xmp = {};

        this.state.tsouvenir.map((ele) => {
            if (tsouvenirid === ele._id) {
                tmp = ele;
            }
        });

        this.state.msouvenir.map((ele => {
            if (msouvenirid === ele._id) {
                xmp = ele;
            }
        }))

        this.setState({
            currenttsouvenir : tmp,
            currentmsouvenir : xmp

        });
    };

    // editModalHandler(tsouvenirid){
    //     let obj = {};
    //     this.state.tsouvenir.map((ele) => {
    //         if(ele._id === tsouvenirid)
    //         {
    //             obj = ele;
    //         }
    //     });

    //     this.setState({
    //         currenttsouvenir : obj
    //     });
    // };


    // deleteModalHandler(tsouvenirid){
    //     let obj = {};
    //     this.state.tsouvenir.map((ele) => {
    //         if(ele._id === tsouvenirid)
    //         {
    //             obj = ele;
    //         }
    //     });

    //     this.setState({
    //         currenttsouvenir : obj
    //     });
    // };

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert);

        if(idx >= 0) {
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    modalStatus(status, message, id) {
        this.GetAll();
        this.setState({
            alertData : {
                status : status,
                message : message,
                id: id
            }
        });
        if(status === 1)
        {
        this.setState({
            alerts : [{
                type: "info",
                headline: "Data Deleted!",
                message: "Data Souvenir with code " + id + " has been deleted !"
            }]
        });
        }
        else if(status === 2)
        {
            this.setState({
                alerts : [{
                    type: "info",
                    headline: "Data Saved!",
                    message: "New Souvenir has been add with code " + id
                }]
            });
        }
        else if(status === 3)
        {
            this.setState({
                alerts : [{
                    type: "info",
                    headline: "Data Updated!",
                    message: "Data souvenir has been updated !"
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
                        List Souvenir Stock
                        {/* <small>list all Souvenir</small> */}
                    </h1>
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"><i className="fa fa-dashboard"></i> Home </a></li>
                        <li><a href="/souvenir"> Master </a></li>
                        <li className="active"> List Souvenir Stock </li>
                    </ol>
                </div>
                {
                    (this.state.alertData.status === 1 || this.state.alertData.status === 2 || this.state.alertData.status === 3) ?
                    <AlertList alerts={this.state.alerts} timeout={1000} position={"bottom-left"} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                {
                  (this.state.alertData.status === 0) ?  
                  <AlertList alerts={this.state.alerts} timeout={1000} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-md-10">
                                    </div>
                                    <div className="col-md-2" >
                                        <div style={{ float : 'right' }}>
                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Transaction Code" id="code" name="code" value={this.state.formdata.code} onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <select className="form-control" id="name_receiver" name="name_receiver" value={this.state.formdata.name_receiver} onChange={this.textHandler}>
                                                <option value="" > Received By </option>
                                                {
                                                    this.state.memployee.map((ele, x) => 
                                                        <option key={ele.employee_name} value={ele.employee_name}> {ele.employee_name} </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={this.state.receivedDate}
                                                    onChange={this.handleChangeDateRcBy}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Received Date">
                                                </DatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={this.state.createdDate}
                                                    onChange={this.handleChangeDate}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Created">
                                                </DatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Created By" id="created_by" name="created_by" value={this.state.formdata.created_by} onChange={this.textHandler}/>
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button type="button" class="btn btn-warning" onClick={this.searchSouvenir}>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Transaction Code</th>
                                                <th>Received By</th>
                                                <th>Received Date</th>
                                                <th>Created Date</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tsouvenir.map((ele,x)=>
                                                    <tr key={ele._id}>

                                                        <td>{x+1}</td>
                                                        {/* <td>{ele._id}</td> */}
                                                        <td>{ele.code}</td>
                                                        <td>{ele.name_receiver}</td>
                                                        <td>{moment (ele.received_date).format("DD/MM/YYYY")}</td>
                                                        <td>{moment (ele.created_date).format("DD/MM/YYYY")}</td>
                                                        <td>{ele.created_by}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-info" onClick = {() => {this.viewModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-view" style={{marginRight : '5px'}}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick = {() => {this.editModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-edit" style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
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
                            <DetailTSouvenir
                                tsouvenir = {this.state.currenttsouvenir}
                                msouvenir = {this.state.currentmsouvenir}
                            />
                    </div>
                </div>
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                            <CreateTSouvenir
                            tsouvenir = {this.setState.currenttsouvenir}
                            modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>
                {/* <div class="modal fade" id="modal-edit">
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
                </div> */}
            </div>
        )
    }
};
export default Index
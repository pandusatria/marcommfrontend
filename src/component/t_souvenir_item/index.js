import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import souvenir_item_api from '../../handler/souvenir_item';

import CreateRequest from './create';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata : {
                'transaction_code' : '',
                'request_by' : '',
                'status' : '',
                'created_by' : ''
            },
            request_date : '',
            due_date : '',
            created_date : '',
            souvenir_item : []
        }

        this.GetAll = this.GetAll.bind(this);
        this.textChange = this.textChange.bind(this);
        this.requestdateChange = this.requestdateChange.bind(this);
        this.duedateChange = this.duedateChange.bind(this);
        this.createddateChange = this.createddateChange.bind(this);
        this.search = this.search.bind(this);
    };

    textChange(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata);
    };

    requestdateChange(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            request_date: date,
        });
        console.log(this.state.request_date);
    };

    duedateChange(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            due_date: date,
        });
        console.log(this.state.due_date);
    };

    createddateChange(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            created_date: date,
        });
        console.log(this.state.created_date);
    };

    async search() {
        var query = [];
        var obj = {};

        let transaction_code = this.state.formdata.transaction_code;
        let request_by = this.state.formdata.request_by;

        let request_date = moment(this.state.request_date).format('DD-MM-YYYY');
        let due_date = moment(this.state.due_date).format('DD-MM-YYYY');

        let created_date = moment(this.state.created_date).format('DD-MM-YYYY');
        let created_by = this.state.formdata.created_by;

        let condition = this.state.formdata.status;
        let status = null;
        
        if( condition === "Submitted" || condition === "submitted" ) {
            status = 1;
        } else if( condition === "In Progress" || condition === "in progress" ) {
            status = 2;
        } else if( condition === "Received by Requester" || condition === "received by requester" ) {
            status = 3; 
        } else if( condition === "Settlement" || condition === "settlement" ) {
            status = 4;
        } else if( condition === "Settlement Approved" || condition === "settlement approved" ) {
            status = 5;
        } else if( condition === "Close Request" || condition === "close request" ) {
            status = 6;
        }  else if( condition === "Rejected" || condition === "rejected" ) {
            status = 0;
        } else {
            status = null;
        }

        query.push({ 
            "id" : "is_delete",
            "value" : false 
        });

        if(this.state.formdata.transaction_code === '' || this.state.formdata.transaction_code === null ||typeof this.state.formdata.transaction_code === undefined || this.state.formdata.transaction_code === undefined) {
            
        } else {
            query.push({ 
                "id" : "transaction_code",
                "value" : transaction_code
            });
        }

        if(this.state.formdata.request_by === '' || this.state.formdata.request_by === null ||typeof this.state.formdata.request_by === undefined || this.state.formdata.request_by === undefined) {
            
        } else {
            query.push({ 
                "id" : "request_by",
                "value" : request_by
            });
        }

        if(this.state.request_date === '' || this.state.request_date === null ||typeof this.state.request_date === undefined || this.state.request_date === undefined) {
            
        } else {
            query.push({ 
                "id" : "request_date",
                "value" : request_date
            });
        }

        if(this.state.due_date === '' || this.state.due_date === null ||typeof this.state.due_date === undefined || this.state.due_date === undefined) {
            
        } else {
            query.push({ 
                "id" : "due_date",
                "value" : due_date
            });
        }

        if(this.state.formdata.status === '' || this.state.formdata.status === null ||typeof this.state.formdata.status === undefined || this.state.formdata.status === undefined) {
            
        } else {
            query.push({ 
                "id" : "status",
                "value" : status
            });
        }

        if(this.state.created_date === '' || this.state.created_date === null ||typeof this.state.created_date === undefined || this.state.created_date === undefined) {
            
        } else {
            query.push({ 
                "id" : "created_date",
                "value" : created_date
            });
        }
        
        if(this.state.formdata.created_by === '' || this.state.formdata.created_by === null ||typeof this.state.formdata.created_by === undefined || this.state.formdata.created_by === undefined) {
            
        } else {
            query.push({ 
                "id" : "created_by",
                "value" : created_by
            });
        }

        console.log("Debug Search");
        console.log(query);
        let result = await souvenir_item_api.SearchRequest(query);

        if(result.status === 200) {
            console.log('replace current request souvenir with search list');
            console.log(result.message);
            this.setState({
                souvenir_item: result.message
            });
        } else {
            console.log(result.message);
        }
        
    };

    async GetAll() {
        let result = await souvenir_item_api.GetAll();

        console.log("debug all");
        console.log(result);

        if(result.status === 200) {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                souvenir_item : result.message
            });
            console.log(this.state.souvenir_item);
        } else {
            console.log(result.message); 
        }
    };

    componentDidMount() {
        this.GetAll();
    }

    render() {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h3>
                        <b> Transaction Souvenir Item </b>
                    </h3>
                    
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"> Home </a></li>
                        <li><a href="/souvenir_item"> Transaction Souvenir Item </a></li>
                        <li className="active"> List User </li>
                    </ol>
                </div>

                {/* {
                    (this.state.alertData.status === 1 || this.state.alertData.status === 2 || this.state.alertData.status === 3) ? <AlertList alerts={this.state.alerts} timeout={4000} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }
                {
                    (this.state.alertData.status === 0) ? <AlertList alerts={this.state.alerts} timeout={4000} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                } */}
                
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-11">
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button style={{ width: 65 }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" name="transaction_code" value={ this.state.formdata.transaction_code } onChange={ this.textChange } placeholder="Transaction Code"/>
                                        </div>
                                        <div className="col-md-1">
                                            <input type="text" className="form-control" name="request_by" value={ this.state.formdata.request_by } onChange={ this.textChange } placeholder="Request By"/>
                                        </div>
                                        <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.request_date}
                                                        onChange={this.requestdateChange}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD-MM-YYYY"
                                                        id="datepicker"
                                                        name="request_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText = "Request Date">
                                                    </DatePicker>
                                                </div>
                                        </div>
                                        <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.due_date}
                                                        onChange={this.duedateChange}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD-MM-YYYY"
                                                        id="datepicker"
                                                        name="due_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText = "Request Due Date">
                                                    </DatePicker>
                                                </div>
                                        </div>
                                        <div className="col-md-1">
                                            <input type="text" className="form-control" name="status" value={ this.state.formdata.status } onChange={ this.textChange } placeholder="Status"/>
                                        </div>
                                        <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.created_date}
                                                        onChange={this.createddateChange}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD-MM-YYYY"
                                                        id="datepicker"
                                                        name="created_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText = "Date">
                                                    </DatePicker>
                                                </div>
                                        </div>
                                        <div className="col-md-1">
                                            <input type="text" className="form-control" name="created_by" value={ this.state.formdata.created_by } onChange={ this.textChange } placeholder="Created By"/>
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button type="button" onClick={ this.search } className="btn btn-warning" >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th> No </th>
                                                <th> Transaction Code</th>
                                                <th> Request By </th>
                                                <th> Request Date </th>
                                                <th> Due Date </th>
                                                <th> Status </th>
                                                <th> Create Date </th>
                                                <th> Create By </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                this.state.souvenir_item.map((elemen, x) =>
                                                    <tr key={x}> 

                                                        <td> { x+1 } </td>
                                                        <td> { elemen.transaction_code } </td>
                                                        <td> { elemen.request_by } </td>
                                                        <td> { elemen.request_date } </td>
                                                        <td> { elemen.due_date } </td>
                                                        <td> 
                                                            { 
                                                                (elemen.status === 1) ? "Submitted" :
                                                                (elemen.status === 2) ? "In Progress" :
                                                                (elemen.status === 3) ? "Received by Requester" :
                                                                (elemen.status === 4) ? "Settlement" :
                                                                (elemen.status === 5) ? "Settlement Apporved" :
                                                                (elemen.status === 6) ? "Close Request" :
                                                                (elemen.status === 0) ? "Rejected" : ""
                                                            } 
                                                        </td>
                                                        <td> { elemen.created_date }</td>
                                                        <td> { elemen.created_by } </td>
                                                        <td>
                                                            <button className="btn btn-default" onClick={ () => {this.detailModalHandler(elemen._id)}} type="button" data-toggle="modal" data-target="#modal-detail" style={{ marginRight : '5px'}}> <i className="fa fa-search"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => {this.editModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-edit" style={{ marginRight : '5px'}}> <i className="fa fa-pencil"></i> </button>
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

                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                        <CreateRequest 
                            
                        />
                    </div>
                </div>

                {/* <div className="modal fade" id="modal-detail">
                    <div className="modal-dialog">
                        <DetailUser 
                            modalStatus = { this.modalStatus }
                            detailUser = { this.state.currentUser }
                        />
                    </div>
                </div>

                <div className="modal fade" id="modal-edit">
                    <div className="modal-dialog">
                        <EditUser 
                            modalStatus = { this.modalStatus }
                            editUser = { this.state.currentUser }
                        />
                    </div>
                </div>

                <div className="modal fade" id="modal-delete">
                    <div className="modal-dialog">
                        <DeleteUser 
                            modalStatus = { this.modalStatus }
                            deleteUser = { this.state.currentUser }
                        />
                    </div>
                </div> */}

            </div>
        )
    }
};

export default index;
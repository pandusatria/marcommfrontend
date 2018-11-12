import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import AutoGen from '../../common/autoGenerateNumber';

//import eventapi from '../../handler/eevent';
import souvenirapi from '../../handler/msouvenir';

class creatRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdataSouvenir: {
                code: '',
                t_event_id: '',
                request_by: '',
                request_date: '',
                request_due_date: '',
                note: ''
            },
            due_date: '',
            event: [],
            errors: {},
            formdataRequest: {
                m_souvenir_id: '',
                qty: '',
                note: ''
            },
            souvenir: []
        };
        this.textChanged = this.textChanged.bind(this);
        this.itemChanged = this.itemChanged.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.autoGenSouvenir = this.autoGenSouvenir.bind(this);
        // this.getEvent = this.getEvent.bind(this);
        this.getSouvenir = this.getSouvenir.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    };

    
    async autoGenSouvenir() {
        var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

        var reqby = "";
        if(userdata == null || typeof userdata == undefined)
        {
            reqby = "";
        }else{
            reqby = userdata[0].employee;
        }

        let result = await AutoGen.createCodeTSouvenir();
        console.log("autoGenSupplier");
        console.log(result);

        this.setState({
            formdataSouvenir: {
                code: result,
                request_by : reqby,
                request_date : moment().format("DD/MM/YYYY")
            }
        })
    };

    textChanged(e) {
        let tmp = this.state.formdataSouvenir;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdataSouvenir: tmp
        });
        console.log(this.state.formdataSouvenir);
    };

    dateChange(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            due_date: date
        });
        console.log(this.state.due_date);
    };

    itemChanged(e) {
        let tmp = this.state.formdataRequest;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdataRequest: tmp
        });
        console.log(this.state.formdataRequest);
    };

    handleValidation() {
        let fields = this.state.formdataSouvenir;
        let fields2 = this.state.formdataRequest;
        let errors = {};
        let formIsValid = true;

        if(!fields.code) {
            formIsValid = false;
            errors.code = "transaction code cannnot be empty";
        }

        if(!fields.t_event_id) {
            formIsValid = false;
            errors.t_event_id = "dont forget to select event";
        }

        if(!fields.request_by) {
            formIsValid = false;
            errors.request_by = "request by cannnot be empty";
        }

        if(!fields.request_date) {
            formIsValid = false;
            errors.t_event_id = "request date cannot be empty";
        }
        

        this.setState({  errors : errors });
        return formIsValid;
    };

    // async getEvent() {
    //     let result = await eventapi.GetAll();

    //     if(result.status === 200) {
    //         console.log('create.js Debugger success catching event');
    //         console.log(result.message);
    //         this.setState({
    //             event: result.message
    //         });
    //     } else {
    //         console.log(result.message);
    //     }
    // };

    async getSouvenir() {
        let result = await souvenirapi.GetAll();

        if(result.status === 200) {
            console.log('create.js Debugger success catching souvenir');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });
        } else {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.autoGenSouvenir();
        //this.getEvent();
        this.getSouvenir();
    }

    async submitHandler() {

        

        if(this.handleValidation()) {
            console.log("Debug add request souvenir");
            console.log(this.state.formdataSouvenir);
            // if(!this.state.formdataRequest) {
            //     alert("berisi");
            // } else {
            //     alert("kosong");
            // }
            console.log(this.state.formdataRequest);
        }

    }

    render() {
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnAdd" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Add Souvenir Request</h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Transaction Code</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="transaction_code" style= {{ marginTop : '10px'}} className="form-control" name="transaction_code" placeholder="masukan transaction code" value={ this.state.formdataSouvenir.code }  onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.code}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Event Code </p>
                                        <div className="col-sm-8">
                                        <select style= {{ marginTop : '10px'}} className="form-control" name="t_event_id" value={ this.state.formdataSouvenir.t_event_id } onChange={ this.textChanged }>
                                            <option value="">Select Event</option>
                                            {/* {
                                                this.state.event.map((elemen) =>
                                                    <option key={ elemen._id } value={ elemen._id }> { elemen.event_name } </option>
                                                )
                                            } */}
                                        </select>
                                        <span style={{color: "red"}}>{this.state.errors.t_event_id}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Request By</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="request_by" style= {{ marginTop : '10px'}} className="form-control" name="request_by" value={ this.state.formdataSouvenir.request_by } placeholder="masukan pe request"  onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.request_by}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Request Date</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="request_date" style= {{ marginTop : '10px'}} className="form-control" name="request_date" value={ this.state.formdataSouvenir.request_date } placeholder="masukan request date"  onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.request_date}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Due Date</p>
                                        <div className="col-sm-8">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.due_date}
                                                        onChange={this.dateChange}
                                                        className="form-control pull-right"
                                                        fixedHeight
                                                        dateFormat="DD-MM-YYYY"
                                                        id="datepicker"
                                                        name="request_due_date"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        placeholderText = "Date">
                                                    </DatePicker>
                                                </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Note</p>
                                        <div className="col-sm-8">
                                            <textarea ref="note" style= {{ marginTop : '10px'}} className="form-control" name="note" value={ this.state.formdataSouvenir.note } placeholder="Type Note"  onChange={ this.textChanged }/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="col-sm-5">
                                            <select style= {{ marginTop : '10px'}} className="form-control" name="m_souvenir_id" value={ this.state.formdataRequest.m_souvenir_id } onChange={ this.itemChanged }>
                                            <option value="">Select Souvenir</option>
                                                {
                                                    this.state.souvenir.map((elemen) =>
                                                        <option key={ elemen._id } value={ elemen._id }> { elemen.name } </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="number" ref="qty" style= {{ marginTop : '10px'}} className="form-control" name="qty" placeholder="qty" value={ this.state.formdataRequest.qty }  onChange={ this.itemChanged }></input>
                                        </div>
                                        <div className="col-sm-5">
                                            <input type="text" ref="note" style= {{ marginTop : '10px'}} className="form-control" name="note" placeholder="note" value={ this.state.formdataRequest.note }  onChange={ this.itemChanged }></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary">Save changes</button>
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        ) 
    }
};

export default creatRequest;
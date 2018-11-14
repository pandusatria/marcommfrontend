import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import AutoGen from '../../common/autoGenerateNumber';

import souveniritemapi from '../../handler/souvenir_item';
import eventapi from '../../handler/eevent';
import souvenirapi from '../../handler/msouvenir';

class creatRequest extends Component {
    idx = 0;
    constructor(props) {
        super(props);
        this.state = {
            formdataSouvenir: {
                code: '',
                t_event_id: '',
                request_by: '',
                request_date: '',
                request_due_date: '',
                note: '',
                formdataRequest: [{
                    id: '',
                    m_souvenir_id: '',
                    qty: '',
                    note: ''
                }]
            },
            due_date: '',
            event: [],
            errors: {},
            souvenir: []
        };
        this.textChanged = this.textChanged.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.autoGenSouvenir = this.autoGenSouvenir.bind(this);
        this.getEvent = this.getEvent.bind(this);
        this.getSouvenir = this.getSouvenir.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.addRow = this.addRow.bind(this);
        this.rowHandleChange = this.rowHandleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    };

    resetForm() {
        this.setState({
            formdataSouvenir: {
                t_event_id: '',
                request_due_date: '',
                note: '',
                formdataRequest: [{
                    id: '',
                    m_souvenir_id: '',
                    qty: '',
                    note: ''
                }]
            },
            due_date: '',
            errors: {}
        });
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

        let tmp = this.state.formdataSouvenir;
        tmp.code = result;
        tmp.request_by = reqby;
        tmp.request_date = moment().format("DD-MM-YYYY");

        this.setState({
            formdataSouvenir: tmp
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
        let tmp = this.state.formdataSouvenir;
        this.setState({
            formdata: tmp,
            due_date: date
        });
        console.log(this.state.due_date);
    };

    handleValidation() {
        let fields = this.state.formdataSouvenir;
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

    async getEvent() {
        let result = await eventapi.GetAll();

        if(result.status === 200) {
            console.log('create.js Debugger success catching event');
            console.log(result.message);
            this.setState({
                event: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    async getSouvenir() {
        let result = await souvenirapi.GetSelect();

        if(result.status === 200) {
            console.log('create.js Debugger success catching souvenir');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    rowHandleChange = index => e => {
        const { name, value } = e.target;
        var currRequest = this.state.formdataSouvenir;
        var request = currRequest.formdataRequest.find(o => o.id === index);
        request[name] = value;

        this.setState({
            formdataSouvenir: currRequest
        });

        console.log("rowHandleChange");
        console.log("idx : " + index);
        console.log("name : " + name);
        console.log("value : " + value);
    };

    deleteRow(index){
        var currRequest =this.state.formdataSouvenir;
        const selectIdx = currRequest.formdataRequest.findIndex(u => u.id === index);
        currRequest.formdataRequest.splice(selectIdx, 1);
        this.setState({
            formdataSouvenir: currRequest
        });
    };

    addRow(){
        var currRequest =this.state.formdataSouvenir;
        let _id = this.idx + 1;
        this.idx = this.idx + 1;

        var newRequest = {
            id: _id,
            m_souvenir_id: '',
            qty: '',
            note: ''
        };

        currRequest.formdataRequest.push(newRequest);
        this.setState({
            formdataSouvenir: currRequest
        });
    };

    componentDidMount(){
        this.autoGenSouvenir();
        this.getEvent();
        this.getSouvenir();
    }

    async submitHandler() {

        if(this.handleValidation()) {    
            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log("Debug add request souvenir");
            console.log(this.state.formdataSouvenir);

            var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

            let result = await souveniritemapi.insert(this.state.formdataSouvenir, this.state.due_date, userdata[0]._id);

            if(result.status === 200) {
                console.log("berhasil input data...");
                var code = this.state.formdataSouvenir.code;
                document.getElementById("hidePopUpBtnAdd").click();
                this.props.modalStatus(1, 'Success', code);
            } else {
                console.log("gagal input data...");
                document.getElementById("hidePopUpBtnAdd").click();
                this.props.modalStatus(0, 'Failed');
            }

            this.autoGenSouvenir();
        }

    }

    render() {
        console.log("this.state.formdataSouvenir");
        console.log(this.state.formdataSouvenir);
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnAdd" type="button" onClick={ this.resetForm } className="close" data-dismiss="modal" aria-label="Close">
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
                                            {
                                                this.state.event.map((elemen) =>
                                                    <option key={ elemen._id } value={ elemen._id }> { elemen.event_name } </option>
                                                )
                                            }
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

                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" onClick = {() => {this.addRow()}} style={{float : 'right'}}>Add item</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="box-body table-responsive no-padding">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Souvenir</th>
                                                    <th>Qty</th>
                                                    <th>Note</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    this.state.formdataSouvenir.formdataRequest.map((ele,x)=>
                                                        <tr id="addr0" key={ele._id}>
                                                            <td>{x+1}</td>
                                                            <td>
                                                                <select
                                                                className="form-control" 
                                                                name="m_souvenir_id" 
                                                                value={this.state.formdataSouvenir.formdataRequest[x].m_souvenir_id}
                                                                onChange={this.rowHandleChange(ele.id)}>
                                                                    <option value="">Select Souvenir</option>
                                                                    {
                                                                        this.state.souvenir.map((elemen) =>
                                                                            <option key={ elemen.name } value={ elemen._id }> { elemen.name } </option>
                                                                        )
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                type="number"
                                                                name="qty"
                                                                value={this.state.formdataSouvenir.formdataRequest[x].qty}
                                                                onChange={this.rowHandleChange(ele.id)}
                                                                className="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                type="text"
                                                                name="note"
                                                                value={this.state.formdataSouvenir.formdataRequest[x].note}
                                                                onChange={this.rowHandleChange(ele.id)}
                                                                className="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger" onClick = {() => {this.deleteRow(ele.id)}}><i className="fa fa-trash"></i></button>
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
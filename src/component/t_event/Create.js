import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import event_api from '../../handler/event';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutoGen from '../../common/autoGenerateNumber';
import moment from 'moment';

class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            formdata:
            {
                code        : '',
                event_name  : '',
                start_date  : '',
                end_date    : '',
                place       : '',
                budget      : '',
                request_by  : '', 
                request_date: '',
                note        : ''
            },
            errors: {},
            t_event: [],
            createStartDate : '',
            createEndDate : ''
        }


        this.resetForm = this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.autoGenEvent = this.autoGenEvent.bind(this);
    }


    //autogen
    async autoGenEvent() {
        var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));
        console.log("userdata")
        
        console.log(userdata)

        var reqby = ""
        if(userdata == null || typeof userdata == undefined)
        {
            reqby = ""
        }else{
            reqby = userdata[0].employee
        }

        let result = await AutoGen.createCodeEvent();
        console.log("autoGenEvent");
        console.log(result);
        this.setState({
            formdata:{
                code: result,
                request_by: reqby,
                request_date : moment().format("DD/MM/YYYY")
            }
        });
    }

    componentDidMount(){
        this.autoGenEvent();
        
        
    }
    
    handleChangeStartDate(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createStartDate : date 
        });
        console.log(this.state.createStartDate);
    }

    handleChangeEndDate(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createEndDate : date 
        });
        console.log(this.state.createEndDate);
    }

    resetForm(){
        this.setState({
            formdata:
            {
                event_name  : '',
                start_date  : '',
                end_date    : '',
                place       : '',
                budget      : '',
                note        : ''
            },
            errors: {}
        })
    }

    textChanged(e){
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata : tmp
        });
        console.log(this.state.formdata);
    }

    handleValidation(){
        let fields = this.state.formdata;
        console.log(fields);
        let errors = {};
        let formIsValid = true;

        if(typeof fields.code === "undefined" || fields.code === null || fields.code === ""){
            formIsValid = false;
            errors.err_code = "Code is empty!"
        }
        if(typeof fields.event_name === "undefined" || fields.event_name === null || fields.event_name === ""){
            formIsValid = false;
            errors.err_event_name = "Event Name is empty!"
        }
        if(typeof fields.start_date === "undefined" || fields.start_date === null || fields.start_date === ""){
            formIsValid = false;
            errors.err_start_date = "Start Date is empty!"
        }
        if(typeof fields.end_date === "undefined" || fields.end_date === null || fields.end_date === ""){
            formIsValid = false;
            errors.err_end_date = "End Date is empty!"
        }
        if(typeof fields.place === "undefined" || fields.place === null || fields.place === ""){
            formIsValid = false;
            errors.err_place = "Place is empty!"
        }
        if(typeof fields.budget === "undefined" || fields.budget === null || fields.budget === ""){
            formIsValid = false;
            errors.err_budget = "Budget is empty!"
        }
        if(typeof fields.request_by === "undefined" || fields.request_by === null || fields.request_by === ""){
            formIsValid = false;
            errors.err_request_by = "Request by is empty!"
        }
        if(typeof fields.request_date === "undefined" || fields.request_date === null || fields.request_date === ""){
            formIsValid = false;
            errors.err_request_date = "Request Date is empty!"
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    async submitHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);

        if(this.handleValidation()){
            let result = await event_api.insertNew(this.state.formdata);

            if(result.status === 200){
                console.log(result.message);
                document.getElementById("hidePopUpBtnAdd").click();
                this.props.modalStatus(3, 'Success');
            }else{
                console.log(result.message);
                document.getElementById("hidePopUpBtnAdd").click();
                this.props.modalStatus(0, 'Failed');
            }
        }
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button  id="hidePopUpBtnAdd" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 className="modal-title">Add Event Request </h5>
                </div>
               
                <div className="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Transaction Code</p>
                                            <div className="col-sm-9">
                                                <input name="code" ref="code" className="form-control" value={this.state.formdata.code} onChange={this.textChanged} placeholder="Auto Generate" disabled></input>
                                                <span className="help-block" style={{color: "red"}}>{this.state.errors.err_code}</span>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Type Event Name </p>
                                        <div className="col-sm-9">
                                            <input name="event_name" style= {{ marginTop : '10px'}} ref="event_name" className="form-control" value={this.state.formdata.event_name} onChange={this.textChanged} placeholder="Type Event Name"></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_event_name}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Type Event Place </p>
                                        <div className="col-sm-9">
                                            <input name="place" style= {{ marginTop : '10px'}} ref="place" className="form-control" value={this.state.formdata.place} onChange={this.textChanged} placeholder="Type Event Place"></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_place}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Event Start Date </p>
                                        <div className="col-sm-9">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={ this.state.createStartDate }
                                                    onChange={this.handleChangeStartDate}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Start Date">
                                                </DatePicker>
                                            </div>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_start_date}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Event End Date </p>
                                        <div className="col-sm-9">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={ this.state.createEndDate }
                                                    onChange={this.handleChangeEndDate}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "End Date">
                                                </DatePicker>
                                            </div>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_end_date}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Budget(Rp.) </p>
                                        <div className="col-sm-9">
                                            <input name="budget" style= {{ marginTop : '10px'}} ref="budget" className="form-control" value={this.state.formdata.budget} onChange={this.textChanged} placeholder="Type Event Budget"></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_budget}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Request By </p>
                                        <div className="col-sm-9">
                                            <input name="request_by" style= {{ marginTop : '10px'}} ref="request_by" className="form-control" value={this.state.formdata.request_by} onChange={this.textChanged} placeholder="" disabled ></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_request_by}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Request Date </p>
                                            <div className="col-sm-9">
                                                <input name="request_date" style= {{ marginTop : '10px'}} ref="request_date" className="form-control" value={this.state.formdata.request_date } onChange={this.textChanged} placeholder="" disabled></input>
                                                <span className="help-block" style={{color: "red"}}>{this.state.errors.err_request_date}</span>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                    <p className="col-sm-3 control-label"> Note </p>
                                        <div className="col-sm-9">
                                            <input name="note" style= {{ marginTop : '10px'}} ref="note" className="form-control" value={this.state.formdata.note} onChange={this.textChanged} placeholder="Type Note" ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal" style={{marginRight : '5px'}}>Cancel</button>
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary" style={{marginRight : '5px'}}>Save</button>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
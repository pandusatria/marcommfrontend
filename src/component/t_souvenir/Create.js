import React, { Component } from 'react';
import tsouvenirapi from '../../handler/tsouvenir';
import employee_api from '../../handler/employee';
import AutoGen from '../../common/autoGenerateNumber';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class CreateTSouvenir extends Component{
    constructor (props){
        super(props);

        this.state={
            formdata:{
                code:'',
                employee_name: '',
                received_date: '',
                note: ''
            },
            errors: {},
            receivedDate: '',
            memployee: []
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.GetAllEmployee = this.GetAllEmployee.bind(this);
        this.autoGenSouvenir = this.autoGenSouvenir.bind(this);
        this.handleChangeDateRcBy = this.handleChangeDateRcBy.bind(this);
    }

    handleChangeDateRcBy(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            receivedDate: date
        });
        console.log(this.state.receivedDate)
    }

    async autoGenSouvenir() {
        let result = await AutoGen.createCodeTSouvenir();
        console.log("autoGenSupplier");
        console.log(result);
        this.setState({
            formdata:{
                code: result
            }
        });
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
        this.GetAllEmployee();
        this.autoGenSouvenir();
    }

    resetForm() {
        this.setState({
            formdata:{
                employee_name: '',
                received_date: '',
                note: ''
            },
            errors: {}
        });
    }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata)
    }

    handleValidation(){
        let fields = this.state.formdata;
        let field = this.state;
        let errors = {};
        let formIsValid = true;
        
        if(typeof fields.employee_name === "undefined" || fields.employee_name === null || fields.employee_name === ""){
            formIsValid = false;
            errors.err_employee_name = "Employee Name is empty!";
        }

        if(typeof field.receivedDate === "undefined" || field.receivedDate === null || field.receivedDate === ""){
            formIsValid = false;
            errors.err_receivedDate = "Received Date is empty!";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    
    async submitHandler(){
        
        if(this.handleValidation()){
            let token = localStorage.getItem(appconfig.secure_key.token);
        
        
            console.log(this.state.formdata)
            let result = await tsouvenirapi.insertNew(this.state.formdata);
            
            if(result.status === 200)
            {
                console.log('Souvenir - Index.js Debugger');
                console.log(result.message);
                var scode = this.state.formdata.code
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(2, 'Success', scode);
                //this.autoGenSouvenir();
            } 
            else 
            {
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
                // this.autoGenSouvenir();
            }
            this.autoGenSouvenir();
        }
    };
    

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button  id="hidePopUpBtn" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title" >Add Souvenir Stock</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <p className="col-sm-3 control-label">*Transaction Code</p>
                                <div className="col-sm-9">
                                    <input ref="code" type="text" className="form-control" name="code" placeholder="Auto Generate" value={ this.state.formdata.code } disabled />
                                    <span style={{color: "red"}}>{this.state.errors.code}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <p className="col-sm-3 control-label">*Received By</p>
                                <div className="col-sm-9">
                                    <select className="form-control" id="employee_name" name="employee_name" value={this.state.memployee.employee_name} onChange={this.textChanged} >
                                        <option value="0"> - Select Employee -</option>
                                        {
                                            this.state.memployee.map((elemen) =>
                                                <option key={elemen.employee_name} value={elemen.employee_name}> {elemen.employee_name} </option>
                                            )
                                        }
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors.err_name_receiver}</span>
                                </div> 
                            </div>
                                                        
                            <div className="form-group">
                            <p className="col-sm-3 control-label">*Received Date</p>
                            <div className="col-sm-9">
                                <div className="input-group date">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                    <DatePicker
                                        selected={this.state.receivedDate}
                                        onChange={this.handleChangeDateRcBy}
                                        className="form-control pull-right"
                                        fixedHeight
                                        dateFormat="DD/MM/YYYY"
                                        id="datepicker"
                                        showMonthDropdown
                                        showYearDropdown
                                        placeholderText = "Select Date">
                                    </DatePicker>
                                </div>
                            </div>
                            </div>

                            <div className="form-group">
                                <p className="col-sm-3 control-label">Note</p>
                                <div className="col-sm-9">
                                    <textarea ref="description" type="text" className="form-control" name="description" rows="3" placeholder="Type Note" value={ this.state.formdata.note } onChange={ this.textChanged }></textarea>
                                    {/* <input ref="description" type="text" className="form-control" name="description" placeholder="Type Description" value={ this.state.formdata.note } onChange={ this.textChanged }></input> */}
                                    <span style={{color: "red"}}>{this.state.errors.note}</span>
                                </div> 
                            </div>    
                            
                        </div>
                    </form>
                </div>

                <div className="modal-body">
                    <div className="box-header">
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-1" >
                            <div style={{ float : 'pull-left' }}>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal" style={{marginRight : '5px'}}>Cancel</button>
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary" style={{marginRight : '5px'}}>Save</button>
                </div>
            </div>
        )
    }


}
export default CreateTSouvenir;
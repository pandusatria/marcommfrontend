import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import employee_api from '../../handler/employee';
import company_api from '../../handler/company';

class UpdateEmployee extends Component {
    constructor (props){
        super(props);

        this.state={
            formdata: {
                employee_number: '',
                first_name: '',
                last_name: '',
                m_company_id: '',
                email: ''
            },
            errors: {},
            m_company: []
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.GetAllCompany = this.GetAllCompany.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm(){
        this.setState({
            formdata:
            {
                employee_number: '',
                first_name: '',
                last_name: '',
                m_company_id: '',
                email: ''
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
    }

    async GetAllCompany(){
        let result = await company_api.GetAll();

        if(result.status === 200)
        {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                m_company: result.message
            });
            console.log(this.state.m_company);
        }else{
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.GetAllCompany();
    }

    handleValidation(){
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;

        if(typeof fields.employee_number === "undefined" || fields.employee_number === null || fields.employee_number === ""){
            formIsValid = false;
            errors.err_employee_number = "Employee Number is empty!";
        }
        else
        {
            if(!fields.employee_number.match(/^(([a-zA-Z0-9]{2})+\.)+(([a-zA-Z0-9]{2})+\.)+(([a-zA-Z0-9]{2})+\.)+([a-zA-Z0-9]{2})$/)){
                formIsValid = false;
                errors.err_employee_number = "Format of Employee Number is xx.xx.xx.xx";
            }
        }

        if(typeof fields.first_name === "undefined" || fields.first_name === null || fields.first_name === ""){
            formIsValid = false;
            errors.err_first_name = "First Name is empty!";
        }

        if(typeof fields.m_company_id === "undefined" || fields.m_company_id === null || fields.m_company_id === ""){
            formIsValid = false;
            errors.err_m_company_id = "Company Name is empty!";
        }

        if(typeof fields.email === "undefined" || fields.email === null || fields.email === ""){
            formIsValid = false;
            errors.err_email = "Company Name is empty!";
        }
        else
        {
            if(!fields.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
                formIsValid = false;
                errors.err_email = "Email is not valid";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    async updateHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        if(this.handleValidation()){
            console.log(this.state.formdata);
            // alert(this.state.formdata._id + this.state.formdata.nama_client)

            let result = await employee_api.Update(this.state.formdata);

            if (result.status === 200){
                console.log('Employee Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtnUpdt").click();
                this.props.modalStatus(2, 'Success');

            }else{
                console.log(result.message);
                document.getElementById("hidePopUpBtnUpdt").click();
                this.props.modalStatus(0, 'Failed');
            }
        }
    }

    submitHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            formdata : newProps.m_employee
        });
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnUpdt" type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick = { this.resetForm } >
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Edit Employee - {this.props.m_employee.employee_name} ({this.props.m_employee.employee_number}) </h4>
                </div>
               
                <div className="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Emp ID Number</p>
                                            <div className="col-sm-9">
                                                <input type="text" class="form-control" placeholder="Employee Number" 
                                                name="employee_number" value={this.state.formdata.employee_number} onChange={this.textChanged}/>
                                                <span className="help-block" style={{color: "red"}}>{this.state.errors.err_employee_number}</span>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *First Name </p>
                                        <div className="col-sm-9">
                                            <input name="first_name" ref="first_name" style= {{ marginTop : '10px'}} className="form-control" value={this.state.formdata.first_name}  onChange={this.textChanged} ></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_first_name}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> Last Name </p>
                                        <div className="col-sm-9">
                                            <input name="last_name" style= {{ marginTop : '10px'}} className="form-control" value={this.state.formdata.last_name}  onChange={this.textChanged} ></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Company Name </p>
                                        <div className="col-sm-9">
                                            <select className="form-control" id="m_company_id" name="m_company_id"  onChange={this.textChanged} value={this.state.formdata.m_company_id}>
                                                <option value="0"> Select Company Name </option>
                                                {
                                                    this.state.m_company.map((elemen) =>
                                                        <option key={elemen._id} value={elemen._id}> {elemen.name} </option>
                                                    )
                                                }
                                            </select>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_m_company_id}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <p className="col-sm-3 control-label"> Email </p>
                                        <div className="col-sm-9">
                                            <input name="email" style= {{ marginTop : '10px'}} className="form-control" value={this.state.formdata.email}  onChange={this.textChanged} ></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={ this.updateHandler }>Update</button>
                </div>
            </div>
        )
    }

}

export default UpdateEmployee;
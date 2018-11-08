import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import employee_api from '../../handler/employee';
import validate_api from '../../handler/validate';
import company_api from '../../handler/company'

class CreateEmployee extends Component{
    constructor(props){
        super(props);

        this.state={
            formdata:
            {
                employee_number: '',
                first_name: '',
                last_name: '',
                m_company_id: '',
                email: ''
            },
            errors: {},
            m_company: [],
        };
        //bind
        this.resetForm = this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.GetAllCompany = this.GetAllCompany.bind(this);
    };

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
        console.log(this.state.formdata)
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

    async submitHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);

        if(this.handleValidation()){
            
            let hasil = await validate_api.checkNumber(this.state.formdata.employee_number)

            console.log(hasil.message);

            if(hasil.message === "existing")
            {
                this.setState({
                    errors: {
                        err_employee_number : "Employee Number sudah ada!"
                    }
                });
            }
            else
            {

                let result = await employee_api.insertNew(this.state.formdata);

                if(result.status === 200){
                    console.log(result.message);
                    var create = this.state.formdata.employee_number;
                    document.getElementById("hidePopUpBtn").click();
                    this.props.modalStatus(3, 'Success', create );
                }else{
                    console.log(result.message);
                    var create = this.state.formdata.employee_number;
                    document.getElementById("hidePopUpBtn").click();
                    this.props.modalStatus(0, 'Failed', create);
                }
            }

        }
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button  id="hidePopUpBtn" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 className="modal-title">Add Employee </h5>
                </div>
               
                <div className="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Emp ID Number</p>
                                            <div className="col-sm-9">
                                                <input name="employee_number" ref="employee_number" className="form-control" value={this.state.formdata.employee_number} onChange={this.textChanged} placeholder="Type Emp ID Number"></input>
                                                <p> Format : xx.xx.xx.xx </p>
                                                <span className="help-block" style={{color: "red"}}>{this.state.errors.err_employee_number}</span>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *First Name </p>
                                        <div className="col-sm-9">
                                            <input name="first_name" style= {{ marginTop : '10px'}} ref="first_name" className="form-control" value={this.state.formdata.first_name} onChange={this.textChanged} placeholder="Type First Name"></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_first_name}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> Last Name </p>
                                        <div className="col-sm-9">
                                            <input name="last_name" style= {{ marginTop : '10px'}} ref="last_name" className="form-control" value={this.state.formdata.last_name} onChange={this.textChanged} placeholder="Type Last Name"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Company Name </p>
                                        <div className="col-sm-9">
                                            <select className="form-control" id="m_company_id" name="m_company_id" onChange={this.textChanged} >
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
                                            <input name="email" style= {{ marginTop : '10px'}} ref="email" className="form-control" value={this.state.formdata.email} onChange={this.textChanged} placeholder="Type Email" ></input>
                                            <span className="help-block" style={{color: "red"}}>{this.state.errors.err_email}</span>
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
export default CreateEmployee;
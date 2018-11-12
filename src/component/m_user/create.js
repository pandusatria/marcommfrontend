import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import userapi from '../../handler/user';
import roleapi from '../../handler/role';
import employeeapi from '../../handler/employee';
import validateapi from '../../handler/validate';

class createUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                username       : '',
                password       : '',
                repassword     : '',
                m_role_id      : '',
                m_employee_id  : ''
            },
            role: [],
            employee: [],
            errors: {}
            //alertAdd: false
        };

        this.textChanged = this.textChanged.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getRole = this.getRole.bind(this);
        this.getEmployee = this.getEmployee.bind(this);
    };

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata);
    };

    resetForm() {
        this.setState({
            formdata: {
                username       : '',
                password       : '',
                repassword     : '',
                m_role_id      : '',
                m_employee_id  : ''
            },
            errors: {}
        });
    };

    handleValidation() {
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;

        if(!fields.m_role_id) {
            formIsValid = false;
            errors.m_role_id = "dont forget to select role";
        }

        if(!fields.m_employee_id) {
            formIsValid = false;
            errors.m_employee_id = "dont forget to select employee";
        }

        if(!fields.username) {
            formIsValid = false;
            errors.username = "username cannot be empty";
        } else if(!fields.username.match(/^(?=.*\d).{8,}$/)) {
            formIsValid = false;
            errors.username = "username must be contain letter and number, length minimal 8"
        }

        if(!fields.password) {
            formIsValid = false;
            errors.password = "password cannot be empty";
        } else if(!fields.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            formIsValid = false;
            errors.password = "password must be contain uppercase, letter and number, length minimal 8"
        }

        if(fields.repassword !== fields.password) {
            formIsValid = false;
            errors.repassword = "password didn't match";
        }

        this.setState({ errors : errors });
        return formIsValid;

    };

    async getRole() {
        let result = await roleapi.GetAll();

        if(result.status === 200) {
            console.log('create.js Debugger success catching role');
            console.log(result.message);
            this.setState({
                role: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    async getEmployee() {
        let result = await employeeapi.GetNew();
 
        if(result.status === 200) {
            console.log('create.js Debugger success catching employee');
            console.log(result.message);
            this.setState({
                employee: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    componentDidMount() {
        this.getRole();
        this.getEmployee();
    };

    async submitHandler() {

        if(this.handleValidation()) {
            let hasil = await validateapi.checkUsername(this.state.formdata.username);

            if(hasil.message === "existing") {
                this.setState({
                    errors: {
                        username: "username is existing"
                    }
                })
            } else {
                let token = localStorage.getItem(appconfig.secure_key.token);
                console.log("Debug formdata");
                console.log(this.state.formdata);

                let result = await userapi.insert(this.state.formdata);

                if(result.status === 200) {
                    console.log("berhasil input data...");
                    var user = this.state.formdata.username;
                    document.getElementById("hidePopUpBtnAdd").click();
                    this.props.modalStatus(1, 'Success', user);
                } else {
                    console.log("gagal input data...");
                    document.getElementById("hidePopUpBtnAdd").click();
                    this.props.modalStatus(0, 'Failed');
                }
            }

        }

    };

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnAdd" type="button" onClick={ this.resetForm } className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Add User</h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Role Name</p>
                                        <div className="col-sm-8">
                                        <select style= {{ marginTop : '10px'}} className="form-control" name="m_role_id" value={ this.state.formdata.m_role_id } onChange={ this.textChanged }>
                                            <option value="">Select Role Name</option>
                                            { 
                                                this.state.role.map((elemen) =>
                                                    <option key={ elemen._id } value={ elemen._id }> { elemen.name } </option>
                                                ) 
                                            }
                                        </select>
                                        <span style={{color: "red"}}>{this.state.errors.m_role_id}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Employee Name </p>
                                        <div className="col-sm-8">
                                        <select style= {{ marginTop : '10px'}} className="form-control" name="m_employee_id" value={ this.state.formdata.m_employee_id } onChange={ this.textChanged }>
                                            <option value="">Select Employee Name</option>
                                            {
                                                this.state.employee.map((elemen) =>
                                                    <option key={ elemen._id } value={ elemen._id }> { elemen.employee_name } </option>
                                                )
                                            }
                                        </select>
                                        <span style={{color: "red"}}>{this.state.errors.m_employee_id}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Username </p>
                                        <div className="col-sm-8">
                                            <input type="text" ref="username" style= {{ marginTop : '10px'}} className="form-control" name="username" placeholder="masukan username" value={ this.state.formdata.username } onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.username}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" ref="password" style= {{ marginTop : '10px'}} className="form-control" name="password" placeholder="masukan password" value={ this.state.formdata.password } onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.password}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Re-type Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" ref="repassword" style= {{ marginTop : '10px'}} className="form-control" name="repassword" placeholder="masukan ulang password" value={ this.state.formdata.repassword } onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.repassword}</span>
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
}

export default createUser;
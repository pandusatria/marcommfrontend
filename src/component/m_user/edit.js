import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import userapi from '../../handler/user';
import roleapi from '../../handler/role';
import employeeapi from '../../handler/employee';

class editUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata: {
                _id            : '', 
                username       : '',
                password       : '',
                repassword     : '',
                m_role_id      : '',
                m_employee_id  : ''
            },
            role: [],
            employee: [],
            errors: {}
        };

        this.textChanged = this.textChanged.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
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
        console.log("click reset");
        this.setState({
            formdata: {
                _id            : '', 
                username       : '',
                password       : '',
                repassword     : '',
                m_role_id      : '',
                m_employee_id  : ''
            },
            errors: {}
        });
        console.log("datanya : " + localStorage.getItem("employee_id"));
        localStorage.removeItem("employee_id");
        console.log("datanya : " + localStorage.getItem("employee_id"));
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

        // if(fields.repassword !== fields.password) {
        //     formIsValid = false;
        //     errors.repassword = "password didn't match";
        // }

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
        
        // let id = localStorage.getItem("employee_id");

        // if(typeof id !== undefined || id !== null) {
        //     var result = await employeeapi.GetNewEdit();
        // } else {
        //     var result = await employeeapi.GetAll();
        // }

        let result = await employeeapi.GetAll();

        if(result.status === 200) {
            console.log('create.js Debugger success catching employee');
            console.log(result.message);
            this.setState({
                employee: result.message
            });
            //console.log("sukses clear")
            // localStorage.removeItem("employee_id");
            //console.log(localStorage.getItem("employee_id"));
        } else {
            //console.log(result.message);
            // localStorage.removeItem("employee_id");
        }
    };

    // buat data yg dikirim dari index bisa ke maping dan di edit
    componentWillReceiveProps(newProps){
        console.log("URGENT!!!!!!!!");
        this.setState({
            formdata: {
                _id            : newProps.editUser._id, 
                username       : newProps.editUser.username,
                password       : newProps.editUser.password,
                repassword     : newProps.editUser.repassword,
                m_role_id      : newProps.editUser.m_role_id,
                m_employee_id  : newProps.editUser.m_employee_id
            },
        });
        console.log("inject succesfully");
        console.log(newProps.editUser);
    }

    componentDidMount() {
        this.getRole();
        this.getEmployee();
        //this.getEmployee(localStorage.getItem("employee_id"));
        //console.log("baca" + this.props.editUser.m_employee_id);
    };

    async updateHandler() {

        if(this.handleValidation()) {
            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log("Debug formdata edit");
            console.log(this.state.formdata);

            let result = await userapi.update(this.state.formdata);

            if(result.status === 200) {
                console.log("berhasil update data...");
                document.getElementById("hidePopUpBtnEdit").click();
                this.props.modalStatus(2, 'Success', this.props.editUser.username);
            } else {
                console.log("gagal update data...");
                document.getElementById("hidePopUpBtnEdit").click();
                this.props.modalStatus(0, 'Failed');
            }
        }

    };

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" id="hidePopUpBtnEdit" className="close" data-dismiss="modal" onClick={ this.resetForm } aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Edit User - {this.state.formdata.employee} ({this.state.formdata.username}) </h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-6">             

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Role Name</p>
                                            <div className="col-sm-8">
                                            <input type="hidden" className="form-control" name="_id" value={ this.state.formdata._id }></input>
                                                <select style= {{ marginTop : '10px'}} className="form-control" id="m_role_id" name="m_role_id" value={ this.state.formdata.m_role_id } onChange={ this.textChanged }>
                                                    {
                                                        this.state.role.map((elemen) =>
                                                            <option key={ elemen._id } value={ elemen._id }> { elemen.name } </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Employee Name </p>
                                        <div className="col-sm-8">
                                            <select style= {{ marginTop : '10px'}} className="form-control" name="m_employee_id" value={ this.state.formdata.m_employee_id } onChange={ this.textChanged }>
                                                {
                                                    this.state.employee.map((elemen) =>
                                                        <option key={ elemen._id } value={ elemen._id }> { elemen.employee_name } </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Username </p>
                                        <div className="col-sm-8">
                                            <input type="text" ref="username" style= {{ marginTop : '10px'}} className="form-control" name="username" value={this.state.formdata.username} onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.username}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" ref="username" style= {{ marginTop : '10px'}} className="form-control" name="password" value={this.state.formdata.password} onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.password}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Re-type Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" ref="repassword" style= {{ marginTop : '10px'}} className="form-control" name="repassword" value={this.state.formdata.password} onChange={ this.textChanged }></input>
                                            <span style={{color: "red"}}>{this.state.errors.repassword}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={ this.updateHandler } className="btn btn-primary">Save changes</button>
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        )
    };
};

export default editUser;
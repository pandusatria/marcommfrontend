import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user_api from '../../handler/user';
import moment from 'moment';

import roleapi from '../../handler/role';
import employeeapi from '../../handler/employee';
import companyapi from '../../handler/company';

import DetailUser from './detail';
import CreateUser from './create';
import EditUser from './edit';
import DeleteUser from './delete';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formdata : {
                employee_name: '',
                role_name: '',
                company_name: '',
                username: '',
                created_date: '',
                created_by: ''
            },
            employee: [],
            role: [],
            company: [],
            created_date: '',
            user : [],
            currentUser : {},
            alertData: {
                status: 99,
                message: '',
                username: ''
            },
            alerts : [],
        };

        this.GetAll = this.GetAll.bind(this);
        this.getRole = this.getRole.bind(this);
        this.getEmployee = this.getEmployee.bind(this);
        this.getCompany = this.getCompany.bind(this);
        this.search = this.search.bind(this);
        this.detailModalHandler = this.detailModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.deleteModalHandler = this.deleteModalHandler.bind(this);
        this.textChange = this.textChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
    };

    textChange(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata);
    };

    dateChange(date) {
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            created_date: date
        });
        console.log(this.state.created_date);
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
        let result = await employeeapi.GetAll();
 
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

    async getCompany() {
        let result = await companyapi.GetAll();

        if(result.status === 200) {
            console.log('create.js Debugger success catching company');
            console.log(result.message);
            this.setState({
                company: result.message
            });
        } else {
            console.log(result.message);
        }
    }

    async search() {
        var query = [];
        var obj = {};

        let employee_name = this.state.formdata.employee_name;
        let role_name = this.state.formdata.role_name;
        let company_name = this.state.formdata.company_name;
        let username = this.state.formdata.username;
        let created_by = this.state.formdata.created_by;
        let created_date = moment(this.state.created_date).format('DD-MM-YYYY');

        query.push({ 
            "id" : "is_delete",
            "value" : false 
        });

        if(this.state.formdata.employee_name === '' || this.state.formdata.employee_name === null ||typeof this.state.formdata.employee_name === undefined || this.state.formdata.employee_name === undefined) {
            
        } else {
            query.push({ 
                "id" : "employee",
                "value" : employee_name
            });
        }

        if(this.state.formdata.role_name === '' || this.state.formdata.role_name === null ||typeof this.state.formdata.role_name === undefined || this.state.formdata.role_name === undefined) {
            
        } else {
            query.push({ 
                "id" : "role",
                "value" : role_name
            });
        }

        if(this.state.formdata.company_name === '' || this.state.formdata.company_name === null ||typeof this.state.formdata.company_name === undefined || this.state.formdata.company_name === undefined) {
            
        } else {
            query.push({ 
                "id" : "company_name",
                "value" : company_name
            });
        }

        if(this.state.formdata.username === '' || this.state.formdata.username === null ||typeof this.state.formdata.username === undefined || this.state.formdata.username === undefined) {
            
        } else {
            query.push({ 
                "id" : "username",
                "value" : username
            });
        }

        if(this.state.created_date === '' || this.state.created_date === null ||typeof this.state.created_date === undefined || this.state.created_date === undefined) {
            
        } else {
            query.push({ 
                "id" : "created_date",
                "value" : created_date
            });
        }

        if(this.state.formdata.created_by === '' || this.state.formdata.created_by === null ||typeof this.state.formdata.created_by === undefined || this.state.formdata.created_by === undefined ) {
            
        } else {
            query.push({ 
                "id" : "created_by",
                "value" : created_by
            });
        }
        
        console.log("Debug Search");
        console.log(query);
        let result = await user_api.SearchUser(query);

        if(result.status === 200) {
            console.log('replace current user with search list');
            console.log(result.message);
            this.setState({
                user: result.message
            });
        } else {
            console.log(result.message);
        }
        
    };

    async GetAll() {
        let result = await user_api.GetAll();

        if(result.status === 200) {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                user: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    modalStatus(status, message, username){
        this.GetAll();
        this.setState({
            alertData : {
                status : status,
                message : message,
                username : username
            }
        });

        if(status === 0){
            this.setState({
                alerts : [{
                    type: "danger",
                    message: "Process failed!"
                }]
            });
        } else if(status === 1){
            // insert
            this.setState({
                alerts : [{
                    type: "info",
                    message: "Data Saved! New User has been add with username " + username
                }]
            });
        } else if(status === 2){
            // edit
            this.setState({
                alerts : [{
                    type: "info",
                    message: "Data Updated! Data with username " + username + " has been updated!"
                }]
            });
        } else if(status === 3){
            // delete
            this.setState({
                alerts : [{
                    type: "info",
                    message: "Data Deleted! Data with username " + username + " has been deleted!"
                }]
            });
        }
    }

    onAlertDismissed(alert){
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert); // buat array
        console.log(idx);
        if(idx >= 0){
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx+1)]
            });
        }
    };

    componentDidMount() {
        this.GetAll();
        this.getRole();
        this.getEmployee();
        this.getCompany();
    };

    detailModalHandler(user_id) {
        var tmp = {};

        this.state.user.map((ele) => {
            if(ele._id === user_id) {
                tmp = ele
            }
        });

        this.setState({
            currentUser : tmp
        });
    };

    editModalHandler(user_id) {
        var tmp = {};

        this.state.user.map((ele) => {
            if(ele._id === user_id) {
                tmp = ele
            }
        });

        this.setState({
            currentUser : tmp
        });

        console.log("memberikan id_employee");
        localStorage.setItem("employee_id", this.state.currentUser.m_employee_id);
        console.log(localStorage.getItem("employee_id"));
    };

    deleteModalHandler(user_id) {
        var tmp = {};

        this.state.user.map((ele) => {
            if(ele._id === user_id) {
                tmp = ele
            }
        });

        this.setState({
            currentUser : tmp
        });
    };

    render() {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h3>
                        <b> User List </b>
                    </h3>
                    
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"> Home </a></li>
                        <li><a href="/user"> Master </a></li>
                        <li className="active"> List User </li>
                    </ol>
                </div>

                {
                    (this.state.alertData.status === 1 || this.state.alertData.status === 2 || this.state.alertData.status === 3) ? <AlertList alerts={this.state.alerts} timeout={4000} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }
                {
                    (this.state.alertData.status === 0) ? <AlertList alerts={this.state.alerts} timeout={4000} onDismiss={this.onAlertDismissed.bind(this)} /> : ''
                }
                
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
                                            <select className="form-control" name="employee_name" value={ this.state.formdata.employee_name } onChange={ this.textChange }>
                                                <option value="">Select Employee Name</option>
                                                {
                                                    this.state.employee.map((elemen) => 
                                                    <option key={ elemen._id } value={ elemen.employee_name }> { elemen.employee_name } </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <select className="form-control" name="role_name" value={ this.state.formdata.role_name } onChange={ this.textChange }>
                                                <option value="">Select Role Name</option>
                                                {
                                                    this.state.role.map((elemen) => 
                                                    <option key={ elemen._id } value={ elemen.name }> { elemen.name } </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="form-control" name="company_name" value={ this.state.formdata.company_name } onChange={ this.textChange }>
                                                <option value="">Select Company Name</option>
                                                {
                                                    this.state.company.map((elemen) => 
                                                    <option key={ elemen._id } value={ elemen.name }> { elemen.name } </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-1">
                                            <input type="text" className="form-control" name="username" value={ this.state.formdata.username } onChange={ this.textChange } placeholder="Username"/>
                                        </div>
                                        <div className="col-md-2">
                                                <div className="input-group date">
                                                    <DatePicker
                                                        selected={this.state.created_date}
                                                        onChange={this.dateChange}
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
                                                <th> Employee </th>
                                                <th> Role </th>
                                                <th> Company </th>
                                                <th> Username </th>
                                                <th> Create Date </th>
                                                <th> Create By </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.user.map((elemen, x) =>
                                                    <tr key={x}> 

                                                        <td> { x+1 } </td>
                                                        <td> { elemen.employee } </td>
                                                        <td> { elemen.role } </td>
                                                        <td> { elemen.company } </td>
                                                        <td> { elemen.username } </td>
                                                        <td> { elemen.created_date }</td>
                                                        <td> { elemen.created_by } </td>
                                                        <td>
                                                            <button className="btn btn-default" onClick={ () => {this.detailModalHandler(elemen._id)}} type="button" data-toggle="modal" data-target="#modal-detail" style={{ marginRight : '5px'}}> <i className="fa fa-search"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => {this.editModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-edit" style={{ marginRight : '5px'}}> <i className="fa fa-pencil"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => { this.deleteModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-delete"> <i className="fa fa-trash"></i> </button>
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

                <div className="modal fade" id="modal-detail">
                    <div className="modal-dialog">
                        <DetailUser 
                            modalStatus = { this.modalStatus }
                            detailUser = { this.state.currentUser }
                        />
                    </div>
                </div>
                
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                        <CreateUser 
                            modalStatus = { this.modalStatus }
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
                </div>

            </div>
        )
    }
};

export default index;
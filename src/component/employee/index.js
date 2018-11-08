import React ,{ Component } from 'react';
import { AlertList } from 'react-bs-notifier'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import company_api from '../../handler/company';
import employee_api from '../../handler/employee';
import DetailEmployee from './detail';
import CreateEmployee from './create';
import EditEmployee from './edit';
import DeleteEmployee from './delete'

class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            m_employee : [],
            currEmployee : {},
            alertData: {
                status: 99,
                message: '',
                id: ''
            },
            alerts: [],
            formdata: {
                employee_number: '',
                employee_name: '',
                company_name: '',
                created_date: '',
                created_by: ''
           },
           createdDate: '',
           m_company: [],

        }

        this.GetAll = this.GetAll.bind(this);
        this.detailModalHandler = this.detailModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.deleteModalHandler = this.deleteModalHandler.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.searchEmployee = this.searchEmployee.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.GetAllCompany = this.GetAllCompany.bind(this);
    }

    handleChangeDate(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createdDate: date
        });
        console.log(this.state.createdDate)
    }

    textHandler(e){
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    async searchEmployee(){
        let result = await employee_api.GetAll();

        if(result.status === 200){
            console.log('Employee index.js Debugger : getAllEmployeeSearch');
            console.log(result.message);

            let currEmployee = result.message;
            console.log("currEmployee");
            console.log(currEmployee);
            let array = [];

            console.log(this.state.formdata.employee_number);
            console.log(this.state.formdata.employee_name);
            console.log(this.state.formdata.company_name);
            // console.log(this.state.createdDate._d);
            console.log(moment(this.state.createdDate).format("DD/MM/YYYY"));
            console.log(this.state.formdata.created_by);

            let EmployeeNumber = this.state.formdata.employee_number;
            let Name = this.state.formdata.employee_name;
            let NameCompany = this.state.formdata.company_name;
            // let CreatedDate = this.state.createdDate;
            let CreatedDate = moment(this.state.createdDate).format("DD/MM/YYYY");
            let CreatedBy = this.state.formdata.created_by;

            // console.log("Tanggalnya ya")
            // console.log(CreatedDate);

            let NullEmployeeNumber = false;
            let NullEmployeeName = false;
            let NullCompanyName = false;
            let NullCreatedDate = false;
            let NullCreatedBy = false;

            if (typeof EmployeeNumber === "undefined" || EmployeeNumber === null || EmployeeNumber === ''){
                NullEmployeeNumber = true;
            }

            if (typeof Name === "undefined" || Name === null || Name === ''){
                NullEmployeeName = true;
            }

            if (typeof NameCompany === "undefined" || NameCompany === null || NameCompany === ''){
                NullCompanyName = true;
            }

            if (typeof CreatedDate === "undefined" || CreatedDate === null || CreatedDate === '' || CreatedDate === "Invalid date"){
                NullCreatedDate = true;
            }

            if (typeof CreatedBy === "undefined" || CreatedBy === null || CreatedBy === ''){
                NullCreatedBy = true;
            }

            console.log('NullEmployeeNumber : '+ NullEmployeeNumber);
            console.log('NullEmployeeName : '+ NullEmployeeName);
            console.log('NullCompanyName : '+ NullCompanyName);
            console.log('NullCreatedDate : '+ NullCreatedDate);
            console.log('NullCreatedBy : '+ NullCreatedBy);

            for(let i = 0; i < currEmployee.length; i++ ){
                if(!NullEmployeeNumber)
                {
                    console.log("Employee number 1")
                    if(!NullEmployeeName)
                    {
                        if(!NullCompanyName)
                        {
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            // console.log("1");
                                            array.push(currEmployee[i]);
                                        }

                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate )
                                        {
                                            console.log("2");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("3");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany )
                                        {
                                            console.log("4");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }else{
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("5");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("6");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("7");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].employee_name === Name )
                                        {
                                            console.log("8");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }
                    }
                    else
                    {
                    console.log("Employee number 2")

                        if(!NullCompanyName)
                        {
                            console.log("Employee number 4")

                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if( currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("9");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("10");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].company_name === NameCompany &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("11");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].company_name === NameCompany )
                                        {
                                            console.log("12");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }else{
                            console.log("Employee number 3")

                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("13");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("14");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("15");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(currEmployee[i].employee_number === EmployeeNumber )
                                        {
                                            console.log("16");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }
                    }
                }
                else
                {
                    if(!NullEmployeeName)
                    {
                        if(!NullCompanyName)
                        {
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("17");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("18");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("19");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].company_name === NameCompany )
                                        {
                                            console.log("20");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }else{
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("21");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("22");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].employee_name === Name && 
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("23");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].employee_name === Name )
                                        {
                                            console.log("24");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }
                    }
                    else
                    {
                        if(!NullCompanyName)
                        {
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("25");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].company_name === NameCompany &&
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("26");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].company_name === NameCompany &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("27");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        currEmployee[i].company_name === NameCompany )
                                        {
                                            console.log("28");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                        }else{
                            if(!NullCreatedDate)
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  &&
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("29");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    if(
                                        moment(currEmployee[i].created_date).format("DD/MM/YYYY") === CreatedDate  )
                                        {
                                            console.log("30");
                                            array.push(currEmployee[i]);
                                        }
                                }
                            }
                            else
                            {
                                if(!NullCreatedBy)
                                {
                                    if(
                                        currEmployee[i].created_by === CreatedBy )
                                        {
                                            console.log("31");
                                            array.push(currEmployee[i]);
                                        }
                                }
                                else
                                {
                                    console.log("32");
                                    array.push(currEmployee[i]);
                                        
                                }
                            }
                        }
                    }
                }
            }

            console.log(array);

            this.setState({
                m_employee: array
            });
            
        }else{
            console.log(result.message);
        }
    }

    async GetAll(){
        let result = await employee_api.GetAll();

        if (result.status === 200)
        {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                m_employee: result.message
            })
            console.log(this.state.m_employee)
        }else{
            console.log(result.message)
        }
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
        this.GetAll();
        this.GetAllCompany();
    }

    detailModalHandler(employee_id){
        var tmp = {};

        this.state.m_employee.map((ele) => {
            if(ele._id === employee_id){
                tmp = ele
            }
        });

        this.setState({
            currEmployee : tmp
        });
    }
    
    editModalHandler(employeeid){
        let obj = {};
        this.state.m_employee.map((ele) => {
            if(ele._id === employeeid)
            {
                obj = ele;
            }
        });

        this.setState({
            currEmployee : obj
        });
    };

    deleteModalHandler(employeeid){
        let obj = {};
        this.state.m_employee.map((ele) => {
            if(ele._id === employeeid){
                obj = ele;
            }
        });

        this.setState({
            currEmployee : obj
        });
    }

    onAlertDismissed(alert) {
        const alerts = this.state.alerts;
        const idx = alerts.indexOf(alert);

        if(idx >= 0) {
            this.setState({
                alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
            });
        }
    }

    modalStatus(status, message, id) {
        this.GetAll();
        this.setState({
            alertData : {
                status : status,
                message : message,
                id : id
            }
        });
        //delete
        if(status === 1)
        {
        this.setState({
            alerts : [{
                type: "info",
                headline: "Data Deleted!",
                message: "Data Deleted! Data employee with Employee ID Number "+ id + " has been deleted!"
            }]
        });
        //edit
        }else if(status === 2){
            this.setState({
                alerts : [{
                    type: "info",
                    headline: "Data Updated!",
                    message: "Data Updated! Data employee has been updated!"
                }]
            });
        }
         //edit
        else if(status === 3){
            this.setState({
                alerts : [{
                    type: "success",
                    headline: "Data Saved!",
                    message: "Data Saved! New Employee has been add with employee ID Number "+ id
                }]
            });
        }
        else if(status === 0)
        {
            this.setState({
                alerts : [{
                    type: "danger",
                    headline: "Whoa!",
                    message: "Proccess Failed"
                }]
            });
        }
    };

    
    render(){
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h3>
                        <b> Employee List </b>
                    </h3>
                    
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"> Home </a></li>
                        <li><a href="/employee"> Master </a></li>
                        <li className="active"> List Employee </li>
                    </ol>
                </div>
                {
                    (this.state.alertData.status === 1 || this.state.alertData.status === 2 || this.state.alertData.status === 3) ?
                    <AlertList alerts={this.state.alerts} timeout={1000} position={"bottom-left"} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                {
                  (this.state.alertData.status === 0) ?  
                  <AlertList alerts={this.state.alerts} timeout={1000} position={"bottom-left"} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-md-10">
                                    </div>
                                    <div className="col-md-2" >
                                        <div style={{ float : 'right' }}>
                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Company ID Number" id="employee_number" name="employee_number" value={this.state.formdata.employee_number} onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Employee Name" id="employee_name" name="employee_name" value={this.state.formdata.employee_name} onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <select className="form-control" id="company_name" name="company_name" value={this.state.formdata.company_name} onChange={this.textHandler}>
                                                <option  value=""> - Select Company Name - </option>
                                                {
                                                    this.state.m_company.map((elemen, x) =>
                                                        <option key={elemen.name} value={elemen.name}> {elemen.name} </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={ this.state.createdDate }
                                                    onChange={this.handleChangeDate}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Created Date">
                                                </DatePicker>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Created By" id="created_by" name="created_by" value={this.state.formdata.created_by} onChange={this.textHandler}/>
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button type="button" class="btn btn-warning" onClick={this.searchEmployee}>
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
                                                <th> Employee Number </th>
                                                <th> Employee Name </th>
                                                <th> Company Name </th>
                                                <th> Create Date </th>
                                                <th> Create By </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.m_employee.map((elemen, x) =>
                                                    <tr key={x}> 

                                                        <td> {x+1} </td>
                                                        <td> { elemen.employee_number} </td>
                                                        <td> { elemen.employee_name } </td>
                                                        <td> { elemen.company_name } </td>
                                                        <td> { moment(elemen.created_date).format("DD/MM/YYYY") }</td>
                                                        <td> { elemen.created_by } </td>
                                                        <td>
                                                            <button className="btn btn-default" onClick={ () => {this.detailModalHandler(elemen._id)}} type="button" data-toggle="modal" data-target="#modal-detail" style={{ marginRight : '5px'}}> <i class="fa fa-search"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => {this.editModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-edit" style={{ marginRight : '5px'}}> <i class="fa fa-pencil"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => { this.deleteModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-delete"> <i class="fa fa-trash"></i> </button>
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
                        <CreateEmployee
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
                <div className="modal fade" id="modal-detail">
                    <div className="modal-dialog">
                        <DetailEmployee 
                            m_employee = { this.state.currEmployee }
                        />
                    </div>
                </div>
                <div class="modal fade" id="modal-edit">
                    <div class="modal-dialog">
                        <EditEmployee 
                            m_employee = {this.state.currEmployee}
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
                <div className="modal fade" id="modal-delete">
                    <div className="modal-dialog">
                            <DeleteEmployee
                                m_employee = {this.state.currEmployee}
                                modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
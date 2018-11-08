import React, { Component } from 'react';
import { AlertList } from 'react-bs-notifier';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import msouvenirapi from '../../handler/msouvenir';
import munitapi from '../../handler/unit';
import DetailMSouvenir from './Detail';
import CreateMSouvenir from './Create';
import EditMSouvenir from './Edit';
import DeleteMSouvenir from './Delete';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msouvenir : [],
            currentMSouvenir: {},
            alertData: {
                status: 99,
                message: '',
                id: ''

            },
            alerts : [],
            formdata: {
                code: '',
                name: '',
                m_unit_id: '',
                unit:'',
                created_date: '',
                created_by: '' 
            },
            createdDate: '',
            munit: []
        };

        this.GetAll = this.GetAll.bind(this);
        this.viewModalHandler = this.viewModalHandler.bind(this);
        this.deleteModalHandler = this.deleteModalHandler.bind(this);
        this.editModalHandler = this.editModalHandler.bind(this);
        this.modalStatus = this.modalStatus.bind(this);
        this.onAlertDismissed = this.onAlertDismissed.bind(this);
        this.searchSouvenir = this.searchSouvenir.bind(this);
        this.textHandler = this.textHandler.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.GetAllUnit = this.GetAllUnit.bind(this);
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

    async searchSouvenir(){
        var query = [];
        var obj = {};

        console.log("search" + this.state.formdata);
        console.log(this.state.formdata.code);
        console.log(this.state.formdata.name);
        console.log(this.state.formdata.unit);
        //console.log(this.state.formdata.created_by)
        console.log(this.state.createdDate._d);
        console.log(this.state.formdata.created_by);

        let SouvenirCode = this.state.formdata.code;
        let SouvenirName = this.state.formdata.name;
        let UnitName = this.state.formdata.m_unit_id;
        let CreatedDate = moment(this.state.createdDate._d).format("YYYY-MM-DD");
        let CreatedBy = this.state.formdata.created_by;

        query.push({
            "id" : "is_delete",
            "value" : false
        });
            
        if(this.state.formdata.code === '' || this.state.formdata.code === null || typeof this.state.formdata.code === undefined || this.state.formdata.code === undefined){
        } 
        else
        {
            query.push({
                "id" : "code",
                "value" : SouvenirCode
            });
        }

        if(this.state.formdata.name === '' || this.state.formdata.name === null || typeof this.state.formdata.name === undefined || this.state.formdata.name === undefined) { 
        } 
        else
        {
            query.push({
                "id" : "name",
                "value" : SouvenirName
            });
        }

        if(this.state.formdata.m_unit_id === '' || this.state.formdata.m_unit_id === null || typeof this.state.formdata.m_unit_id === undefined || this.state.formdata.m_unit_id === undefined) { 
        } 
        else
        {
            query.push({
                "id" : "m_unit_id",
                "value" : UnitName
            });
        }

        if(this.state.formdata.created_by === '' || this.state.formdata.created_by === null || typeof this.state.formdata.created_by === undefined || this.state.formdata.created_by === undefined) {
        } 
        else
        {
            query.push({
                "id" : "created_by",
                "value" : CreatedBy
            });
        }

        if(this.state.createdDate._d === '' || this.state.createdDate._d === null || typeof this.state.createdDate._d === undefined || this.state.createdDate._d === undefined) {
        } 
        else
        {
            query.push({
                "id" : "created_date",
                "value" : CreatedDate
            });
        }

        console.log(query);
        let result = await msouvenirapi.GetAllSouvenirHandlerSearch(query);

        if(result.status === 200)
        {
            console.log('Souvenir - Index.js Debugger : GetAllSupplierHandlerSearch');
            console.log(result.message);
            this.setState({
                msouvenir: result.message
            });
        }
        else
        {
            console.log(result.message);
        }
    }


    async GetAll() {
        let result = await msouvenirapi.GetAll();

        if(result.status === 200)
        {
            console.log('Master Souvenir - Index.js Debugger');
            console.log(result.message);
            this.setState({
                msouvenir: result.message
            });
            console.log(this.state.msouvenir)
        }
        else
        {
            console.log(result.message);
        }
    }

    async GetAllUnit() {
        let result = await munitapi.GetAllUnit();

        if(result.status === 200)
        {
            console.log('Master Unit - Index.js Debugger');
            console.log(result.message);
            this.setState({
                munit: result.message
            });
            console.log(this.state.munit)
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.GetAll();
        this.GetAllUnit();
    }

    viewModalHandler(msouvenirid) {
        let tmp = {};

        this.state.msouvenir.map((ele) => {
            if (msouvenirid === ele._id) {
                tmp = ele;
            }
        });

        this.setState({
            currentMSouvenir : tmp
        });
    };

    editModalHandler(msouvenirid){
        let obj = {};
        this.state.msouvenir.map((ele) => {
            if(ele._id === msouvenirid)
            {
                obj = ele;
            }
        });

        this.setState({
            currentMSouvenir : obj
        });
    };


    deleteModalHandler(msouvenirid){
        let obj = {};
        this.state.msouvenir.map((ele) => {
            if(ele._id === msouvenirid)
            {
                obj = ele;
            }
        });

        this.setState({
            currentMSouvenir : obj
        });
    };

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
                id: id
            }
        });
        if(status === 1)
        {
        this.setState({
            alerts : [{
                type: "info",
                headline: "Data Deleted!",
                message: "Data Souvenir with code " + id + " has been deleted !"
            }]
        });
        }
        else if(status === 2)
        {
            this.setState({
                alerts : [{
                    type: "info",
                    headline: "Data Saved!",
                    message: "New Souvenir has been add with code " + id
                }]
            });
        }
        else if(status === 3)
        {
            this.setState({
                alerts : [{
                    type: "info",
                    headline: "Data Updated!",
                    message: "Data souvenir has been updated !"
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

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        List Souvenir
                        {/* <small>list all Souvenir</small> */}
                    </h1>
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"><i className="fa fa-dashboard"></i> Home </a></li>
                        <li><a href="/souvenir"> Master </a></li>
                        <li className="active"> List Souvenir </li>
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
                  <AlertList alerts={this.state.alerts} timeout={1000} onDismiss={this.onAlertDismissed.bind(this)} />
                    :
                    ''
                }
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
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
                                            <input type="text" className="form-control" placeholder="Souvenir Code" id="code" name="code" value={this.state.formdata.code} onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Souvenir Name" id="name" name="name" value={this.state.formdata.name} onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <select className="form-control" id="m_unit_id" name="m_unit_id" value={this.state.formdata.m_unit_id} onChange={this.textHandler}>
                                                <option value=""> - Select Unit Name - </option>
                                                {
                                                    this.state.munit.map((ele, x) => 
                                                        <option key={ele.name} value={ele.name}> {ele.name} </option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={this.state.createdDate}
                                                    onChange={this.handleChangeDate}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Created">
                                                </DatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Created By" id="created_by" name="created_by" value={this.state.formdata.created_by} onChange={this.textHandler}/>
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button type="button" class="btn btn-warning" onClick={this.searchSouvenir}>
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Souvenir Code</th>
                                                <th>Souvenir Name</th>
                                                <th>Unit</th>
                                                <th>Created Date</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.msouvenir.map((ele,x)=>
                                                    <tr key={ele._id}>

                                                        <td>{x+1}</td>
                                                        {/* <td>{ele._id}</td> */}
                                                        <td>{ele.code}</td>
                                                        <td>{ele.name}</td>
                                                        <td>{ele.m_unit_id}</td>
                                                        <td>{moment (ele.created_date).format("DD/MM/YYYY")}</td>
                                                        <td>{ele.created_by}</td>
                                                        <td>
                                                            <button type="button" className="btn btn-info" onClick = {() => {this.viewModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-view" style={{marginRight : '5px'}}><i className="fa fa-search"></i></button>
                                                            <button type="button" className="btn btn-success" onClick = {() => {this.editModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-edit" style={{marginRight : '5px'}}><i className="fa fa-edit"></i></button>
                                                            <button type="button" className="btn btn-danger" onClick = {() => {this.deleteModalHandler(ele._id)}} data-toggle="modal" data-target="#modal-delete"><i className="fa fa-trash"></i></button>
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
                <div className="modal fade" id="modal-view">
                    <div className="modal-dialog">
                            <DetailMSouvenir
                                msouvenir = {this.state.currentMSouvenir}
                            />
                    </div>
                </div>
                <div className="modal fade" id="modal-create">
                    <div className="modal-dialog">
                            <CreateMSouvenir
                            msouvenir = {this.setState.currentMSouvenir}
                            modalStatus = {this.modalStatus}
                            />
                    </div>
                </div>
                <div class="modal fade" id="modal-edit">
                    <div class="modal-dialog">
                        <EditMSouvenir 
                            msouvenir = {this.state.currentMSouvenir}
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
                <div class="modal fade" id="modal-delete">
                    <div class="modal-dialog">
                        <DeleteMSouvenir 
                            msouvenir = {this.state.currentMSouvenir}
                            modalStatus = {this.modalStatus}
                        />
                    </div>
                </div>
            </div>
        )
    }
};
export default Index
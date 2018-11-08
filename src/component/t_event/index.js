import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import appconfig from '../../config/app.config.json';


import event_api from '../../handler/event';
import CreateEvent from './Create';


class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            t_event : [],
            createdDate: '',
            createdDate2: '',

        }

        this.userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));


        if(this.userdata == null || typeof this.userdata == undefined)
        {
            this.username = "";
            this.role = "";
        }else{
            this.username = this.userdata[0].username;
            this.role = this.userdata[0].role;
        }

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeDate2 = this.handleChangeDate2.bind(this);

        this.GetAll = this.GetAll.bind(this);
        this.textHandler = this.textHandler.bind(this);

    }

    textHandler(e){
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }

    handleChangeDate(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createdDate: date
        });
        console.log(this.state.createdDate)
    }
    
    handleChangeDate2(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            createdDate2: date
        });
        console.log(this.state.createdDate2)
    }


    async GetAll(){
        let result = await event_api.GetAll();

        if (result.status === 200)
        {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                t_event : result.message
            })
            console.log(this.state.t_event)
        }else{
            console.log(result.message)
        }
    }

    componentDidMount(){
        this.GetAll();
    }

    searchEvent(){

    }

    render(){
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h3>
                        <b> List Event Request </b>
                    </h3>
                    
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"> Home </a></li>
                        <li><a href="/employee"> Master </a></li>
                        <li className="active"> List Event Request </li>
                    </ol>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-md-10">
                                    </div>
                                    {
                                        ( this.role === "Requester") ?
                                            <div className="col-md-2" >
                                                <div style={{ float : 'right' }}>
                                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            ''
                                        
                                    }
                                </div>
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Transaction Code" id="code" name="code"  onChange={this.textHandler} />
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Request By" id="request_by" name="request_by"  onChange={this.textHandler} />
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
                                                    placeholderText = "Request Date">
                                                </DatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <input type="text" className="form-control" placeholder="Status" id="status" name="status" onChange={this.textHandler}/>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group date">
                                                <DatePicker
                                                    selected={ this.state.createdDate2 }
                                                    onChange={this.handleChangeDate2}
                                                    className="form-control pull-right"
                                                    fixedHeight
                                                    dateFormat="DD/MM/YYYY"
                                                    id="datepicker2"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    placeholderText = "Request Date">
                                                </DatePicker>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Create By" id="created_by" name="created_by" onChange={this.textHandler}/>
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
                                                <th> Transaction Code </th>
                                                <th> Request By </th>
                                                <th> Request Date </th>
                                                <th> Status </th>
                                                <th> Create Date </th>
                                                <th> Create By </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.t_event.map((elemen, x) =>
                                                    <tr key={x}> 
                                                        <td> {x+1} </td>
                                                        <td> { elemen.code} </td>
                                                        <td> { elemen.request_by } </td>
                                                        <td> { moment(elemen.request_date).format("DD/MM/YYYY") } </td>
                                                        <td> { 
                                                                (elemen.status === 1) ?
                                                                "Submitted"
                                                                :
                                                                (elemen.status === 2) ?
                                                                "In Progress"
                                                                :
                                                                (elemen.status === 3) ?
                                                                "Done"
                                                                :
                                                                (elemen.status === 0) ?
                                                                "Rejected"
                                                                :
                                                                '' 
                                                            }
                                                        </td>
                                                        <td> { moment(elemen.created_date).format("DD/MM/YYYY") } </td>
                                                        <td> { elemen.created_by } </td>
                                                        <td>
                                                            <button className="btn btn-default" onClick={ () => {this.detailModalHandler(elemen._id)}} type="button" data-toggle="modal" data-target="#modal-detail" style={{ marginRight : '5px'}}> <i class="fa fa-search"></i> </button>
                                                            <button className="btn btn-default" onClick="" type="button" data-toggle="modal" data-target="#modal-edit" style={{ marginRight : '5px'}}> <i class="fa fa-pencil"></i> </button>
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
                <div class="modal modal-default fade" id="modal-create">
                    <div class="modal-dialog">
                        <CreateEvent
                        />
                    </div>
                </div>
                {
                    ( this.role === "Requester") ?
                    <div class="modal modal-info fade" id="modal-edit">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Info Modal</h4>
                            </div>
                            <div class="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-outline">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    :
                    ( this.role === "Administrator") ?
                    <div class="modal modal-success fade" id="modal-edit">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Info Modal</h4>
                            </div>
                            <div class="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-outline">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    :
                    ( this.role === "Staff") ?
                    <div class="modal modal-warning fade" id="modal-edit">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Info Modal</h4>
                            </div>
                            <div class="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-outline">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        )
    }


}

export default index;
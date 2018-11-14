import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import souveniritemapi from '../../handler/souvenir_item';
import souvenirapi from '../../handler/msouvenir';

class editRequest extends Component {
    idx = 0;
    constructor(props) {
        super(props);
        this.state = {
            formdataSouvenir: {
                _id: '',
                code: '',
                type: '',
                t_event_id: '',
                request_by: '',
                request_date: '',
                request_due_date: '',
                approved_by: '',
                approved_date: '',
                received_by: '',
                received_date: '',
                settlement_by: '',
                settlement_date: '',
                settlement_approved_by: '',
                settlement_approved_date: '',
                status: '',
                note: '',
                reject_reason: '',
                is_delete: '',
                created_by: '',
                created_date: '',
                detail_souvenir: [{
                    _id: '',
                    t_souvenir_id: '',
                    m_souvenir_id: '',
                    qty: '',
                    qty_settlement: '',
                    note: '',
                    is_delete: '',
                    created_by: '',
                    created_date: '',
                    updated_by: '',
                    updated_date: '',
                }]
            },
            souvenir: []
        };
        this.getSouvenir = this.getSouvenir.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.rowHandleChange = this.rowHandleChange.bind(this);
        this.addRow = this.addRow.bind(this);
    };

    async getSouvenir() {
        let result = await souvenirapi.GetSelect();

        if(result.status === 200) {
            console.log('create.js Debugger success catching souvenir');
            console.log(result.message);
            this.setState({
                souvenir: result.message
            });
        } else {
            console.log(result.message);
        }
    };

    componentWillReceiveProps(newProps){
        console.log("URGENT!!!!!!!!");
        this.setState({
            formdataSouvenir: newProps.souvenirRequest
        });

        console.log("inject succesfully");
        
        console.log(newProps.souvenirRequest);
    };

    async updateHandler() {
        let token = localStorage.getItem(appconfig.secure_key.token);
        
       //let result = await souveniritemapi.insertApproved(this.state.formdataSouvenir);

       let result = {
           status: 200,
           data: this.state.formdataSouvenir.detail_souvenir
       }

       if(result.status === 200) {
            console.log("berhasil input data approved...");
            document.getElementById("hidePopUpBtnEdit").click();
            this.props.modalStatus(2, 'Success', this.props.souvenirRequest.code);
            alert(result);
        } else {
            console.log("gagal input data...");
            document.getElementById("hidePopUpBtnEdit").click();
            this.props.modalStatus(0, 'Failed');
        }
    };

    componentDidMount() {
        this.getSouvenir();
    };

    rowHandleChange = index => e => {
        const { name, value } = e.target;
        var currRequest = this.state.formdataSouvenir;
        var request = currRequest.detail_souvenir.find(o => o.id === index);
        request[name] = value;

        this.setState({
            formdataSouvenir: currRequest
        });

        console.log("rowHandleChange");
        console.log("idx : " + index);
        console.log("name : " + name);
        console.log("value : " + value);
    };

    deleteRow(index){
        var currRequest =this.state.formdataSouvenir;
        const selectIdx = currRequest.detail_souvenir.findIndex(u => u.id === index);
        currRequest.detail_souvenir.splice(selectIdx, 1);
        this.setState({
            formdataSouvenir: currRequest
        });
    };

    addRow(){
        var currRequest =this.state.formdataSouvenir;
        let _id = this.idx + 1;
        this.idx = this.idx + 1;

        var newRequest = {
            id: _id,
            m_souvenir_id: '',
            qty: '',
            note: ''
        };

        currRequest.detail_souvenir.push(newRequest);
        this.setState({
            formdataSouvenir: currRequest
        });
    };

    render() {
        if(this.state.formdataSouvenir.detail_souvenir === 'undefined')
        {
            console.log("xxxxx False");
        }
        else
        {
            console.log("xxxxx True");
            console.log(this.state.souvenir_detail);
        }

        console.log("this.state.formdataSouvenir");
        console.log(this.state.formdataSouvenir);
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnEdit" type="button" onClick={ this.resetForm } className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Edit Souvenir Request - {this.state.formdataSouvenir.code}</h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Transaction Code</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="transaction_code" style= {{ marginTop : '10px'}} className="form-control" name="transaction_code" placeholder="masukan transaction code" value={ this.state.formdataSouvenir.code }  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Event Code </p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled style= {{ marginTop : '10px'}} className="form-control" name="t_event_id" value={ this.state.formdataSouvenir.t_event_id }  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Request By</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="request_by" style= {{ marginTop : '10px'}} className="form-control" name="request_by" value={ this.state.formdataSouvenir.request_by } placeholder="masukan pe request"  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Request Date</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="request_date" style= {{ marginTop : '10px'}} className="form-control" name="request_date" value={ this.state.formdataSouvenir.request_date } placeholder="masukan request date"  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Due Date</p>
                                        <div className="col-sm-8">
                                            <input type="text" ref="request_due_date" style= {{ marginTop : '10px'}} className="form-control" name="request_due_date" value={ this.state.formdataSouvenir.request_due_date } placeholder="masukan request date"  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Note</p>
                                        <div className="col-sm-8">
                                            <textarea ref="note" style= {{ marginTop : '10px'}} className="form-control" name="note" value={ this.state.formdataSouvenir.note } placeholder="Type Note"  onChange={ this.textChanged }/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Status</p>
                                        <div className="col-sm-8">
                                            <input type="text" disabled ref="request_due_date" style= {{ marginTop : '10px'}} className="form-control" name="request_due_date" 
                                            value={ 
                                                this.state.formdataSouvenir.status === 1 ? "Submitted" :
                                                this.state.formdataSouvenir.status === 2 ? "In Progress" :
                                                this.state.formdataSouvenir.status === 3 ? "Received by Requester" :
                                                this.state.formdataSouvenir.status === 4 ? "Settlement" :
                                                this.state.formdataSouvenir.status === 5 ? "Settlement Apporved" :
                                                this.state.formdataSouvenir.status === 6 ? "Close Request" :
                                                this.state.formdataSouvenir.status === 0 ? "Rejected" :
                                                ''
                                            } 
                                            placeholder="masukan request date"  
                                            onChange={ this.textChanged }>
                                            </input>
                                        </div>
                                    </div>

                                    <div className="box-tools">
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-btn">
                                                <button type="button" className="btn btn-primary" onClick = {() => {this.addRow()}} style={{float : 'right'}}>Add item</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="box-body table-responsive no-padding">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Souvenir</th>
                                                    <th>Qty</th>
                                                    <th>Note</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { 
                                                    (this.props.souvenirRequest.detail_souvenir === 'undefined')?
                                                    <tr>
                                                        <td> undefined</td>
                                                        <td> undefined </td>
                                                        <td> undefined</td>
                                                        <td> undefined </td>
                                                    </tr>
                                                    :
                                                    this.state.formdataSouvenir.detail_souvenir && this.state.formdataSouvenir.detail_souvenir.map((elemen, x) =>
                                                        <tr key={x}> 
                                                            <td> { x+1 } </td>
                                                            <td>
                                                                <select
                                                                className="form-control" 
                                                                name="m_souvenir_id" 
                                                                value={this.state.formdataSouvenir.detail_souvenir[x].m_souvenir_id}
                                                                onChange={this.rowHandleChange(elemen.id)}>
                                                                    <option value="">Select Souvenir</option>
                                                                    {
                                                                        this.state.souvenir.map((elemen) =>
                                                                            <option key={ elemen.name } value={ elemen._id }> { elemen.name } </option>
                                                                        )
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                type="number"
                                                                name="qty"
                                                                value={this.state.formdataSouvenir.detail_souvenir[x].qty}
                                                                onChange={this.rowHandleChange(elemen.id)}
                                                                className="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                type="text"
                                                                name="note"
                                                                value={this.state.formdataSouvenir.detail_souvenir[x].note}
                                                                onChange={this.rowHandleChange(elemen.id)}
                                                                className="form-control"
                                                                />
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-danger" onClick = {() => {this.deleteRow(elemen.id)}}><i className="fa fa-trash"></i></button>
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

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={ this.updateHandler } className="btn btn-primary">Update</button>
                    <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        ) 
    }

};

export default editRequest;
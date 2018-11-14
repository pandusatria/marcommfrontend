import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import souveniritemapi from '../../handler/souvenir_item';

class approvalRequest extends Component {
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
            }
        };
        this.approvedHandler = this.approvedHandler.bind(this);
        this.rejectedHandler = this.rejectedHandler.bind(this);
    };

    componentWillReceiveProps(newProps){
        console.log("URGENT!!!!!!!!");
        this.setState({
            formdataSouvenir: newProps.souvenirRequest
        });

        console.log("inject succesfully");
        
        console.log(newProps.souvenirRequest);
    };

    async approvedHandler() {
        let token = localStorage.getItem(appconfig.secure_key.token);
        
        let result = await souveniritemapi.insertApproved(this.state.formdataSouvenir);
        if(result.status === 200) {
            console.log("berhasil input data approved...");
            document.getElementById("hidePopUpBtnApproval").click();
            this.props.modalStatus(3, "Data Approved! Transaction Souvenir Request with code " + this.props.souvenirRequest.code + " has been approved!", this.props.souvenirRequest.code);
        } else {
            console.log("gagal input data...");
            document.getElementById("hidePopUpBtnApproval").click();
            this.props.modalStatus(0, 'Failed');
        }
    };

    async rejectedHandler() {
        let token = localStorage.getItem(appconfig.secure_key.token);
        
        let result = await souveniritemapi.insertRejected(this.state.formdataSouvenir);
        if(result.status === 200) {
            console.log("berhasil input data rejected...");
            document.getElementById("hidePopUpBtnApproval").click();
            this.props.modalStatus(0, "Data Rejected! Transaction Souvenir Request with code " + this.props.souvenirRequest.code + " is rejected by Administrator!", this.props.souvenirRequest.code);
        } else {
            console.log("gagal input data...");
            document.getElementById("hidePopUpBtnApproval").click();
            this.props.modalStatus(0, 'Process failed!');
        }
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
                    <button id="hidePopUpBtnApproval" type="button" onClick={ this.resetForm } className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Approval Souvenir Request - {this.state.formdataSouvenir.code}</h4>
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
                                            <input type="text" disabled ref="request_due_date" style= {{ marginTop : '10px'}} className="form-control" name="request_due_date" value={ this.state.formdataSouvenir.request_due_date } placeholder="masukan request date"  onChange={ this.textChanged }></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Note</p>
                                        <div className="col-sm-8">
                                            <textarea ref="note" disabled style= {{ marginTop : '10px'}} className="form-control" name="note" value={ this.state.formdataSouvenir.note } placeholder="Type Note"  onChange={ this.textChanged }/>
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
                                                            <td> { elemen.m_souvenir_id } </td>
                                                            <td> { elemen.qty } </td>
                                                            <td> { elemen.note } </td>
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
                    <button type="button" onClick={ this.approvedHandler } className="btn btn-primary">Approved</button>
                    <button type="button" onClick={ this.rejectedHandler } className="btn btn-danger">Rejected</button>
                    <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        ) 
    }

};

export default approvalRequest;
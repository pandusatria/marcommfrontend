import React, { Component } from 'react';
import moment from 'moment'; 
import tsouvenirapi from '../../handler/tsouvenir';

class DetailMSouvenir extends Component{
    idx = 0
    constructor (props){
        super(props);
        this.state={
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
                DetailSouvenir: [{
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
            errors: {},
            receivedDate: '',
        };
    };

    componentWillReceiveProps(newProps){
        console.log("URGENT!!!!!!!!");
        this.setState({
            formdataSouvenir: newProps.tsouvenir
        });

        console.log("inject succesfully");
        
        console.log(newProps.tsouvenir);
    };

    
    render(){
        if(this.state.formdataSouvenir.DetailSouvenir === 'undefined')
        {
            console.log("xxxxx False");
        }
        else
        {
            console.log("xxxxx True");
            console.log(this.state.souvenir_detail);
        }
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">View Souvenir Stock - ({this.props.tsouvenir.code})</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div class="form-group">
                            <p className="col-sm-3 control-label">*Transaction Code</p>
                                <div className="col-sm-4">
                                    <input type="text" class="form-control" value={this.props.tsouvenir.code} disabled/>
                                </div>
                            </div>

                            <div class="form-group">
                                <p className="col-sm-3 control-label">*Received By</p>
                                <div className="col-sm-4">
                                    <input type="text" class="form-control" value={this.props.tsouvenir.name_receiver} disabled/>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <p className="col-sm-3 control-label">*Received Date</p>
                                <div className="col-sm-4">
                                    <input type="text" class="form-control" value={moment(this.props.tsouvenir.received_date).format("DD-MM-YYYY")} disabled/>
                                </div>
                            </div>

                            <div class="form-group">
                                <p className="col-sm-3 control-label">Note</p>
                                <div className="col-sm-4">
                                    <textarea ref="note" type="text" className="form-control" value={this.props.tsouvenir.note} disabled/>
                                </div> 
                            </div>   
                        </div>
                    </form>
                </div>

                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <br></br>

                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Souvenir Name</th>
                                                <th>Qty</th>
                                                <th>Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                { 
                                                    (this.props.tsouvenir.DetailSouvenir === 'undefined')?
                                                    <tr>
                                                        <td> undefined</td>
                                                        <td> undefined </td>
                                                        <td> undefined</td>
                                                        <td> undefined </td>
                                                    </tr>
                                                    :
                                                    this.state.formdataSouvenir.DetailSouvenir && this.state.formdataSouvenir.DetailSouvenir.map((elemen, x) =>
                                                        <tr key={x}> 
                                                            <td> { x+1 } </td>
                                                            <td> <input
                                                            type="text"
                                                            name="qty"
                                                            value={this.state.formdataSouvenir.DetailSouvenir[x].m_souvenir_id}
                                                            disabled/> </td>
                                                            <td>
                                                            <input
                                                            type="number"
                                                            name="qty"
                                                            value={this.state.formdataSouvenir.DetailSouvenir[x].qty}
                                                            disabled/>
                                                        </td>
                                                            <td> <input
                                                            type="text"
                                                            name="note"
                                                            value={this.state.formdataSouvenir.DetailSouvenir[x].note}
                                                            disabled/> </td>
                                                        </tr>
                                                    )
                                                    
                                                }
                                            </tbody>
                                    </table>
                                </div>

                                {/* <div className="box-header">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <input type="text" class="form-control" value={this.props.msouvenir._id} disabled/>
                                        </div>
                                        
                                        <div className="col-md-2">
                                            <input type="text" class="form-control" value={this.props.msouvenir.quantity} disabled/>
                                        </div>

                                        <div className="col-md-4">
                                            <input type="text" class="form-control" value={this.props.msouvenir.description} disabled/>
                                        </div>
                                    </div>
                                </div>  */}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal-footer">
                    <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
                
            </div>
        )
    }
}
export default DetailMSouvenir
import React, { Component } from 'react';
import moment from 'moment';

class DetailMSouvenir extends Component{
    render(){
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

                                <div className="box-header">
                                    <div className="row">
                                    <div class="col-md-4" >
                                        <label>Souvenir Name</label>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Qty</label>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Note</label>
                                    </div>
                                    </div>
                                </div>

                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <input type="text" class="form-control" value={this.props.msouvenir.name} disabled/>
                                        </div>
                                        
                                        <div className="col-md-2">
                                            <input type="text" class="form-control" value={this.props.msouvenir.quantity} disabled/>
                                        </div>

                                        <div className="col-md-4">
                                            <input type="text" class="form-control" value={this.props.msouvenir.description} disabled/>
                                        </div>
                                    </div>
                                </div> 
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
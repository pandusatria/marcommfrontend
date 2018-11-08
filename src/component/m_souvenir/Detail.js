import React, { Component } from 'react';

class DetailMSouvenir extends Component{
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">View Souvenir - {this.props.msouvenir.name} ({this.props.msouvenir.code})</h4>
                </div>
                <form>
                    <div className="box-body">
                        <div class="row">
                            <div class="col-md-6"> 
                                <div class="form-group">
                                    <label for="text">*Souvenir Code</label>
                                    <input type="text" class="form-control" value={this.props.msouvenir.code} disabled/>
                                </div>
                                <div class="form-group">
                                    <label for="text">*Souvenir Name</label>
                                    <input type="text" class="form-control" value={this.props.msouvenir.name} disabled/>
                                </div>
                            </div>
                            <div class="col-md-6"> 
                                <div class="form-group">
                                    <label for="text">*Unit Name</label>
                                    <input type="text" class="form-control" value={this.props.msouvenir.m_unit_id} disabled/>
                                </div>
                                <div class="form-group">
                                    <label for="text">Description</label>
                                    <input type="text" class="form-control" value={this.props.msouvenir.description} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default DetailMSouvenir
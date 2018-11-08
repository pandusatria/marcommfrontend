import React , { Component } from 'react';

class detailEmployee extends Component {
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">View Employee - {this.props.m_employee.employee_name}({this.props.m_employee.employee_number}) </h4>
                </div>
               
                <div className="modal-body">
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Emp ID Number</p>
                                            <div className="col-sm-9">
                                                <input className="form-control" value={this.props.m_employee.employee_number} disabled></input>
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *First Name </p>
                                        <div className="col-sm-9">
                                            <input style= {{ marginTop : '10px'}} className="form-control" value={this.props.m_employee.first_name} disabled></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> Last Name </p>
                                        <div className="col-sm-9">
                                            <input style= {{ marginTop : '10px'}} className="form-control" value={this.props.m_employee.last_name} disabled></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div className="form-group">
                                        <p className="col-sm-3 control-label"> *Company Name </p>
                                        <div className="col-sm-9">
                                            <input style= {{ marginTop : '10px'}} className="form-control" value={this.props.m_employee.company_name} disabled></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <p className="col-sm-3 control-label"> Email </p>
                                        <div className="col-sm-9">
                                            <input style= {{ marginTop : '10px'}} className="form-control" value={this.props.m_employee.email} disabled></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        )
    }
}

export default detailEmployee;
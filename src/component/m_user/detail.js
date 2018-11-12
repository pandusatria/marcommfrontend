import React , { Component } from 'react';

class detailUser extends Component {
    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">View User - {this.props.detailUser.employee} ({this.props.detailUser.username}) </h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Role Name</p>
                                            <div className="col-sm-8">
                                                <input style= {{ marginTop : '10px'}} className="form-control" disabled value={this.props.detailUser.role}></input>
                                            </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Employee Name </p>
                                        <div className="col-sm-8">
                                            <input style= {{ marginTop : '10px'}} className="form-control" disabled value={this.props.detailUser.employee}></input>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Username </p>
                                        <div className="col-sm-8">
                                            <input style= {{ marginTop : '10px'}} className="form-control" disabled value={this.props.detailUser.username}></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" style= {{ marginTop : '10px'}} className="form-control" disabled value={this.props.detailUser.password}></input>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <p className="col-sm-4 control-label"> *Re-type Password </p>
                                        <div className="col-sm-8">
                                            <input type="password" style= {{ marginTop : '10px'}} className="form-control" disabled value={this.props.detailUser.password}></input>
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
    };
};

export default detailUser;
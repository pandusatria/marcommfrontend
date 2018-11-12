import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import user_api from '../../handler/user.js';


class deleteUser extends Component {
    constructor(props) {
        super(props);

        this.deleteHandler = this.deleteHandler.bind(this);
    }

    async deleteHandler() {

            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log("Debug formdata delete");

            let result = await user_api.delete(this.props.deleteUser._id);

            if(result.status === 200) {
                console.log("berhasil delete data...");
                document.getElementById("hidePopUpBtnDel").click();
                this.props.modalStatus(3, 'Success', this.props.deleteUser.username);
            } else {
                console.log("gagal delete data...");
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
            }

    };

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnDel" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Delete Data { this.props.deleteUser.username } ?</h4>
                </div>
               
                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" onClick={ this.deleteHandler } className="btn btn-primary btn-flat btn-block">Delete</button>
                                </div>

                                <div className="col-md-6">
                                    <button type="button" onClick={ this.resetForm } className="btn btn-warning btn-flat btn-block pull-right" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default deleteUser;
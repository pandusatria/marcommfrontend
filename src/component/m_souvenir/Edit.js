import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';
import appconfig from '../../config/app.config.json';

class EditMSouvenir extends Component {
    constructor (props){
        super(props);

        this.state={
            formdata:{
                code:'',
                name: '',
                m_unit_id: '',
                description: ''
            }
        };

        this.updateHandler=this.updateHandler.bind(this);
        this.textChanged = this.textChanged.bind(this);
    }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }


    async updateHandler() {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);
        let result = await msouvenirapi.Update(this.state.formdata);

        alert(this.state.formdata._id + this.state.formdata.code);
        if(result.status === 200)
        {
            console.log('Souvenir - Index.js Debugger');
            console.log(result.message);
            document.getElementById("hidePopUpBtnUpdt").click();
            this.props.modalStatus(1, 'Success');
        }
        else
        {
            console.log(result.message);
            document.getElementById("hidePopUpBtnUpdt").click();
            this.props.modalStatus(2, 'Failed'); 
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            formdata : newProps.client
        });
    }

    render(){
        return (
            <div class="modal-content">
                <div class="modal-header">
                    <button id="hidePopUpBtnUpdt" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Edit Souvenir - {this.props.msouvenir.name} ({this.props.msouvenir.code})</h4>
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
                                    <input type="text" class="form-control" value={this.props.msouvenir.name} ></input>
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
                        <button type="button" className="btn btn-warning pull-right" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick = {this.updateHandler} style={{marginRight : '5px'}}>Update</button>
                    </div>
                </form>
            </div>
        )
    };
};

export default EditMSouvenir;
import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';
import appconfig from '../../config/app.config.json';

class CreateMSouvenir extends Component{
    constructor (props){
        super(props);

        this.state={
            formdata:{
                code:'',
                name: '',
                m_unit_id: '',
                description: ''
            },
            errors: {}
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        //this.handleValidation = this.handleValidation.bind(this);
    }

    resetForm() {
        this.setState({
            formdata:{
                code:'',
                name: '',
                m_unit_id: '',
                description: ''
            },
            errors: {}
        });
    }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
    }
    
    async submitHandler(){
        
        // if(this.handleValidation()){
        //     let token = localStorage.getItem(appconfig.secure_key.token);
        //     console.log(this.state.formdata);

            let result = await msouvenirapi.insertNew(this.state.formdata);
  
            if(result.status === 200){
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(1, 'Success');
            } else {
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
            }
        // }
    };

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button  id="hidePopUpBtn" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Add Souvenir</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div class="col-md-6">
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">*Souvenir Code</label>
                                    <div className="col-sm-9">
                                        <input ref="code" type="text" className="form-control" name="code" placeholder="Auto Generate" value={ this.state.formdata.code } onChange={ this.textChanged }></input>
                                        <span style={{color: "red"}}>{this.state.errors.code}</span>
                                    </div> 
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label">*Souvenir Name</label>
                                    <div className="col-sm-9">
                                        <input ref="name" type="text" className="form-control" name="name" placeholder="Type Souvenir Name" value={ this.state.formdata.name } onChange={ this.textChanged }></input>
                                        <span style={{color: "red"}}>{this.state.errors.name}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">*Unit Name</label>
                                    <div className="col-sm-9">
                                        <input ref="m_unit_id" type="dropdown" className="form-control" name="m_unit_id" placeholder="- Select Unit Name -" value={ this.state.formdata.m_unit_id } onChange={ this.textChanged }></input>
                                        <span style={{color: "red"}}>{this.state.errors.m_unit_id}</span>
                                    </div> 
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Description</label>
                                    <div className="col-sm-9">
                                        <input ref="description" type="text" className="form-control" name="description" placeholder="Type Description" value={ this.state.formdata.description } onChange={ this.textChanged }></input>
                                        <span style={{color: "red"}}>{this.state.errors.description}</span>
                                    </div> 
                                </div>    
                            </div> 
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal" style={{marginRight : '5px'}}>Close</button>
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary" style={{marginRight : '5px'}}>Save</button>
                </div>
            </div>
        )
    }


}
export default CreateMSouvenir;
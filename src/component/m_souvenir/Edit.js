import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';
import munitapi from '../../handler/unit';
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
            },
            errors: {},
            munit: []
        };

        this.resetForm=this.resetForm.bind(this);
        this.updateHandler=this.updateHandler.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.GetAllUnit = this.GetAllUnit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    resetForm() {
        this.setState({
            formdata:{
                code:'',
                name: '',
                m_unit_id: '',
                unit: '',
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

    async GetAllUnit() {
        let result = await munitapi.GetAllUnit();

        if(result.status === 200)
        {
            console.log('Master Unit - Index.js Debugger');
            console.log(result.message);
            this.setState({
                munit: result.message
            });
            console.log(this.state.munit)
        }
        else
        {
            console.log(result.message);
        }
    }

    componentDidMount(){
        this.GetAllUnit();
    }

    handleValidation(){
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;
        
        // if(typeof fields.code === "undefined" || fields.code === null || fields.code === ""){
        //     formIsValid = false;
        //     errors.err_code = "Souvenir Code is empty!";
        // }
        
        if(typeof fields.name === "undefined" || fields.name === null || fields.name === ""){
            formIsValid = false;
            errors.err_name = "Souvenir Name is empty!";
        }

        if(typeof fields.m_unit_id === "undefined" || fields.m_unit_id === null || fields.m_unit_id === ""){
            formIsValid = false;
            errors.err_m_unit_id = "Unit Name is empty!";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    async updateHandler() {
        let token = localStorage.getItem(appconfig.secure_key.token);
        if(this.handleValidation()){
            console.log(this.state.formdata);
            let result = await msouvenirapi.Update(this.state.formdata);

            //alert(this.state.formdata._id + this.state.formdata.code);

            if(result.status === 200)
            {
                console.log('Souvenir - Index.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtnUpdt").click();
                this.props.modalStatus(3, 'Success');
            }
            else
            {
                console.log(result.message);
                document.getElementById("hidePopUpBtnUpdt").click();
                this.props.modalStatus(0, 'Failed'); 
            }
        }
    }

    // submitHandler(){
    //     let token = localStorage.getItem(appconfig.secure_key.token);
    //     console.log(this.state.formdata);
    // }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            formdata : newProps.msouvenir
        });
    }

    render(){
        return (
            <div class="modal-content">
                <div class="modal-header">
                    <button id="hidePopUpBtnUpdt" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick = { this.resetForm }>
                    <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Edit Souvenir - {this.props.msouvenir.name} ({this.props.msouvenir.code})</h4>
                </div>

                <form>
                    <div className="box-body">
                        <div class="row">
                            <div class="col-md-6"> 
                                <div className="form-group">
                                    <label for="text">*Souvenir Code</label>
                                    <input type="text" class="form-control" value={this.props.msouvenir.code} disabled/>
                                </div>
                                <div class="form-group">
                                    <label for="text">*Souvenir Name</label>
                                    <input name="name" ref="name" style= {{ marginTop : '10px'}} className="form-control" value={this.state.formdata.name}  onChange={this.textChanged} ></input>
                                    <span style={{color: "red"}}>{this.state.errors.err_name}</span>
                                </div>
                            </div>
                            <div class="col-md-6"> 
                                <div className="form-group">
                                    <label for="text">*Unit Name</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="m_unit_id" name="m_unit_id" onChange={this.textChanged} value={this.state.formdata.m_unit_id} >
                                            <option value="0"> - Select Unit Name -</option>
                                            {
                                                this.state.munit.map((elemen) =>
                                                    <option key={elemen._id} value={elemen._id}> {elemen.name} </option>
                                                )
                                            }
                                        </select>
                                        <span className="help-block" style={{color: "red"}}>{this.state.errors.err_m_unit_id}</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="text">Description</label>
                                    <input name="description" ref="description" style= {{ marginTop : '10px'}} className="form-control" value={this.state.formdata.description}  onChange={this.textChanged} ></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning pull-right" onClick={ this.resetForm } data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick = {this.updateHandler} style={{marginRight : '5px'}}>Update</button>
                    </div>
                </form>
            </div>
        )
    };
};

export default EditMSouvenir;
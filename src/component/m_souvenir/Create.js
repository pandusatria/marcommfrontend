import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';
import munitapi from '../../handler/unit';
import AutoGen from '../../common/autoGenerateNumber';
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
            errors: {},
            munit: []
        };

        this.submitHandler=this.submitHandler.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.GetAllUnit = this.GetAllUnit.bind(this);
        this.autoGenSouvenir = this.autoGenSouvenir.bind(this);
    }

    async autoGenSouvenir() {
        let result = await AutoGen.createCodeSouvenir();
        console.log("autoGenSupplier");
        console.log(result);
        this.setState({
            formdata:{
                code: result
            }
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
        this.autoGenSouvenir();
    }

    resetForm() {
        this.setState({
            formdata:{
                name: '',
                m_unit_id: '',
                description: ''
            },
            errors: {}
        });
    }

    // resetFormSuccess() {
    //     this.setState({
    //         formdata:{
    //             code: '',
    //             name: '',
    //             m_unit_id: '',
    //             description: ''
    //         },
    //         errors: {}
    //     });
    // }

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata)
    }

    handleValidation(){
        let fields = this.state.formdata;
        let errors = {};
        let formIsValid = true;
        
        if(typeof fields.name === "undefined" || fields.name === null || fields.name === ""){
            formIsValid = false;
            errors.err_name = "Souvenir Name is empty!";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    
    async submitHandler(){
        
        if(this.handleValidation()){
            let token = localStorage.getItem(appconfig.secure_key.token);
        
        
            console.log(this.state.formdata)
            let result = await msouvenirapi.insertNew(this.state.formdata);
            
            if(result.status === 200)
            {
                console.log('Souvenir - Index.js Debugger');
                console.log(result.message);
                var scode = this.state.formdata.code
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(2, 'Success', scode);
                //this.autoGenSouvenir();
            } 
            else 
            {
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
                // this.autoGenSouvenir();
            }
            this.autoGenSouvenir();
        }
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
                                        <input ref="code" type="text" className="form-control" name="code" placeholder="Auto Generate" value={ this.state.formdata.code } disabled />
                                        <span style={{color: "red"}}>{this.state.errors.code}</span>
                                    </div> 
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label">*Souvenir Name</label>
                                    <div className="col-sm-9">
                                        <input ref="name" type="text" className="form-control" name="name" placeholder="Type Souvenir Name" value={ this.state.formdata.name } onChange={ this.textChanged }></input>
                                        <span style={{color: "red"}}>{this.state.errors.err_name}</span>
                                    </div> 
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">*Unit Name</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="m_unit_id" name="m_unit_id" onChange={this.textChanged} >
                                            <option value="0"> - Select Unit Name -</option>
                                            {
                                                this.state.munit.map((elemen) =>
                                                    <option key={elemen._id} value={elemen._id}> {elemen.name} </option>
                                                )
                                            }
                                        </select>
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
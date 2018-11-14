import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import AutoGen from '../../common/autoGenerateNumber';

import tsouvenirapi from '../../handler/tsouvenir';
import employee_api from '../../handler/employee';
import msouvenirapi from '../../handler/msouvenir';

class CreateTSouvenir extends Component{
    idx = 0
    constructor (props){
        super(props);
        this.state={
            formdata:{
                code:'',
                received_by: '',
                name_receiver: '',
                received_date: '',
                note: '',
                formdataStock : [{
                    id     :  "",
                    m_souvenir_id: "",
                    qty     :  "",
                    note    :  ""
                }]
            },
            errors: {},
            receivedDate: '',
            memployee: [],

            msouvenir: []
        };

        this.textChanged = this.textChanged.bind(this);
        this.handleChangeDateRcBy = this.handleChangeDateRcBy.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.autoGenSouvenir = this.autoGenSouvenir.bind(this);
        this.GetAllEmployee = this.GetAllEmployee.bind(this);
        this.GetAllMSouvenir = this.GetAllMSouvenir.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitHandler=this.submitHandler.bind(this);
        this.addRow = this.addRow.bind(this);
        this.rowHandleChange = this.rowHandleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    };

    resetForm() {
        this.setState({
            formdata:{
                received_by: '',
                name_receiver: '',
                received_date: '',
                note: '',
                formdataStock : [{
                    id     :  "",
                    m_souvenir_id: "",
                    qty     :  "",
                    note    :  ""
                }]
            },
            errors: {}
        });
    };

    async autoGenSouvenir() {
        var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

        var reqby = "";
        if(userdata == null || typeof userdata == undefined)
        {
            reqby = "";
        }else{
            reqby = userdata[0].employee;
        }

        let result = await AutoGen.createCodeTSouvenir();
        console.log("autoGenSupplier");
        console.log(result);

        let tmp = this.state.formdata;
        tmp.code = result;

        this.setState({
            formdata: tmp
        })
    };

    textChanged(e) {
        let tmp = this.state.formdata;
        tmp[e.target.name] = e.target.value;
        this.setState({
            formdata: tmp
        });
        console.log(this.state.formdata)
    }

    handleChangeDateRcBy(date){
        let tmp = this.state.formdata;
        this.setState({
            formdata: tmp,
            receivedDate: date
        });
        console.log(this.state.receivedDate)
    };

    handleValidation(){
        let fields = this.state.formdata;
        let field = this.state;
        let ms = this.state.msouvenir;
        let errors = {};
        let formIsValid = true;
        
        if(typeof fields.received_by === "undefined" || fields.received_by === null || fields.received_by === ""){
            formIsValid = false;
            errors.err_received_by = "Employee Name is empty!";
        }

        if(typeof field.receivedDate === "undefined" || field.receivedDate === null || field.receivedDate === ""){
            formIsValid = false;
            errors.err_receivedDate = "Received Date is empty!";
        }

        // if(typeof ms.name === "undefined" || ms.name === null || ms.name === ""){
        //     formIsValid = false;
        //     errors.err_name = "Souvenir Name is empty!";
        // }

        // if(typeof ms.quantity === "undefined" || ms.quantity === null || ms.quantity === ""){
        //     formIsValid = false;
        //     errors.err_quantity = "Souvenir Name is empty!";
        // }

        this.setState({errors: errors});
        return formIsValid;
    };

    async GetAllEmployee() {
        let result = await employee_api.GetAll();

        if(result.status === 200)
        {
            console.log('Master Employee - Index.js Debugger');
            console.log(result.message);
            this.setState({
                memployee: result.message
            });
            console.log(this.state.memployee)
        }
        else
        {
            console.log(result.message);
        }
    };

    async GetAllMSouvenir() {
        let result = await msouvenirapi.GetAll();

        if(result.status === 200)
        {
            console.log('Master Souvenir - Index.js Debugger');
            console.log(result.message);
            this.setState({
                msouvenir: result.message
            });
            console.log(this.state.msouvenir)
        }
        else
        {
            console.log(result.message);
        }
    };

    rowHandleChange = index => e => {
        const { name, value } = e.target;
        var currStock = this.state.formdata;
        var stock = currStock.formdataStock.find(o => o.id === index);
        stock[name] = value;

        this.setState({
            formdata: currStock
        });

        console.log("rowHandleChange");
        console.log("idx : " + index);
        console.log("name : " + name);
        console.log("value : " + value);
    };

    deleteRow(index){
        var currStock =this.state.formdata;
        const selectIdx = currStock.formdataStock.findIndex(u => u.id === index);
        currStock.formdataStock.splice(selectIdx, 1);
        this.setState({
            formdata: currStock
        });
    };

    addRow(){
        var currStock =this.state.formdata;
        let _id = this.idx + 1;
        this.idx = this.idx + 1;

        var newStock = {
            id: _id,
            m_souvenir_id: '',
            qty: '',
            note: ''
        };

        currStock.formdataStock.push(newStock);
        this.setState({
            formdata: currStock
        });
    };

    componentDidMount(){
        this.autoGenSouvenir();
        this.GetAllEmployee();
        this.GetAllMSouvenir();
    };

    async submitHandler(){

        console.log("Test")
        console.log(this.state.receivedDate._d)

        if(this.handleValidation()){
            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log("Debug add stock souvenir");
            console.log(this.state.formdata);

            var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

            let result = await tsouvenirapi.insertNew(this.state.formdata, this.state.receivedDate._d);
            
            if(result.status === 200)
            {
                console.log('Souvenir - Index.js Debugger');
                console.log(result.message);
                var scode = this.state.formdata.code
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(2, 'Success', scode);
            } 
            else 
            {
                console.log('Failed Create Stock Souvenir - Index.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
            }
            this.autoGenSouvenir();
        }
    };

    // async getDetailSouvenir(id) {
    //     let result = await tsouvenirapi.GetSouvenirItem(id);
    //     let currSouv = {};

    //     if(result.status === 200)
    //     {
    //         console.log('Transaction Item Souvenir - Create.js Debugger');
    //         console.log("getDetailSouvenir");
    //         console.log(result.message);

    //         result.message.map((ele) => {
    //             currSouv = ele;
    //         });

    //         this.setState({
    //             formdata: currSouv
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }
    render(){
        console.log("this.state.formdata");
        console.log(this.state.formdata);
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtn" onClick = { this.resetForm } type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title" >Add Souvenir Stock</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <p className="col-sm-3 control-label">*Transaction Code</p>
                                <div className="col-sm-4">
                                    <input ref="code" type="text" className="form-control" name="code" placeholder="Auto Generate" value={ this.state.formdata.code } disabled />
                                    <span style={{color: "red"}}>{this.state.errors.code}</span>
                                </div> 
                            </div>

                            <div className="form-group">
                                <p className="col-sm-3 control-label">*Received By</p>
                                <div className="col-sm-4">
                                    <select className="form-control" id="received_by" name="received_by" value={this.state.formdata.received_by} onChange={this.textChanged} >
                                        <option value="0"> - Select Employee -</option>
                                        {
                                            this.state.memployee.map((elemen) =>
                                                <option key={elemen._id} value={elemen._id}> {elemen.employee_name} </option>
                                            )
                                        }
                                    </select>
                                    <span style={{color: "red"}}>{this.state.errors.err_received_by}</span>
                                </div> 
                            </div>
                                                        
                            <div className="form-group">
                            <p className="col-sm-3 control-label">*Received Date</p>
                            <div className="col-sm-4">
                                <div className="input-group date">
                                
                                    <DatePicker
                                        selected={this.state.receivedDate}
                                        onChange={this.handleChangeDateRcBy}
                                        className="form-control pull-right"
                                        fixedHeight
                                        dateFormat="DD-MM-YYYY"
                                        id="datepicker"
                                        showMonthDropdown
                                        showYearDropdown
                                        placeholderText = "Select Date">
                                    </DatePicker>
                                    <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="form-group">
                                <p className="col-sm-3 control-label">Note</p>
                                <div className="col-sm-4">
                                    <textarea ref="note" type="text" className="form-control" name="note" rows="3" placeholder="Type Note" value={this.state.formdata.note} onChange={ this.textChanged }></textarea>
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
                                    <div className="col-md-0">
                                    </div>
                                    <div className="col-md-2" >
                                        <div style={{ float : 'left' }}>
                                            <button type="button" className="btn btn-primary pull-left" onClick = {() => {this.addRow()}}>
                                                Add Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                                                this.state.formdata.formdataStock.map((ele,x)=>
                                                    <tr id="addr0" key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>
                                                            <select
                                                            className="form-control" 
                                                            name="m_souvenir_id" 
                                                            value={this.state.formdata.formdataStock[x].m_souvenir_id}
                                                            onChange={this.rowHandleChange(ele.id)}>
                                                                <option value="">Select Souvenir</option>
                                                                {
                                                                    this.state.msouvenir.map((elemen) =>
                                                                        <option key={ elemen.name } value={ elemen._id }> { elemen.name } </option>
                                                                    )
                                                                }
                                                            </select>
                                                        </td>
                                                        
                                                        <td>
                                                            <input
                                                            type="number"
                                                            name="qty"
                                                            value={this.state.formdata.formdataStock[x].qty}
                                                            onChange={this.rowHandleChange(ele.id)}
                                                            className="form-control"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                            type="text"
                                                            name="note"
                                                            value={this.state.formdata.formdataStock[x].note}
                                                            onChange={this.rowHandleChange(ele.id)}
                                                            className="form-control"
                                                            />
                                                        </td>
                                                        
                                                        
                                                        <td>
                                                            <button type="button" className="btn btn-danger" onClick = {() => {this.deleteRow(ele.id)}}><i className="fa fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            }  
                                        </tbody>
                                    </table>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal-footer">
                    <button type="button" onClick={ this.resetForm } className="btn btn-warning pull-right" data-dismiss="modal" style={{marginRight : '5px'}}>Cancel</button>
                    <button type="button" onClick={ this.submitHandler } className="btn btn-primary" style={{marginRight : '5px'}}>Save</button>
                </div>
            </div>
        )
    }


};
export default CreateTSouvenir;
import React, { Component } from 'react';
import appconfig from '../../config/app.config.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import AutoGen from '../../common/autoGenerateNumber';

import tsouvenirapi from '../../handler/tsouvenir';
import employee_api from '../../handler/employee';
import msouvenirapi from '../../handler/msouvenir';

class EditTSouvenir extends Component{
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
                DetailSouvenir : [{
                    id     :  "",
                    m_souvenir_id: "",
                    qty     :  "",
                    note    :  ""
                }]
            },
            errors: {},
            receivedDate: '',
            memployee: [],
            msouvenir: [],
        };

        this.textChanged = this.textChanged.bind(this);
        this.handleChangeDateRcBy = this.handleChangeDateRcBy.bind(this);
        this.resetForm=this.resetForm.bind(this);
        this.GetAllEmployee = this.GetAllEmployee.bind(this);
        this.GetAllMSouvenir = this.GetAllMSouvenir.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.updateHandler=this.updateHandler.bind(this);
        // this.getSouvenirNameList = this.getSouvenirNameList.bind(this);
        // this.getSouvenirDetail = this.getSouvenirDetail.bind(this);
        this.addRow = this.addRow.bind(this);
        this.rowHandleChange = this.rowHandleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    };

    resetForm() {
        this.setState({
            formdata:{
                code:'',
                received_by: '',
                name_receiver: '',
                received_date: '',
                note: '',
                DetailSouvenir : [{
                    id     :  "",
                    m_souvenir_id: "",
                    qty     :  "",
                    note    :  ""
                }]
            },
            errors: {}
        });
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

    // async getSouvenirDetail(id) {
    //     let result = await tsouvenirapi.GetSouvenirItem(id);
    //     let currSouvenir = {};

    //     if(result.status === 200)
    //     {
    //         console.log('Souvenir - Edit.js Debugger');
    //         console.log("getTSouvenirBySouvenirId");
    //         console.log(result.message);

    //         result.message.map((ele) => {
    //             currSouvenir = ele;
    //         });

    //         this.setState({
    //             formdata: currSouvenir
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }

    componentDidMount(){
        this.GetAllEmployee();
        this.GetAllMSouvenir();
        //this.getSouvenirDetail();
        // this.getSouvenirNameList();
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

        // if(typeof field.receivedDate === "undefined" || field.receivedDate === null || field.receivedDate === ""){
        //     formIsValid = false;
        //     errors.err_receivedDate = "Received Date is empty!";
        // }

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

    async updateHandler(){

        console.log("Test")
        console.log(this.state.receivedDate._d)

        if(this.handleValidation()){
            let token = localStorage.getItem(appconfig.secure_key.token);
            console.log("Debug add stock souvenir");
            console.log(this.state.formdata);

            var userdata = JSON.parse(localStorage.getItem(appconfig.secure_key.userdata));

            let result = await tsouvenirapi.Update(this.state.formdata, this.state.receivedDate._d);
            
            if(result.status === 200)
            {
                console.log('Souvenir - Index.js Debugger');
                console.log(result.message);
                var scode = this.state.formdata.code
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(3, 'Success', scode);
            } 
            else 
            {
                console.log('Failed Create Stock Souvenir - Index.js Debugger');
                console.log(result.message);
                document.getElementById("hidePopUpBtn").click();
                this.props.modalStatus(0, 'Failed');
            }
        }
    };

    rowHandleChange = index => e => {
        const { name, value } = e.target;
        var currStock = this.state.formdata;
        var stock = currStock.DetailSouvenir.find(o => o.id === index);
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
        const selectIdx = currStock.DetailSouvenir.findIndex(u => u.id === index);
        currStock.DetailSouvenir.splice(selectIdx, 1);
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

        currStock.DetailSouvenir.push(newStock);
        this.setState({
            formdata: currStock
        });
    };

    // async getSouvenirNameList(){
    //     let result = await tsouvenirapi.GetListSouvenirName();

    //     if(result.status === 200)
    //     {
    //         console.log('Souvenir - edit.js Debugger');
    //         console.log("getSouvenirNameList");
    //         console.log(result);
    //         console.log(result.message);

    //         this.setState({
    //             SouvenirNameList: result.message
    //         });
    //     }
    //     else
    //     {
    //         console.log(result.message);
    //     }
    // }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            formdata : newProps.tsouvenir
        });
    }

    render(){
        // const { categories } = this.state;
        console.log("this.state.formdata");
        console.log(this.state.formdata);
        return(
            <div className="modal-content">
                <div className="modal-header">
                <button id="hidePopUpBtnUpdt" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick = { this.resetForm }>
                <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Edit Souvenir Stock - {this.props.tsouvenir.code}</h4>
                </div>

                <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <p className="col-sm-3 control-label">*Transaction Code</p>
                                <div className="col-sm-4">
                                    <input type="text" class="form-control" value={this.props.tsouvenir.code} disabled/>
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
                                        selected={this.props.receivedDate}
                                        onChange={this.props.handleChangeDateRcBy}
                                        value={this.props.tsouvenir.received_date}
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
                                                this.state.formdata.DetailSouvenir && this.state.formdata.DetailSouvenir.map((ele, x) =>
                                                    <tr id="addr0" key={ele._id}>
                                                        <td>{x+1}</td>
                                                        <td>
                                                            <select
                                                            className="form-control" 
                                                            name="m_souvenir_id" 
                                                            value={this.state.formdata.DetailSouvenir[x].m_souvenir_id}
                                                            onChange={this.rowHandleChange(ele.id)}>
                                                                <option value="">Select Souvenir</option>
                                                                {
                                                                    this.state.msouvenir.map((elemen) =>
                                                                        <option key={ elemen.name } value={ elemen.name }> { elemen.name } </option>
                                                                    )
                                                                }
                                                            
                                                            </select>
                                                        </td>
                                                        
                                                        <td>
                                                            <input
                                                            type="number"
                                                            name="qty"
                                                            value={this.state.formdata.DetailSouvenir[x].qty}
                                                            onChange={this.rowHandleChange(ele.id)}
                                                            className="form-control"
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                            type="text"
                                                            name="note"
                                                            value={this.state.formdata.DetailSouvenir[x].note}
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
                    <button type="button" onClick={ this.updateHandler } className="btn btn-primary" style={{marginRight : '5px'}}>Update</button>
                </div>
            </div>
        )
    }


};
export default EditTSouvenir;
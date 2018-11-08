import React, { Component } from 'react';
import employee_api from '../../handler/employee';
import appconfig from '../../config/app.config.json';
import validate_api from '../../handler/validate';


class DeleteEmployee extends Component {
    constructor(props){
        super(props);
        this.state={
            formdata: {
                employee_number: '',
                first_name: '',
                last_name: '',
                m_company_id: '',
                email: ''
            },
            errors: {},
            m_employee: []
        };
        
        //bind
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    async deleteHandler(){
        let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.props.m_employee._id);

            
            let hasil = await validate_api.checkEmployee(this.props.m_employee._id)

            console.log(hasil.message);

            if(hasil.message === "existing")
            {
                this.setState({
                    errors: {
                        err_employee_number : "Employee sudah terdaftar di User!"
                    }
                });
            }
            else
            {
                let result = await employee_api.Delete(this.props.m_employee._id);

                // alert(this.state.formdata._id + this.state.formdata.employee_number);
                if(result.status === 200){
                    console.log('Employee - Index.js Debugger');
                    console.log(result.message);
                    document.getElementById("hidePopUpBtnDel").click();
                    this.props.modalStatus(1, 'Success', this.props.m_employee.employee_number );
                }else{
                    console.log(result.message);
                    document.getElementById("hidePopUpBtnDel").click();
                    this.props.modalStatus(0, 'Failed', this.props.m_employee.employee_number); 
                }
            }
    }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnDel" type="button" className="btn btn-danger pull-right" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Delete Data </h4>
                    <p type="hidden"> {this.props.m_employee._id} </p>
                    <span className="help-block" style={{color: "red"}}>{this.state.errors.err_employee_number}</span>
                </div>
                    
                <form>
                    <div className="modal-body">
                        <button type="button" className="btn btn-primary" onClick = {this.deleteHandler} style={{marginRight : '5px'}}>Delete</button>
                        <button type="button" className="btn btn-warning pull-center" data-dismiss="modal">Cancel</button>      
                    </div>
                </form>
            </div>
        )
    }

}

export default DeleteEmployee;
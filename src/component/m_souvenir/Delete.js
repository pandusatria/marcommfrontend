import React, { Component } from 'react';
import msouvenirapi from '../../handler/msouvenir';

class DeleteMSouvenir extends Component{
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

        this.deleteHandler=this.deleteHandler.bind(this);

    }

    async deleteHandler() {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        console.log(this.state.formdata);
        let result = await msouvenirapi.Delete(this.props.msouvenir._id);

        alert(this.state.formdata._id + this.state.formdata.code);
        if(result.status === 200)
        {
            console.log('Souvenir - Index.js Debugger');
            console.log(result.message);
            document.getElementById("hidePopUpBtnDel").click();
            this.props.modalStatus(1, 'Success');
        }
        else
        {
            console.log(result.message);
            document.getElementById("hidePopUpBtnDel").click();
            this.props.modalStatus(2, 'Failed'); 
        }
    }

    // componentWillReceiveProps(newProps) {
    //     console.log(newProps);
    //     this.setState({
    //         formdata : newProps.client
    //     });
    // }

    render(){
        return(
            <div className="modal-content">
                <div className="modal-header">
                    <button id="hidePopUpBtnDel" type="button" className="btn btn-danger pull-right" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Delete Data</h4>
                </div>

                <form>
                    <div className="modal-body">
                    <button type="button" className="btn btn-primary" onClick = {this.deleteHandler} style={{marginRight : '5px'}}>Delete</button>
                        <button type="button" className="btn btn-warning pull-center" data-dismiss="modal">Cancel</button>      
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-warning pull-left" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-default" onClick = {this.deleteHandler} style={{marginRight : '5px'}}>Delete</button>
                    </div> */}
                </form>
            </div>
        )
    }
}
export default DeleteMSouvenir
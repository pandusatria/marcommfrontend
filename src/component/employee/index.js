import React ,{ Component } from 'react';
import employee_api from '../../handler/employee';
import DetailEmployee from './detail';

class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            m_employee : [],
            currEmployee : {},
        }
        this.GetAll = this.GetAll.bind(this);
        this.detailModalHandler = this.detailModalHandler.bind(this);
    }

    detailModalHandler(employee_id){
        var tmp = {};

        this.state.m_employee.map((ele) => {
            if(ele._id === employee_id){
                tmp = ele
            }
        });

        this.setState({
            currEmployee : tmp
        });
    }

    componentDidMount(){
        this.GetAll();
    }

    async GetAll(){
        let result = await employee_api.GetAll();

        if (result.status === 200)
        {
            console.log('index.js Debugger');
            console.log(result.message);
            this.setState({
                m_employee: result.message
            })
            console.log(this.state.m_employee)
        }else{
            console.log(result.message)
        }
    }
    render(){
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h3>
                        <b> Employee List </b>
                    </h3>
                    
                </section>
                <div>
                    <ol className="breadcrumb">
                        <li><a href="/dashboard"> Home </a></li>
                        <li><a href="/employee"> Master </a></li>
                        <li className="active"> List Employee </li>
                    </ol>
                </div>
                
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <div className="col-md-10">
                                    </div>
                                    <div className="col-md-2" >
                                        <div style={{ float : 'right' }}>
                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-create">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" className="form-control" placeholder="Company ID Number"/>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Company Name"/>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Select Company Name"/>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Created"/>
                                        </div>
                                        <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="Created By"/>
                                        </div>
                                        <div className="col-md-1" >
                                            <div style={{ float : 'right' }}>
                                                <button type="button" class="btn btn-warning" >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th> No </th>
                                                <th> Employee Number </th>
                                                <th> Employee Name </th>
                                                <th> Company Name </th>
                                                <th> Create Date </th>
                                                <th> Create By </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.m_employee.map((elemen, x) =>
                                                    <tr key={x}> 

                                                        <td> {x+1} </td>
                                                        <td> { elemen.employee_number} </td>
                                                        <td> { elemen.employee_name } </td>
                                                        <td> { elemen.company_name } </td>
                                                        <td> { elemen.created_date }</td>
                                                        <td> { elemen.created_by } </td>
                                                        <td>
                                                            <button className="btn btn-default" onClick={ () => {this.detailModalHandler(elemen._id)}} type="button" data-toggle="modal" data-target="#modal-detail" style={{ marginRight : '5px'}}> <i class="fa fa-search"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => {this.editModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-edit" style={{ marginRight : '5px'}}> <i class="fa fa-pencil"></i> </button>
                                                            <button className="btn btn-default" onClick={ () => { this.deleteModalHandler(elemen._id)} } type="button" data-toggle="modal" data-target="#modal-delete"> <i class="fa fa-trash"></i> </button>
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
                <div className="modal fade" id="modal-detail">
                    <div className="modal-dialog">
                        <DetailEmployee 
                            detailEmployee = { this.state.currEmployee }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default index;
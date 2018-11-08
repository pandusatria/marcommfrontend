import axios from 'axios';
import appconfig from '../config/app.config.json';              

const employee_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

            console.log('Employee : Axios User');

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data
        }
        catch (error) 
        {
            return error.response.data
        }
    },
    insertNew : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'POST',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                employee_number: formdata.employee_number,
                first_name: formdata.first_name,
                last_name: formdata.last_name,
                m_company_id: formdata.m_company_id,
                email: formdata.email
            }
        }

        console.log('Employee : Axios User');

        try {
            let result = await axios(option);
            console.log(result);
            return result.data
        } catch (error) {
            return error.response.data;
        }
    },
    Update : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee + formdata._id,
            method: 'PUT',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                employee_number: formdata.employee_number,
                first_name: formdata.first_name,
                last_name: formdata.last_name,
                m_company_id: formdata.m_company_id,
                email: formdata.email
            }
        }

        console.log('Employee Update : Axios User');

        try {
            let result = await axios(option);
            console.log(result);
            return result.data
        } catch (error) {
            return error.response.data;
        }
    },

    Delete : async(_id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee + _id,
            method: 'DELETE',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log("Employee Delete : Axios User");

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data
        }
        catch (error) 
        {
            return error.response.data
        }
    }

}

export default employee_api;
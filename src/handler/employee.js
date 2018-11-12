import axios from 'axios';
import appconfig from '../config/app.config.json';

const employee_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
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

    GetNew : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee + "new/",
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

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

    GetNewEdit : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        console.log("tertembak");
        let id = localStorage.getItem("employee_id")
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee + "newedit/" + id,
            method: 'GET',
            headers: {
                'Authotization' : token,
                'Content-Type' : 'application/json'
            }
        }

        try {
            let result = await axios(option);
            console.log(result);
            return result.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default employee_api;
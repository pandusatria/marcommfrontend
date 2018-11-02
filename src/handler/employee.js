import axios from 'axios';
import appconfig from '../config/app.config.json';

const employee_api = {
    GetAll : async() => {
        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'GET',
            headers: {
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
}

export default employee_api;
import axios from 'axios';
import appconfig from '../config/app.config.json';

const validate_api = {
    checkNumber : async (employee_number) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.validate + "checkNumber/" + employee_number,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Validate Check Employee Number : Axios User');
        console.log(option.url);

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data.message;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },

    checkEmployee : async(id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.validate + "checkEmployee/" + id,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Validate Check Employee ID in m_user : Axios User');
        console.log(option.url);

        try
        {
            let result = await axios(option);
            console.log(result);
            console.log(result.data.message)
            return result.data.message;
        }
        catch (error) 
        {
            return error.response.data;
        }
    }
}

export default validate_api;



import axios from 'axios';
import appconfig from '../config/app.config.json';

const unitapi = {
    GetAllUnit : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            
            url: appconfig.base_url + appconfig.endpoints.unit,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

            console.log('Unit : Axios User');

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

export default unitapi;
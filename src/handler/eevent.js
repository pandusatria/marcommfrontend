import axios from 'axios';
import appconfig from '../config/app.config.json';

const eevent_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.event,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
        }

            console.log('Event : Axios User');

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

export default eevent_api;
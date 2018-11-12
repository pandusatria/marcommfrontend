import axios from 'axios';
import appconfig from '../config/app.config.json';

const role_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.role,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Initialized Master Role : GetAll from frontend');

        try {
            let result = await axios(option);
            console.log('Showing all Data Role');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    }
};

export default role_api;
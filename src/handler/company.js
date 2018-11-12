import axios from 'axios';
import appconfig from '../config/app.config.json';

const company_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.company,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Initialized Master Company : GetAll from frontend');

        try {
            let result = await axios(option);
            console.log('Showing all Data User');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    }
};

export default company_api;

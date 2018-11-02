import axios from 'axios';
import appconfig from '../config/app.config.json';

const user_api = {
    login : async(username, password) => {
        let option = {
            url: appconfig.base_url + appconfig.endpoints.login, 
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }

        console.log('Initialized Login');
        console.log('Username : ' + username + ', Password : ' + password);

        try {
            let result = await axios(option);
            return result.data;
        } catch(error) {
            return error.response.data;
        }

    }
};

export default user_api;

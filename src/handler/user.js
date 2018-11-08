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

    },
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.user,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Initialized Master User : GetAll from frontend');

        try {
            let result = await axios(option);
            console.log('Showing all Data User');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },

    GetDetail : async(_id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.user + _id,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Initialized Master User : GetDetail from frontend');

        try {
            let result = await axios(option);
            console.log('Showing Detail Data User');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },

    insert : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.user,
            method: 'POST',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                username       : formdata.username,
                password       : formdata.password,
                m_role_id      : formdata.m_role_id,
                m_employee_id  : formdata.m_employee_id
            }
        };

        console.log('Initialized Master User : Insert from frontend');
        
        try {
            let result = await axios(option);
            console.log('Insert Data User');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },

    delete : async(_id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.user + _id,
            method: 'DELETE',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

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

};

export default user_api;

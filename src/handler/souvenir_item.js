import axios from 'axios';
import appconfig from '../config/app.config.json';

const souvenir_item_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Initialized Transaction Request Souvenir : GetAll from frontend');
            
        try {
            let result = await axios(option);
            console.log('Showing all Data Souvenir Item');
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },

    SearchRequest : async(query) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item + "search",
            method: 'POST',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                filter: query
            }
        };

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    }
};

export default souvenir_item_api;
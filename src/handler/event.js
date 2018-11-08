import axios from 'axios';
import appconfig from '../config/app.config.json';

const event_api = {
    GetAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.event,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Event : Axois User')

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch (error) {
            return error.response.data
        }
    },
    insertNew : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.event,
            method: 'POST',
            headers: {
                'authorization' : token,
                'Contennt-Type' : 'application/json'
            },
            data: {
                code        : formdata.code,
                event_name  : formdata.event_name,
                start_date  : formdata.start_date,
                end_date    : formdata.end_date,
                place       : formdata.place,
                budget      : formdata.budget,
                request_by  : formdata.request_by, 
                request_date: formdata.request_date,
                note        : formdata.note
            }
        }
        console.log('Event : Axios User');
        try {
            let result = await axios(option);
            console.log(result);
            return result.data
        } catch (error) {
            return error.response.data;
        }
    },

    GetAllEventHandlerSearch : async() => {
        
    }

}

export default event_api;

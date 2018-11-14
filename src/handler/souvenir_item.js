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
    },

    insert : async(formdata, duedate, id_req) => {
        console.log('insert tertembak');
        console.log(formdata);
        console.log(duedate);
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item,
            method: 'POST',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                code             : formdata.code,
                t_event_id       : formdata.t_event_id,
                request_by       : id_req,
                request_date     : formdata.request_date,
                request_due_date : duedate,
                status           : 1,
                note             : formdata.note,
                souvenir_request : formdata.formdataRequest
            }
        };

        console.log('Initialized Transaction Souvenir : Insert from frontend');
        
        try {
            let result = await axios(option);
            console.log('Insert Data Transaction Souvenir');
            return result.data;
        } catch(error) {
            console.log('gagal');
            return error.response.data;
        }
    },

    insertApproved : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item + "approved/" + formdata._id,
            method: 'PUT',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Initialized Transaction Souvenir : Approved from frontend');
        
        try {
            let result = await axios(option);
            console.log('Approved Transaction Souvenir');
            return result.data;
        } catch(error) {
            console.log('gagal');
            return error.response.data;
        }
    },

    insertRejected : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item + "rejected/" + formdata._id,
            method: 'PUT',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Initialized Transaction Souvenir : Rejected from frontend');
        
        try {
            let result = await axios(option);
            console.log('Rejected Transaction Souvenir');
            return result.data;
        } catch(error) {
            console.log('gagal');
            return error.response.data;
        }
    },

    insertReceived : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item + "received/" + formdata._id,
            method: 'PUT',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Initialized Transaction Souvenir : Received from frontend');
        
        try {
            let result = await axios(option);
            console.log('Received Transaction Souvenir');
            return result.data;
        } catch(error) {
            console.log('gagal');
            return error.response.data;
        }
    },

    update : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir_item + formdata._id,
            method: 'PUT',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                request_due_date : formdata.request_due_date,
                note             : formdata.note,
                souvenir_request : formdata.formdataRequest
            }
        };

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },
};

export default souvenir_item_api;
import axios from 'axios';
import appconfig from '../config/app.config.json';

const msouvenirapi = {
    GetAll : async(username, password) => {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.msouvenir,
            method: 'GET',
            // headers: {
            //     'authorization' : token,
            //     'Content-Type' : 'application/json'
            // }
        }

        console.log('Master Souvenir : Axios User');
        console.log("username : " + username + ", password : " + password)

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
    insertNew : async(formdata) => {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.msouvenir,
            method: 'POST',
            // headers: {
            //     'authorization' : token,
            //     'Content-Type' : 'application/json'
            // },
            data: {
                code: formdata.code,
                name: formdata.name,
                m_unit_id: formdata.m_unit_id,
                description: formdata.description
            }
        }

        console.log('Souvenir : Axios User');
        //console.log("username : " + username + ", password : " + password)

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
    Update : async(formdata) => {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.msouvenir + formdata._id,
            method: 'PUT',
            // headers: {
            //     'authorization' : token,
            //     'Content-Type' : 'application/json'
            // },
            data: {
                code: formdata.code,
                name: formdata.name,
                m_unit_id: formdata.m_unit_id,
                description: formdata.description
            }
        }

        console.log('Souvenir Update : Axios User');
        //console.log("username : " + username + ", password : " + password)

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
    Delete : async(_id) => {
        //let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.msouvenir + _id,
            method: 'DELETE',
            // headers: {
            //     'authorization' : token,
            //     'Content-Type' : 'application/json'
            // }
        }

        console.log('Souvenir Delete : Axios User');
        //console.log("username : " + username + ", password : " + password)

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
export default msouvenirapi;
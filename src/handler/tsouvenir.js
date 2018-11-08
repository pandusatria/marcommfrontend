import axios from 'axios';
import appconfig from '../config/app.config.json';



const tsouvenirapi = {

    GetAll : async(username, password) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir,
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        }

        console.log('Trasaction Souvenir : Axios User');
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
    GetAllTSouvenirHandlerSearch : async(query) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir + 'search',
            method: 'POST',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                filter: query
            }
        };

        console.log('Souvenir GetAllTSouvenirHandlerSearch : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.tsouvenir + 'search');
        console.log(token);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },
    insertNew : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir,
            method: 'POST',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                code: formdata.code,
                employee_name: formdata.employee_name,
                received_date: formdata.m_unit_id,
                note: formdata.note
            }
        }

        console.log('Transaction Souvenir : Axios User');
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
    // Update : async(formdata) => {
    //     let token = localStorage.getItem(appconfig.secure_key.token);
    //     let option = {
    //         url: appconfig.base_url + appconfig.endpoints.tsouvenir + formdata._id,
    //         method: 'PUT',
    //         headers: {
    //             'authorization' : token,
    //             'Content-Type' : 'application/json'
    //         },
    //         data: {
    //             code: formdata.code,
    //             name: formdata.name,
    //             m_unit_id: formdata.m_unit_id,
    //             description: formdata.description
    //         }
    //     }

    //     console.log('Souvenir Update : Axios User');
    //     //console.log("username : " + username + ", password : " + password)

    //     try
    //     {
    //         let result = await axios(option);
    //         console.log(result);
    //         return result.data
    //     }
    //     catch (error) 
    //     {
    //         return error.response.data
    //     }
    // },
    // Delete : async(_id) => {
    //     //let token = localStorage.getItem(appconfig.secure_key.token);
    //     let option = {
    //         url: appconfig.base_url + appconfig.endpoints.tsouvenir + _id,
    //         method: 'DELETE',
    //         // headers: {
    //         //     'authorization' : token,
    //         //     'Content-Type' : 'application/json'
    //         // }
    //     }

    //     console.log('Souvenir Delete : Axios User');
    //     //console.log("username : " + username + ", password : " + password)

    //     try
    //     {
    //         let result = await axios(option);
    //         console.log(result);
    //         return result.data
    //     }
    //     catch (error) 
    //     {
    //         return error.response.data
    //     }
    // },
}
export default tsouvenirapi;
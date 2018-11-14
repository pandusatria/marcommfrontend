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
    insertNew : async(formdata, receivedDate, id_req) => {
        console.log('insert tertembak');
        console.log(formdata);
        console.log(receivedDate);

        let token = localStorage.getItem(appconfig.secure_key.token);
        
        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir,
            method: 'POST',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                code : formdata.code,
                received_by: formdata.received_by,
                name_receiver : formdata.name_receiver,
                received_date : receivedDate,
                status        : 3, 
                note          : formdata.note,
                souvenir_stock : formdata.formdataStock
            }
        };

        console.log('Initialized Transaction Souvenir : Insert from frontend');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('Souvenir GetSouvenir : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.tsouvenir);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log("Result From Axios : ");
            console.log(result);
            return result.data;
        }
        catch (error)
        {
            console.log('failed');
            return error.response.data;
        }
    },
    Update : async(formdata, receivedDate, id) => {
        console.log('insert tertembak');
        console.log(formdata);
        console.log(receivedDate);
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir + id,
            method: 'PUT',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                code : formdata.code,
                received_by: formdata.received_by,
                name_receiver : formdata.name_receiver,
                received_date : receivedDate,
                status        : 3, 
                note          : formdata.note,
                DetailSouvenir : formdata.DetailSouvenir
            }
        }

        console.log('Souvenir Update : Axios User');
        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('Souvenir GetSouvenir : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.tsouvenir);
        console.log(option);
        //console.log("username : " + username + ", password : " + password)

        try
        {
            let result = await axios(option);
            console.log("Result From Axios : ");
            console.log(result);
            return result.data
        }
        catch (error) 
        {
            return error.response.data
        }
    },
    // GetSouvenirItem : async(id) => {
    //     let token = localStorage.getItem(appconfig.secure_key.token);

    //     let option = {
    //         url: appconfig.base_url + appconfig.endpoints.tsouvenir + 'getsouveniritem/' + id,
    //         method: 'GET',
    //         headers: {
    //             'authorization' : token,
    //             'Content-Type' : 'application/json'
    //         }
    //     };

    //     console.log('GetSouvenirItem : Axios User');
    //     console.log(appconfig.base_url + appconfig.endpoints.tsouvenir + 'getsouveniritem/' + id);
    //     console.log(token);

    //     try
    //     {
    //         let result = await axios(option);
    //         console.log(result);
    //         return result.data;
    //     }
    //     catch (error)
    //     {
    //         return error.response.data;
    //     }
    // },
    // GetListSouvenirName : async() => {
    //     let token = localStorage.getItem(appconfig.secure_key.token);

    //     let option = {
    //         url: appconfig.base_url + appconfig.endpoints.tsouvenir + "gettitle",
    //         method: 'GET',
    //         headers: {
    //             'authorization' : token,
    //             'Content-Type' : 'application/json'
    //         }
    //     };

    //     console.log('Souvenir GetListSouvenirName : Axios User');
    //     console.log(appconfig.base_url + appconfig.endpoints.supplier + "gettitle");
    //     console.log(token);
    //     console.log(option);

    //     try
    //     {
    //         let result = await axios(option);
    //         console.log('Souvenir GetListSouvenirName Result : Axios User');
    //         console.log(result);
    //         return result.data;
    //     }
    //     catch (error)
    //     {
    //         return error.response.data;
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
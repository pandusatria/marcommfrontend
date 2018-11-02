import axios from 'axios';
import appconfig from '../config/app.config.json';


const user_api = {
    login : async(username, password) => { //parameter bebas namanya, nanti sama spt :data
        let option = {
            url: appconfig.base_url + appconfig.endpoints.login,
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                //sama seperti backend: bebas namanya
                username: username,
                password: password
            }
        }

        console.log('Login : Axios User');
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
    }
}

export default user_api;



import axios from 'axios';
import appconfig from '../config/app.config.json';

<<<<<<< HEAD
const user_api = {
    login : async(username, password) => {
        let option = {
            url: appconfig.base_url + appconfig.endpoints.login, 
=======

const user_api = {
    login : async(username, password) => { //parameter bebas namanya, nanti sama spt :data
        let option = {
            url: appconfig.base_url + appconfig.endpoints.login,
>>>>>>> 4a4e2d3b0f2f64459d087c8e9c813164b43ca71a
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
<<<<<<< HEAD
=======
                //sama seperti backend: bebas namanya
>>>>>>> 4a4e2d3b0f2f64459d087c8e9c813164b43ca71a
                username: username,
                password: password
            }
        }

<<<<<<< HEAD
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
=======
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


>>>>>>> 4a4e2d3b0f2f64459d087c8e9c813164b43ca71a

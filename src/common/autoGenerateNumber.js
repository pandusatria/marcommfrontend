import axios from 'axios';
import appconfig from '../config/app.config.json';
import moment from 'moment';


Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
};

const AutoGen = {
    createCodeEvent: async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        console.log('Supplier createCodeEvent : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.event + "orderdesc");
        console.log(token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.event + "orderdesc",
            method: 'GET',
            headers: {
                'authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        try
        {
            console.log(option);
            let result = await axios(option);
            console.log(result);
            console.log(result.data.message);

            let data = result.data.message;
            console.log(data);
            if(data.length > 0)
            {   
                var date = moment().format("DDMMYY")

                if(data[0].code === null || typeof data[0].code === "undefined")
                {
                    return "TRWOEV30031800001";
                }
                else
                {
                    let lastcode= data[0].code;
                    console.log(lastcode);
                    console.log(lastcode.substring(12,17));

                    let str = "TRWOEV" + lastcode.substring(7,12)
                    console.log(str)

                    let lastnum = lastcode.substring(12,17);
                    console.log("lastnum : " + lastnum);

                    lastnum = parseInt(lastnum);
                    lastnum +=1;
                    let padnum = (lastnum).pad(5);
                    let gencode = "TRWOEV"+ date + padnum;
                    return gencode;
                }
            }
            else
            {
                return "TRWOEV30031800001";
            }
        }
        catch (error) 
        {
            console.log(option);
            console.log(error);
            return error.response.data;
        }
    }
}

export default AutoGen;
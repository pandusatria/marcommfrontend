import axios from 'axios';
import appconfig from '../config/app.config.json';
import moment from 'moment';

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
};

const AutoGen = {
    createCodeSouvenir : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        console.log('Souvenir createCodeSouvenir : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.msouvenir + "orderdesc");
        console.log(token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.msouvenir + "orderdesc",
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
                if(data[0].code === null || typeof data[0].code === "undefined")
                {
                    return "SV0001";
                }
                else
                {
                    let lastcode= data[0].code;
                    let lastnum = lastcode.replace("SV"," ");
                    lastnum = parseInt(lastnum);
                    lastnum +=1;
                    let padnum = (lastnum).pad(4);
                    let gencode = "SV"+ padnum;
                    return gencode;
                }
            }
            else
            {
                return "SV0001";
            }
        }
        catch (error) 
        {
            console.log(option);
            console.log(error);
            return error.response.data;
        }
    },
    createCodeTSouvenir : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        console.log('Transaction Souvenir createCodeTSouvenir : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.tsouvenir + "orderdesc");
        console.log(token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.tsouvenir + "orderdesc",
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
                // var tgl = moment().format("DDMMYY")
                if(data[0].code === null || typeof data[0].code === "undefined")
                {

                    // return "TRSV"+tgl+"00001";
                    return "TRSV27031800001";
                }
                else
                {
                    let lastcode= data[0].code;
                    console.log(lastcode)
                    console.log(lastcode.substring(10,15))
                    
                    let str = "TRSV"+lastcode.substring(4,10);
                    
                    console.log("STR" + str);
                    let lastnum = lastcode.substring(10,15);

                    console.log("lastnum" + lastnum);
                    
                    lastnum = parseInt(lastnum);
                    console.log("berubah" + lastnum);
                    lastnum +=1;
                    let padnum = (lastnum).pad(5);
                    let gencode = "TRSV" + moment().format("DDMMYY") + padnum;
                    return gencode;
                }
            }
            else
            {
                return "TRSV27031800001";
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
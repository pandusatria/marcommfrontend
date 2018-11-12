import decode from 'jwt-decode';
import appconfig from "../config/app.config.json";

const checkTokenExpired = {
    isTokenExpired : (token) => {
        if(typeof token === "undefined" || token === null || token === '') {
            return true;
        } else {
            console.log("debug token");
            console.log(localStorage.getItem(appconfig.secure_key.token));
            try
            {
                console.log('Check Token - chekTokenExporired.js Debugger');
                console.log(token);

                const decoded = decode(token, {complete: true});
                console.log(decoded);
                console.log(decoded.exp);
                console.log(Date.now() / 1000);
                if (decoded.exp < Date.now() / 1000)
                {
                    console.log("Harusnya ke sini");
                    localStorage.clear();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (err)
            {
                console.log("Ada error" + err);
                return false;
                // if(err.message === "Invalid token specified") {
                //     return true;
                // } else {
                //     return false;
                // }
            }
        }
    }
};

export default checkTokenExpired;
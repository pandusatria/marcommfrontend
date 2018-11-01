import decode from 'jwt-decode';

const checkTokenExpired = {
    isTokenExpired : (token) => {
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
            return false;
        }
    }
};

export default checkTokenExpired;
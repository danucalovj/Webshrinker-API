var axios = require("axios");

// WebShrinker API Base URL
var API_CATEGORIES_URL = 'https://api.webshrinker.com/categories/v3/';
var API_HOSTS_URL = 'https://api.webshrinker.com/hosts/v3/';
var API_SCREENSHOT_URL = 'https://api.webshrinker.com/thumbnails/v2/';

// Constructor
class Webshrinker {
    constructor(options){
        if (options.key === undefined || options.secret === undefined){
            throw new Error("Missing API Key or Secret Key");
        } else {
            try {
                this.authorization = 'Basic ' + Buffer.from(`${options.key}:${options.secret}`).toString('base64');
            } catch (error) {
                throw new Error("An error occured converting the API Key and Secret Key to Base64");
            }
        }
        if (options.taxonomy === undefined){
            this.taxonomy = '';
        }
        if (options.taxonomy == 'webshrinker'){
            this.taxonomy = '?taxonomy=webshrinker';
        }
    }
}

// Axios HTTP Request Dispatcher
Webshrinker.prototype.dispatch = function(FULL_URL) {
    return axios.create({
        baseURL: FULL_URL,
        timeout: 10000,
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            'Authorization': this.authorization
        }
    }).get()
};

// Website Category API Method
Webshrinker.prototype.GetCategories = function GetCategories(URL){
    var B64_URL = Buffer.from(URL).toString('base64');
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_CATEGORIES_URL + B64_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        if (response.status != 200){
            StatusCodeErrorHandler(response.status);
        } else {
            if (response.data.data === undefined || response.data.data.length === 0){
                throw new Error("Error: Empty Response");
            }
            return response.data.data[0];
        }        
    });    
}

// Website Category Listing API Method
Webshrinker.prototype.ListAllCategories = function ListAllCategories(){
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_CATEGORIES_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        if (response.status != 200){
            StatusCodeErrorHandler(response.status);
        } else {
            if (response.data.data === undefined || response.data.data.length === 0){
                throw new Error("Error: Empty Response");
            }
            return response.data.data;
        }        
    });
}

// Website Domain API Method
Webshrinker.prototype.GetDomain = function GetDomain(DOMAIN_NAME){
    var B64_URL = Buffer.from(DOMAIN_NAME).toString('base64');
    var FULL_URL = API_HOSTS_URL + B64_URL;
    return this.dispatch(FULL_URL).then(response => {
        if (response.status != 200){
            StatusCodeErrorHandler(response.status);
        } else {
            if (response.data === undefined || response.data.length === 0){
                throw new Error("Error: Empty Response");
            }
            return response.data;
        }        
    });
}

// Website Screenshot API Method
Webshrinker.prototype.GetScreenshot = function GetScreenshot(DOMAIN_NAME, SIZE){
    if (SIZE === undefined || SIZE == ''){
        throw new Error("No image size specified");
    }
    var B64_URL = Buffer.from(DOMAIN_NAME).toString('base64');
    var FULL_URL = API_SCREENSHOT_URL + B64_URL + '/info?size=' + SIZE;
    return this.dispatch(FULL_URL).then(response => {
        if (response.status != 200){
            StatusCodeErrorHandler(response.status);
        } else {
            if (response.data === undefined || response.data.length === 0){
                throw new Error("Error: Empty Response");
            }
            return response.data;
        }        
    });
}

// Status Code Error Handler
function StatusCodeErrorHandler(status_code){
    if (status_code == 202){
        throw new Error("Accepted – Your request was successful but is still being processed on the server, check back soon");
    }
    if (status_code == 400){
        throw new Error("Bad Request – One or more parameters in the request are invalid");
    }
    if (status_code == 401){
        throw new Error("Unauthorized – Your API key/secret key is wrong or the key doesn’t have permission");
    }
    if (status_code == 402){
        throw new Error("Payment Required – Your account balance is used up, purchase additional requests in the account dashboard");
    }
    if (status_code == 412){
        throw new Error("Precondition Failed – Unable to satisfy the category request because there is not enough information available to classify the given URL");
    }
    if (status_code == 429){
        throw new Error("Too Many Requests – Too many requests in a short time");
    }
    if (status_code == 500){
        throw new Error("Internal Server Error – There was an issue processing the request, try again");
    }
}

// Export Module
module.exports = Webshrinker;


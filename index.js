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

Webshrinker.prototype.GetCategories = function GetCategories(URL){
    var B64_URL = Buffer.from(URL).toString('base64');
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_CATEGORIES_URL + B64_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        return response.data.data[0];
    });
    
}

Webshrinker.prototype.ListAllCategories = function ListAllCategories(){
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_CATEGORIES_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        return response.data.data;
    });
}

Webshrinker.prototype.GetDomain = function GetDomain(DOMAIN_NAME){
    var B64_URL = Buffer.from(DOMAIN_NAME).toString('base64');
    var FULL_URL = API_HOSTS_URL + B64_URL;
    return this.dispatch(FULL_URL).then(response => {
        return response.data;
    });
}

Webshrinker.prototype.GetScreenshot = function GetScreenshot(DOMAIN_NAME, SIZE){
    if (SIZE === undefined || SIZE == ''){
        throw new Error("No image size specified");
    }
    var B64_URL = Buffer.from(DOMAIN_NAME).toString('base64');
    var FULL_URL = API_SCREENSHOT_URL + B64_URL + '/info?size=' + SIZE;
    return this.dispatch(FULL_URL).then(response => {
        return response.data;
    });
}

module.exports = Webshrinker;


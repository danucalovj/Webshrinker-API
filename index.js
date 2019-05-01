var axios = require("axios");

// WebShrinker API Base URL
var API_URL = 'https://api.webshrinker.com/categories/v3/';

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
        timeout: 5000,
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            'Authorization': this.authorization
        }
    }).get()
};

Webshrinker.prototype.GetCategories = function GetCategories(URL){
    var B64_URL = Buffer.from(URL).toString('base64');
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_URL + B64_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        return response.data.data[0];
    });
    
}

Webshrinker.prototype.ListAllCategories = function ListAllCategories(){
    var taxonomy = this.taxonomy || '';
    var FULL_URL = API_URL + taxonomy;
    return this.dispatch(FULL_URL).then(response => {
        return response.data.data;
    });
}

module.exports = Webshrinker;


# Webshrinker-API
Unnoficial Node.js Client for the Webshrinker APIs (v3) available at https://www.webshrinker.com

## Installation
To install via NPM, run the following command:
```
npm install webshrinker-api
```

## Website Category API
For official documentation visit https://docs.webshrinker.com/v3/website-category-api.html.

This API returns the category (single) or categories (multiple) of a particular website. Webshrinker can return the categories based on either Webshrinker's taxonomy or the standard IAB Content Taxonomy.

### Example

```javascript
var Webshrinker = require('webshrinker-api');

var webshrinkerClient = new Webshrinker({key: "YOUR_API_KEY", secret: "YOUR_API_SECRET"});

webshrinkerClient.GetCategories("www.webshrinker.com").then(function(data){
    console.log(data);
});
```

This should return something similar to:

```json
{
    "categories": [
        {
            "confident": true,
            "id": "IAB19",
            "label": "Technology & Computing",
            "parent": "IAB19",
            "score": "0.855809166500086094"
        },
        {
            "confident": true,
            "id": "IAB19-18",
            "label": "Internet Technology",
            "parent": "IAB19",
            "score": "0.824063117153139624"
        }
    ],
    "url": "webshrinker.com"
}
```

## TODO
Currently this NPM module only supports WebShrinker's Website Category API. Future releases will support the Website Domain API and Website Screenshot API.

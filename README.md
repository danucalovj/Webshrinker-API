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
The following example returns the categories using the default IAB Content Taxonomy:

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

To change the taxonomy to use Webshrinker's taxonomy, specify the taxonomy as "webshrinker" in the options:

```javascript
var webshrinkerClient = new Webshrinker({
    key: "YOUR_API_KEY", 
    secret: "YOUR_API_SECRET", 
    taxonomy: "webshrinker"
    });
```

Then, call the GetCategories function:

```javascript
webshrinkerClient.GetCategories("www.webshrinker.com").then(function(data){
    console.log(data);
});
```

This should return the categories using Webshrinker's taxonomy, which is much more simplified than the IAB Content Taxonomy:

```json
{
    "categories": [
        {
            "id": "business",
            "label": "Business"
        },
        {
            "id": "informationtech",
            "label": "Information Technology"
        }
    ],
    "url": "webshrinker.com"
}
```

## List All Categories
For official documentation visit https://docs.webshrinker.com/v3/website-category-api.html#category-taxonomies.

This API returns all of the available categories in Webshrinker's API. Webshrinker can return the categories based on either Webshrinker's taxonomy or the standard IAB Content Taxonomy.

### Example

```javascript
var Webshrinker = require('webshrinker-api');

var webshrinkerClient = new Webshrinker({key: "YOUR_API_KEY", secret: "YOUR_API_SECRET"});

webshrinkerClient.ListAllCategories().then(function(data){
    console.log(data);
});
```

This should return all of the available categories in the IAB Content Taxonomy format:

```json
{
    "categories": {
        "IAB1": {
            "IAB1": "Arts & Entertainment",
            "IAB1-1": "Books & Literature",
            "IAB1-2": "Celebrity Fan/Gossip",
            "IAB1-3": "Fine Art",
            "IAB1-4": "Humor",
            "IAB1-5": "Movies",
            "IAB1-6": "Music & Audio",
            "IAB1-7": "Television & Video"
        },
        "IAB10": {
            "IAB10": "Home & Garden",
            "IAB10-1": "Appliances",
            "IAB10-2": "Entertaining",
            "IAB10-3": "Environmental Safety",
            "IAB10-4": "Gardening",
            "IAB10-5": "Home Repair",
            "IAB10-6": "Home Theater",
            "IAB10-7": "Interior Decorating",
            "IAB10-8": "Landscaping",
            "IAB10-9": "Remodeling & Construction"
        },

        ...

    }
}
```

Once again, if you need to change the taxonomy to Webshrinker's taxonomy, just change the options when declaring the client:

```javascript
var webshrinkerClient = new Webshrinker({
    key: "YOUR_API_KEY", 
    secret: "YOUR_API_SECRET", 
    taxonomy: "webshrinker"
    });
```

## TODO
Currently this NPM module only supports WebShrinker's Website Category API. Future releases will support the Website Domain API and Website Screenshot API.

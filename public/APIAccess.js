AmazonSearch = function(searchTerms){
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var serverURL = 'http://api-prd.axesso.de/amz/amazon-search-by-keyword-asin?keyword=';
    serverURL += searchTerms + '&domainCode=com&sortBy=date-desc-rank&page=1';
    request.open('GET', serverURL, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(console.log(foundProucts));
      } else {
        console.log('error');
      }
    }
    request.send();
}
AmazonAccess = function(productID){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var serverUrl = 'http://api-prd.axesso.de/amz/amazon-lookup-product?url=';
    //var productURL = '?url=https://www.amazon.com/dp/B01MQNPOUF';
    prodURL = 'https://www.amazon.com/dp/';
    serverURL += prodURL+productID;
    request.open('GET', serverURL, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        console.log(data.productTitle);
        console.log(data.productRating);
        console.log(data.price);
        console.log(data.productDescription);
        /*data.forEach(productDetails => {
                console.log(productDetails.name)
                console.log(productDetails.title)
        })*/
      } else {
        console.log('error');
      }

    }

    request.send();
}
WalmartSearch = function(searchTerms){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var serverURL = 'http://api-wlm.axesso.de/wlm/walmart-search-by-keyword?keyword=';
    serverURL += searchTerms + '&page=1&type=text&sortBy=best_match';
    request.open('GET', serverURL, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        data.forEach(console.log(foundProucts));
      } else {
        console.log('error');
      }
    }
    request.send();
}
WalmartAccess = function(productURL){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var serverUrl = 'http://api-wlm.axesso.de/wlm/walmart-lookup-product?url=';
    //var productURL = '?url=https://www.amazon.com/dp/B01MQNPOUF';
    serverURL += productURL;
    request.open('GET', serverURL, true);
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        console.log(data.productTitle);
        console.log(data.productRating);
        console.log(data.price);
        console.log(data.productDescription);
        /*data.forEach(productDetails => {
                console.log(productDetails.name)
                console.log(productDetails.title)
        })*/
      } else {
        console.log('error');
      }

    }

    request.send();
}

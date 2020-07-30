AmazonAccess = function(productURL){
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
var serverUrl = 'http://api-prd.axesso.de/amz/amazon-lookup-product';
//var productURL = '?url=https://www.amazon.com/dp/B01MQNPOUF';
serverURL += productURL;
request.open('GET', 'http://api-prd.axesso.de/amz/amazon-lookup-product?url=https://www.amazon.com/dp/B01MQNPOUF', true);
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

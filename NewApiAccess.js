
createJob = function(sourceWebsite,topic,values){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var http = new XMLHttpRequest();
    var url = "https://api.priceapi.com/v2/job";
    http.open("POST", url, true);
    String jobID;
    http.withCredentials = true;
    //Send the proper header information along with the request
    http.setRequestHeader("token", PRICEAPI_TOKEN);
    http.setRequestHeader("source", sourceWebsite);
    http.setRequestHeader("country", "us");
    http.setRequestHeader("topic", topic);
    http.setRequestHeader("key", "us");
    http.setRequestHeader("values", values);
    var requestData = new Document();
    http.onreadystatechange = function() {//Call a function when the state changes.
        var data = JSON.parse(this.response)
        if(http.readyState == 4 && http.status == 200) {
          jobID = data.body().get("job_id");
        }
    };
    http.send();
    return jobID;
};
jobStatus = function(jobID){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    serverURL += jobID + '?token=$' + PRICEAPI_TOKEN;
    request.withCredentials = true;
    String status;
    request.open('GET', serverURL, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        status =data.body().get("status");
    }

    };
    request.send();
    return status;
};

searchJobResults = function(sourceWebsite,values){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    var jobID = createJob(sourceWebsite,"search_results",values);

    while(jobStatus(jobID) != "finished"){
        continue;
    }
    var searchResults;
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    serverURL += jobID + '/download.json?token=$' + PRICEAPI_TOKEN;
    request.open('GET', serverURL, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
            searchResults =data.body().get("results").get("content").get("search_results");
        }
    };
    request.send();
    return searchResults;
};
productDescriptionResults = function(productID){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    var jobID = createJob(sourceWebsite,"product",values);
     while(jobStatus(jobID) != "finished"){
        continue;
    }
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    var productResults;
    serverURL += jobID + '/download.json?token=$' + PRICEAPI_TOKEN;
    request.open('GET', serverURL, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
            productResults =data.body().get("results").get("content").get("feature_bullets");
        }
    };
    request.send();
    return productResults;
};

couponRequestResults = function(productID){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    var jobID = createJob(sourceWebsite,"offers",productID);
     while(jobStatus(jobID) != "finished"){
        continue;
    }
    var offers;
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    serverURL += jobID + '/download.json?token=$' + PRICEAPI_TOKEN;
    request.open('GET', serverURL, true);
    request.onload = function() {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
            offers =data.body().get("results").get("content").get("offers");;
        }
    };
    request.send();
    return offers;
};

reverseSearchAPICreate = function(imageURL){
    var PRICEAPI_TOKEN = "<<42a9f4490f48fd2fa9b3f6f1c71ca3ba>>";
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var listLabel = imageURL + "string (optional)";
    var data = JSON.stringify({
      "images": [
        "http://domain.com/image.png"
      ],
      "list_label": listLabel
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.infringement.report/2.0/search");
    xhr.setRequestHeader("x-api-key", PRICEAPI_TOKEN);
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
}

reverseImageResults = function(imageURL){
    var data = "{}";
    reverseSearchAPICreate(imageURL);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var listLabel = imageURL + "string (optional)";
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "https://api.infringement.report/2.0/list/%7B"+listLabel+"%7D/query?use_ignore_lists=false");
    xhr.setRequestHeader("x-api-key", "<<apiKey>>");

    xhr.send(data);
}

function sleep(milliseconds) { 
    let timeStart = new Date().getTime(); 
    while (true) { 
      let elapsedTime = new Date().getTime() - timeStart; 
      if (elapsedTime > milliseconds) { 
        break; 
      } 
    } 
  }
  
createJob = function(sourceWebsite,topic,values){
   var proxyURL = 'https://cors-anywhere.herokuapp.com/';
   var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
	var jobID = "some bs";
	var results;
	var key = 'term';
	if(topic == 'product'){
		key = 'id';
	}
	console.log("In create job");
	$.ajax({
		async:false,
		type: "POST",
		url: proxyURL +'https://api.priceapi.com/v2/jobs/?token=ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ&source='+sourceWebsite+'&country=us&topic='+topic+'&key='+key+'&values='+values,
		headers: {'Access-Control-Allow-Origin':'*'},
		dataType: 'json',
        success: function(data){
			jobID = data.job_id;
			console.log('job id:'+ jobID);
			
			sleep(3000);
			var jobStatusCheck = jobStatus(jobID);
			console.log('after job status - ----jobStatusCheck:'+ jobStatusCheck);
			if(jobStatusCheck == 'finished') {
				if(topic == 'search_results'){
					results = searchJobResults(jobID);
					console.log('results:'+results);
				}
				else if(topic == 'product'){
					results = productDescriptionResults(jobID);
					console.log(results);
				} else {
					console.log('no matcjing topic');
				}
			}
        }
	});
	return results;
    
};
jobStatus = function(jobID){
    var proxyURL = 'https://cors-anywhere.herokuapp.com/';
     var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    var serverURL = proxyURL +'https://api.priceapi.com/v2/jobs/';
    serverURL += jobID + '?token=' + PRICEAPI_TOKEN;
	var jobstatus;
	console.log('job status check');
    $.ajax({
		async:false,
		type: "GET",
		url: serverURL,
		headers: {'Access-Control-Allow-Origin':'*'},
		dataType: 'json',
		success: function(data){
            //process the JSON data etc
			jobstatus = data.status;
			console.log('jobstatus....'+jobstatus);
        }
	})
	return jobstatus;
};

searchJobResults = function(jobid){
     var proxyURL = 'https://cors-anywhere.herokuapp.com/';
var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var searchResults;
	
    var serverURL = proxyURL +'https://api.priceapi.com/v2/jobs/';
    $.ajax({
		async:false,
		type: "GET",
		url: serverURL+jobid + '/download.json?token=' + PRICEAPI_TOKEN,
		headers: {'Access-Control-Allow-Origin':'*'},
		dataType: 'json',
		success: function(data){
            //process the JSON data etc
			searchResults = (data.results)[0].content.search_results;
			console.log('searchJobResults:'+ searchResults);
        }
	})
    return searchResults;
};
productDescriptionResults = function(jobid){
	var proxyURL = 'https://cors-anywhere.herokuapp.com/';	
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var productResults;
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    $.ajax({
		async:false,
		headers: {'Access-Control-Allow-Origin':'*'},
		dataType: 'json',
		type: "GET",
		url: proxyURL+serverURL+jobid + '/download.json?token=' + PRICEAPI_TOKEN,
		success: function(data){
            //process the JSON data etc
			productResults = (data.results)[0].content.search_results;
        }
	})
    return productResults;
};

couponRequestResults = function(productID){
    var PRICEAPI_TOKEN = "ZQEXKSMPEPDVTCVQYMBOFDUVPXXGUBKMGDUULDEKYZNCKJKTUWNCIWYANJDKMVBQ";
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.withCredentials = true;
    var jobID = createJob(sourceWebsite,"offers",productID);
     while(jobStatus(jobID) != "finished"){
        continue;
    }
    var offers;
    var serverURL = 'https://api.priceapi.com/v2/jobs/';
    serverURL += jobID + '/download.json?token=$' + PRICEAPI_TOKEN;
     $.ajax({
		async:false,
		headers: {'Access-Control-Allow-Origin':'*'},
		dataType: 'jsonx',
		type: "GET",
		url: serverURL+jobid + '/download.json?token=' + PRICEAPI_TOKEN,
		success: function(data){
            //process the JSON data etc
			productResults = (data.results)[0].content.search_results;
        }
	})
    //request.send();
    return offers;
};

reverseSearchAPICreate = function(imageURL){
    var PRICEAPI_TOKEN = "<<42a9f4490f48fd2fa9b3f6f1c71ca3ba>>";
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var listLabel = imageURL + "string (optional)";
    var data = JSON.stringify({
      "images": [
        imageURL
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

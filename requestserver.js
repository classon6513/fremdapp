var $ = require('cheerio') //Module for web scraping
var request = require('request') //Module for HTTP
var express = require('express'); //Module for interface
var bodyParser = require('body-parser'); //Module for reading body in POST
var app = express();
var fs = require('fs'); //Module for local file reading, hosts index.html
//var wait = require('wait.for-es6'); //Lazy, avoids express not having good API
var domainvalue;

function gotHTML(err, resp, html) { //Cheerio Web Scraper
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  parsedHTML('p').map(function(i, link) {
    var href = $(link).text();
    //return href;
	domainvalue = href;
	console.log(domainvalue);
  });
}

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({ type: 'application/*+json' })); 

app.get('/',function(req, res) {
  console.log("Server Response");
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
	});
  res.send("we got" +domainvalue);
});

app.post('/', function(req, res, next) {
	res.set({
		'Content-Type': 'text/html',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"
	});
  domain = req.body.url;
  console.log(req.body);
  res.json(req.body);
  //request(str, gotHTML);
  //var data = yield wait.for (request,str, gotHTML);
  //var data = yield wait.for (test, "hmm");
  //console.log("post str "+str); //executed immediately
  //res.send(str);
  request(domain, gotHTML);
  res.send();
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

var domain = 'http://fhs.d211.org/athletics/'
request(domain, gotHTML);

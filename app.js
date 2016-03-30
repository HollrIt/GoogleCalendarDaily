var unirest = require('unirest');
var hollrit = require('hollrit');
var login = hollrit.login;
var send = hollrit.send;

//Calendar and auth settings
var calendarId = "calendar id to query";
var key = "your google api key";
var hollritUsername = "";
var hollritPwd = "";
var hollritTag = "";

var dt = new Date();
var day = dt.getDate();
var month = dt.getMonth() + 1;

var url = "https://content.googleapis.com/calendar/v3/calendars/"+calendarId+"/events?timeMax=2016-" + month + "-" + day + "T23%3A59%3A00Z&timeMin=2016-" + month + "-" + day + "T00%3A00%3A00Z&key="+key;

unirest.get(url).end(function (response) {
	var items = JSON.parse(response.raw_body).items;
	var events = "";
	for (i in items) {
		events = events + items[i].summary + "\r\n\r\n";
	}
	if (events === "")
		return;
	login(hollritUsername, hollritPwd).then(function (currentUser) {
		send(currentUser, hollritTag, + events);
	});
});

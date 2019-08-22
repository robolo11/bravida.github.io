var _timeinterval = null;
var _endtime = null;
var _id = null;

function updateClock() {
  $.ajax({
    dataType: 'jsonp',
    jsonCallback: 'mycallback',
    url: "https://swedishtime.azurewebsites.net/api/SwedishTime?callback=mycallback",
    success:function(data) {
      var time = data.datetime;
    }
  });
}

function mycallback(XMLHttpRequest, data) {
  var headers = XMLHttpRequest.getAllResponseHeaders();
  datetimeNow = new Date(data.currentDateTime);

  var t = Date.parse(_endtime) - Date.parse(datetimeNow);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  var clock = document.getElementById(_id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');

  daysSpan.innerHTML = days;
  hoursSpan.innerHTML = ('0' + hours).slice(-2);

  if (t <= 0) {
    clearInterval(_timeinterval);
  }
}

function initializeClock(id, endtime) {
  _endtime = endtime;
  _id = id;

  updateClock();
  _timeinterval = setInterval(updateClock, 1000);
}

function daysBetweenDate(firstDate, secondDate) {
  var oneDay = 24 * 60 * 60 * 1000;
  return Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay));
}
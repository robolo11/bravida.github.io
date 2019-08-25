var _endtime = null;
var _id = null;

function daysBetweenDate(firstDate, secondDate) {
  var oneDay = 24 * 60 * 60 * 1000;
  return Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay));
}

function updateMainClock(id, endtime) {
  _endtime = endtime;
  _id = id;

  updateClock();
}

function updateClock() {
  $.ajax({
    dataType: 'jsonp',
    jsonCallback: 'mycallback',
    url: "https://swedishtime.azurewebsites.net/api/SwedishTime?callback=mycallback"
  });
}

function mycallback(data) {
  datetimeNow = new Date(data.currentDateTime);

  var t = Date.parse(_endtime) - Date.parse(datetimeNow);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  var clock = document.getElementById(_id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');

  if (t <= 0) {
    daysSpan.innerHTML = '0';
    hoursSpan.innerHTML = '0';
  }
  else {
    daysSpan.innerHTML = days;
    hoursSpan.innerHTML = ('0' + hours).slice(-2);
  }
}
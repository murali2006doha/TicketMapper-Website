//Controller handling all CRUD operations on TicketMaster data
const apiKey = "YVh0gHwdibyTuURaPYlAy5xbkx7uaC0B";
var axios = require("axios");

//TicketMaster API returns list of attractions based on the searched keyword
exports.listAttractions = function (req, res, next) {
  let queryString = "?size=200&sort=name,asc&keyword=" + req.params.keyword + "&apikey=" + apiKey;
  var url = "https://app.ticketmaster.com/discovery/v2/attractions.json" + queryString;

  axios.get(url)
    .then(function (response) {
      var data = response.data;
      if (data.page.totalElements !== 0) {
        var attractions = []
        Object.values(data._embedded.attractions).forEach(function (attraction) {
          var attractionDetails = {
            performerID: attraction.id,
            performer: attraction.name,
            upcomingEvents: attraction.upcomingEvents._total || 0
          }
          if (attractionDetails.upcomingEvents != 0) {
            attractions.push(attractionDetails);
          }
        });
        var att = {
          search: req.params.keyword,
          attractions: attractions
        }
        res.json(att);
      }
      else {
        var attractions = []
        var att = {
          search: req.params.keyword,
          attractions: attractions
        }

        res.json(att);
      }
    })
    .catch(function (err) {
      res.json(err);
    });
};


//TicketMaster API call that returns list of events based on the attraction ID
exports.listEvents = function (req, res, next) {
  var keyword = req.params.keyword;
  let queryString = "?attractionId=" + keyword + "&size=200&sort=date,asc&apikey=" + apiKey;
  var url = "https://app.ticketmaster.com/discovery/v2/events.json" + queryString;

  axios.get(url)
    .then(function (response) {
      var data = response.data;
      if (data.page.totalElements !== 0) {
        var attractionList = data._embedded.events[0]._embedded.attractions
        for (var i = 0; i < attractionList.length; i++) {
          if (attractionList[i].id === req.params.keyword) {
            var attraction = attractionList[i].name;
          }
        }
        var eventList = []
        var count = 1
        Object.values(data._embedded.events).forEach(function (event) {
          if (event._embedded.venues[0].location === undefined) {
            return;
          }
          var curEvent = {
            num: count,
            id: event.id,
            title: event.name,
            loc: event._embedded.venues[0].city.name,
            date: event.dates.start.localDate,
            lat: event._embedded.venues[0].location.latitude,
            lng: event._embedded.venues[0].location.longitude
          }
          if (event._embedded.venues[0].state !== undefined) {
            if (event._embedded.venues[0].state.stateCode !== undefined) {
              curEvent.loc = curEvent.loc + ", " + event._embedded.venues[0].state.stateCode
            }
          }
          curEvent.loc = curEvent.loc + ", " + event._embedded.venues[0].country.name
          count++
          eventList.push(curEvent);
        });
        var att = {
          performerID: req.params.keyword,
          performer: attraction,
          events: eventList
        }
        res.json(att);
      }
      else {
        var eventList = []
        var att = {
          performerID: req.params.keyword,
          performer: attraction,
          events: eventList
        }
        res.json(att);
      }
    }).catch(function (err) {
      res.json(err);
    });;
};

//TicketMaster API call that returns event details based on the event ID
exports.listEventDetails = function (req, res, next) {
  var id = req.params.keyword;
  var idList = id.split("&");
  var eventID = idList[1];
  var url = "https://app.ticketmaster.com/discovery/v2/events/" + eventID + ".json?apikey=" + apiKey;

  axios.get(url)
    .then(function (response) {
      var data = response.data;
      var attractions = [];
      Object.values(data._embedded.attractions).forEach(function (attraction) {
        attractions.push(attraction.name);
      });
      var priceRange = data.priceRanges ?
        data.priceRanges[0].currency + " " + data.priceRanges[0].min.toString() + " - " + data.priceRanges[0].currency + " " + data.priceRanges[0].max.toString() :
        "No Price Range Available";
      var eventDetails = {
        artists: attractions.join(", "),
        priceRange: priceRange,
        name: data.name,
        url: data.url,
        date: data.dates.start.localDate,
        time: data.dates.start.localTime,
        location: data._embedded.venues[0].city.name + ", " + data._embedded.venues[0].country.name,
        venue: data._embedded.venues[0].name,
        image: data.images[0].url,
        description: data.description || "No Description Available",
        performerID: idList[0]
      }
      res.json(eventDetails);
    })
    .catch(function (err) {
      res.json(err);
    });;
};

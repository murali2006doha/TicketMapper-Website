const apiKey = "YVh0gHwdibyTuURaPYlAy5xbkx7uaC0B";
var axios = require("axios");
var attractions = require('../controller/attractions_controller');
var users = require('../controller/user_controller');

/*
Routes URLs to different REST methods based on method that is called in reducer files. 
*/

module.exports = function (app) {
  app.route('/resultpage/:keyword').get(attractions.listAttractions);
  app.route('/mappage/:keyword').get(attractions.listEvents);
  app.route('/eventDetailsPage/:keyword').get(attractions.listEventDetails);
};
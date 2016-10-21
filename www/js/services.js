angular.module('starter.services', [])

.factory('Shows', function($http, $stateParams) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shows = [];

  return {
    all: function() {
    return $http.get("http://goco.herokuapp.com/concerts.json")
       .then(function(response) {
         shows = response.data;
         return shows;
       })
                },
    get: function(showId) {
      for (var i = 0; i < shows.length; i++) {
        if (shows[i].id === parseInt(showId)) {
          return shows[i];
        }
      }
      return null;
                },
    book: function(showId, user_name, nb_people) {
      return $http.post("http://goco.herokuapp.com/concerts/" + showId + "/reservation.json", {booking: {user_name: user_name, nb_people: nb_people}}).then(function(response){
        booking = response.data;
        return booking;
      });
    },
   };
})


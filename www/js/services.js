angular.module('starter.services', [])

.factory('Shows', function($http, $stateParams) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  return {
    all: function() {
    return $http.get("http://goco.herokuapp.com/concerts.json").then(function(response) {
         shows = response.data;
          return shows;
       })

                },
  search: function(concert_location, music_style) {
     /*
 +    the url below is to be replaced by a url like this one once it is implemented in the api ("Back" project):
 +
 +    return $http.get("http://goco.herokuapp.com/concerts/search.json?location=" + concert_location)
 +    */
      if (music_style=="Tous" & concert_location=="")
      {
      return $http.get("http://goco.herokuapp.com/concerts.json").then(function(response) {
      shows = response.data;
      return shows;
      })
      }
      else if (music_style=="Tous" & concert_location==='undefined')
      {
      return $http.get("http://goco.herokuapp.com/concerts.json").then(function(response) {
      shows = response.data;
      return shows;
      })
      }
      else if (music_style=="Tous")
      {
      return $http.get("http://goco.herokuapp.com/concerts/search.json?location="+concert_location).then(function(response) {
      shows = response.data;
      return shows;
      })
      }
      else if (typeof concert_location==='undefined' || concert_location=="")
      {
      return $http.get("http://goco.herokuapp.com/concerts/search.json?music_style="+music_style).then(function(response) {
      shows = response.data;
      return shows;
      })
      }
      else if (typeof music_style==='undefined' || music_style=="")
      {
      return $http.get("http://goco.herokuapp.com/concerts/search.json?location="+concert_location).then(function(response) {
      shows = response.data;
      return shows;
      })
      }
      else 
      {
      return $http.get("http://goco.herokuapp.com/concerts/search.json?music_style="+music_style+"&location="+concert_location).then(function(response) {
      shows = response.data;
      return shows;
      })
      } 
     },
    get: function(showId) {
        return $http.get("http://goco.herokuapp.com/concerts/"+ showId +".json").then(function(response) {
        show = response.data;
        return show;
          })
     },       
    
    connexion: function(user_name,password) {
    return $http.get("http://goco.herokuapp.com/users/search.json?user_name="+user_name+"&password="+password).then(function(response) {
    user = response.data;
    return user;
    })
     },

    book: function(showId,user_id, nb_people) {
      console.log(showId);
      console.log(user_id);
      console.log(nb_people);
      var total_price = 1;
      var concert_id=1;
      return $http.post("http://goco.herokuapp.com/concerts/" + showId + "/reservation",{"reservation": {"user_id": user_id,"concert_id": concert_id, "nb_people": nb_people,"total_price": total_price}}).then(function(response){
        booking = response.data;
        return booking;
      });
        },
                  /* 
Il faut retravailler la fonction book qui va devenir une fonction like
en paramètre : user_id concert_id et like : On/Off
        */ 
    listing: function(user_id) {

      return $http.get("http://goco.herokuapp.com/concerts/search.json?user_id="+user_id).then(function(response) {
      list = response.data;
      return list;
          })
     },

  
   };
})


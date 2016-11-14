angular.module('starter.services', [])

.factory('Shows', function($http, $stateParams) {


  return {

 /* fonction qui renvoie tous les shows */
    all: function() {
        return $http.get("http://goco.herokuapp.com/concerts.json").then(function(response) {
        shows = response.data;
        return shows;
        })
        },

 /* fonction qui permet de faire une recherche par localisation et / ou style de musique */
    search: function(concert_location, music_style) {
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

  /* fonction qui permet d'aller chercher le details des shows sur lesquels on clique */
    get: function(showId) {
        return $http.get("http://goco.herokuapp.com/concerts/"+ showId +".json").then(function(response) {
        show = response.data;
        return show;
        })
        }, 

   /* fonction qui permet d'aller chercher les informations de l'utilisateur quand il se connecte */ 
    connexion: function(user_name,password) {
        return $http.get("http://goco.herokuapp.com/users/search.json?user_name="+user_name+"&password="+password).then(function(response) {
        user = response.data;
        return user;
        })
        },

  /* fonction qui permet de liker une page */ 
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
  /* fonction qui permet de faire apparaitre la liste des likes de l'utilisateur */      
    listing: function(user_id) {
        return $http.get("http://goco.herokuapp.com/concerts/search.json?user_id="+user_id).then(function(response) {
        list = response.data;
        return list;
        })
        },
  /* fonction qui permet d'aller chercher la ville en fonction de la latitute et la longitude */ 
    geoloc: function(latitude,longitude) {
        return $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true").then(function(response) {
        position = response.data;
        return position;
        })
        },
  
   };
})


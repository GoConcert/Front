angular.module('starter.controllers', [])
.controller('RechercheCtrl', function($scope, $stateParams,$ionicModal,$state, Shows){
  $scope.localisationpardefaut="";
  $scope.musicstylepardefaut="";
  $scope.testprofiletoshow=localStorage.getItem('profileto');
  if ($scope.testprofiletoshow==null|| $scope.testprofiletoshow=='0')
  {
  $scope.localisationpardefaut="Paris";
  $scope.musicstylepardefaut="Tous";
  }
  else
  {
  $scope.user = JSON.parse(localStorage.getItem('userprof'));
  $scope.localisationpardefaut=$scope.user.location;
  $scope.musicstylepardefaut=$scope.user.pref[0].name;
  }
  $ionicModal.fromTemplateUrl('templates/modal-find.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
  $scope.modal = modal;
  });
  $scope.openModal = function(concert_location, music_style) {
    $scope.shows = [];
    $scope.concert_location=concert_location;
    $scope.music_style=music_style;
    Shows.search(concert_location, music_style).then(function(apiShows) {
    $scope.shows = apiShows; 
      });
    $scope.modal.show();
  
    };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
    })
.controller('SelectionCtrl', function($scope,Shows,$state,$stateParams,$location,$window) {
var userp = localStorage.getItem('userprof');
if (userp=='undefined')
{
 $scope.profiletoshow='0';  
}
else
{
var userprofile = JSON.parse(userp);
$scope.userprofi = userprofile;
}
if ($scope.userprofi!==null && userp!='undefined')
  {
Shows.listing(userprofile.id).then(function(apiShows) {
$scope.shows = apiShows; 
 });
  $scope.profiletoshow='1';
  }
else
  {
 $scope.profiletoshow='0';  
}
$scope.goNext = function (hash) { 
$location.path(hash);
 };
$scope.testprofiletoshow = localStorage.getItem('profileto');
if ($scope.testprofiletoshow==null|| $scope.testprofiletoshow=='0')
  {
  $scope.profiletoshow='0';
  }
else
  {
  $scope.profiletoshow='1';
  }
 })
.controller('ConnexionCtrl', function($scope,Shows,$state,$stateParams,$window) { 
$scope.testprofiletoshow = localStorage.getItem('profileto');
$scope.testuserprof = localStorage.getItem('userprof');
if ($scope.testprofiletoshow==null|| $scope.testprofiletoshow=='0'||$scope.testprofiletoshow=='undefined')
  {
  localStorage.setItem('profileto',0);
  $scope.profiletoshow='0';
  }
else
  {
  $scope.profiletoshow='1';
  $scope.user = JSON.parse(localStorage.getItem('userprof'));
  }
$scope.connexion = function(username, passwd) {

    $scope.user_name=username;
    $scope.password =passwd;
    Shows.connexion($scope.user_name, $scope.password).then(function(apiUsers) {
    $scope.user = apiUsers;
    localStorage.setItem('userprof',JSON.stringify($scope.user));
        if ($scope.user_name=="" || typeof $scope.user_name=='undefined')
         { 
         alert("Login vide");
         localStorage.setItem('profileto',0);
         $scope.profiletoshow = localStorage.getItem('profileto');
         }
       else if ($scope.password=="" || typeof $scope.password=='undefined')
         { 
         alert("Mot de passe vide");
         localStorage.setItem('profileto',0);
         $scope.profiletoshow = localStorage.getItem('profileto');
         }
      else if ($scope.user.id==undefined)
       { 
         alert("Login ou Mot de passe incorrect");
         localStorage.setItem('profileto',0);
         $scope.profiletoshow = localStorage.getItem('profileto');
         }
         else
        {    
        localStorage.setItem('profileto',1);
        $scope.profiletoshow = localStorage.getItem('profileto');
   }
   $window.location.reload();
    });
  }

$scope.deconnexion = function() {
      localStorage.setItem('profileto',0);
      localStorage.removeItem('userprof');
      $scope.profiletoshow=0;
$window.location.reload();
    }
  })       
.controller('ShowsCtrl', function($scope, Shows,$state,$stateParams) {
    Shows.all().then(function(apiShows) {
    $scope.shows = apiShows; 
      });
    })  
.controller('ShowDetailCtrl', function($scope, $stateParams, $ionicModal, Shows) {
  Shows.get($stateParams.showId).then(function(apiShows) {
   $scope.show = apiShows; 
      });
  $ionicModal.fromTemplateUrl('templates/modal-book.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});
$scope.openModal = function() {
    $scope.modal.show();
  };
$scope.closeModal = function() {
    $scope.modal.hide();
  };
$scope.profiletoshow = 0;
$scope.profiletoshow = localStorage.getItem('profileto');
$scope.book = function() {
  $scope.nb_people=1;
  $scope.user = JSON.parse(localStorage.getItem('userprof'));
    return Shows.book($stateParams.showId,$scope.user.id, $scope.nb_people)
    .then(function(booking) {
      console.log("Booking", booking);
      $scope.closeModal();
    })
  };
})
.controller('MapCtrl', function($scope, $ionicLoading, $state, Shows) {
  $scope.shows = [];
  Shows.all().then(function(apiShows) {
    $scope.shows = apiShows;
    $scope.addMarkers();
  });

  $scope.initializeMap = function() {
    console.log("here");
    var myLatlng = new google.maps.LatLng(48.8500, 2.35);
    console.log(myLatlng);

    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    console.log("google", google);

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map
        });
    $scope.lat=pos.coords.latitude;
    $scope.long=pos.coords.longitude;
    console.log($scope.lat);
    Shows.geoloc($scope.lat,$scope.long).then(function(apiLoc){
     $scope.locali=apiLoc;
     $scope.ville=$scope.locali.results[0].address_components[2].long_name;
     console.log($scope.ville);
      }) 
    });
    $scope.map = map;
    $scope.addMarkers();
  }

  $scope.addMarkers = function() {
    if($scope.shows.length == 0) return;
    $scope.shows.forEach(function(show) {
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(show.lat, show.lng),
          map: $scope.map,
          label: show.name
      });
      google.maps.event.addListener(marker, 'click', function(){
        $state.go('tab.show-detail', {showId: show.id});
      });
    });
  }

  ionic.Platform.ready($scope.initializeMap);
  });



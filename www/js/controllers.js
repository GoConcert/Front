angular.module('starter.controllers', [])

.controller('RechercheCtrl', function($scope, $stateParams,$ionicModal,$state, Shows,$ionicLoading,$window){
 /* Mise en place des critères de recherche par défaut */
  $scope.localisationpardefaut="";
  $scope.musicstylepardefaut="";
  $scope.testprofiletoshow=localStorage.getItem('profileto');
    if ($scope.testprofiletoshow==null|| $scope.testprofiletoshow=='0')
      { 
      $scope.localisationpardefaut=localStorage.getItem('geolocalisation');
      localStorage.removeItem('geolocalisation');
      $scope.musicstylepardefaut="Tous";
      }
    else
      {
      $scope.user = JSON.parse(localStorage.getItem('userprof'));
      $scope.localisationpardefaut=$scope.user.location;
      $scope.musicstylepardefaut=$scope.user.pref[0].name;
      }
/* Appel du modal par le bouton de recherche */
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
  
/* Mise en place de la fonction de geolocalisation */
  $scope.activegeoloc = function(togglegeoloc){
    if (togglegeoloc===true)
      {  
      $scope.activegeolo ="1";
      }
    else
      {
      $scope.activegeolo="0";  
      }
    
    if ($scope.activegeolo=="1")
      {      
      $scope.initializeMap = function() {
        
        var myLatlng = new google.maps.LatLng(48.8500, 2.35);

        var mapOptions = {
          center: myLatlng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map
          });
          $scope.lat=pos.coords.latitude;
          $scope.long=pos.coords.longitude;
          Shows.geoloc($scope.lat,$scope.long).then(function(apiLoc){
          $scope.locali=apiLoc;
          $scope.ville=$scope.locali.results[0].address_components[2].long_name;
          console.log($scope.ville);
          localStorage.setItem('geolocalisation',$scope.ville);
          $window.location.reload();
          }) 
        });
        $scope.map = map;

      }
      ionic.Platform.ready($scope.initializeMap);
      $scope.activegeolo="0";
      }
    else
      {
      }

  }

})

.controller('SelectionCtrl', function($scope,Shows,$state,$stateParams,$location,$window) {
/* On test si l'utilisateur est connecté, si oui on affiche ces likes, si non on affiche le bouton de connexion  */
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
/* On test si l'utilisateur s'est déjà connecté une fois, si oui on affiche ses informations, si non on affiche le formulaire de connexion  */
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
  /* definition de la fonction connexion avec alertes selon les données saisies et le retour de l'api  */
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
  /* definition de la fonction deconnexion avec clean du localStorageUser  */
  $scope.deconnexion = function() {
    localStorage.setItem('profileto',0);
    localStorage.removeItem('userprof');
    $scope.profiletoshow=0;
    $window.location.reload();
  }

})   

.controller('ShowsCtrl', function($scope, Shows,$state,$stateParams) {
  /* on va chercher tous les concerts de la BDD  */
    Shows.all().then(function(apiShows) {
    $scope.shows = apiShows; 
    });

}) 

.controller('ShowDetailCtrl', function($scope, $stateParams, $ionicModal, Shows) {
  /* on va chercher tous le détails des concerts selectionnés  */
  Shows.get($stateParams.showId).then(function(apiShows) {
    $scope.show = apiShows; 
  });
  $scope.profiletoshow = 0;
  $scope.profiletoshow = localStorage.getItem('profileto');
  /* on définit la fonction like */
  $scope.book = function() {
    $scope.nb_people=1;
    $scope.user = JSON.parse(localStorage.getItem('userprof'));
    return Shows.book($stateParams.showId,$scope.user.id, $scope.nb_people)
    .then(function(booking) {
      console.log(booking);
      $scope.closeModal();
    })
  };

})




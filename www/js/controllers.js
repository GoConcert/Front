angular.module('starter.controllers', [])
.controller('RechercheCtrl', function($scope, $stateParams,$ionicModal,$state, Shows){
  $ionicModal.fromTemplateUrl('templates/modal-find.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
  $scope.modal = modal;
  });
  $scope.openModal = function(concert_location, pref1) {
    $scope.shows = [];
    $scope.concert_location = "";
    concert_location=concert_location;
    $scope.music_style = "";
    music_style=pref1;
    Shows.search(concert_location, music_style).then(function(apiShows) {
    $scope.shows = apiShows; 
      });
    $scope.modal.show();
  
    };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
    })
.controller('SelectionCtrl', function($scope) {})
.controller('ConnexionCtrl', function($scope,Shows,$state,$stateParams) { 
$scope.connexion = function(user_name, password) {
    $scope.user_name = [];
    $scope.password = [];
    user_name=user_name;
    password = password;
    Shows.connexion(user_name, password).then(function(apiShows) {
    $scope.users = apiShows;
    $scope.profiletoshow=1; 
      });
    }
$scope.deconnexion = function() {
  $scope.profiletoshow=0;
    }
        })
.controller('ShowsCtrl', function($scope, Shows,$state,$stateParams) {
  $scope.shows = [];
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
$scope.book = function(user_name, nb_people) {
    return Shows.book($stateParams.showId, user_name, nb_people)
    .then(function(booking) {
      console.log("Booking", booking);
      alert("Votre réservation a bien été prise en compte avec le numéro " + booking.id);
      $scope.closeModal();
    })
  };

});



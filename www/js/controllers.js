angular.module('starter.controllers', [])
.controller('RechercheCtrl', function($scope, $stateParams,$ionicModal,$state, Shows){
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
.controller('SelectionCtrl', function($scope,Shows,$state,$stateParams) {
var userp = localStorage.getItem('userprof');
var userprofile = JSON.parse(userp);
$scope.userprofi = userprofile;
Shows.listing(userprofile.id).then(function(apiShows) {
$scope.shows = apiShows; 
 });
})
.controller('ConnexionCtrl', function($scope,Shows,$state,$stateParams) { 
$scope.testprofiletoshow = localStorage.getItem('profileto');
if ($scope.testprofiletoshow==null|| $scope.testprofiletoshow=='0')
  {
  $scope.profiletoshow='0';
  }
else
  {
  $scope.profiletoshow='1';
  $scope.user = localStorage.getItem('userprof');
  alert($scope.user);
  }
$scope.connexion = function(user_name, password) {
    $scope.user_name=user_name;
    $scope.password =password;
    Shows.connexion(user_name, password).then(function(apiUsers) {
    $scope.user = apiUsers;
    localStorage.setItem('userprof',JSON.stringify(user));
      if (typeof user.id==='undefined')
       { 
        alert(JSON.stringify(user));
         localStorage.setItem('profileto',0);
         $scope.profiletoshow = localStorage.getItem('profileto');
         }
         else
{ 
        localStorage.setItem('profileto',1);
        $scope.profiletoshow = localStorage.getItem('profileto');
   }
      });
    }
$scope.deconnexion = function() {
      localStorage.setItem('profileto',0);
      $scope.profiletoshow=0;
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
$scope.book = function(user_name, nb_people) {
    return Shows.book($stateParams.showId, user_name, nb_people)
    .then(function(booking) {
      console.log("Booking", booking);
      alert("Votre réservation a bien été prise en compte avec le numéro " + booking.id);
      $scope.closeModal();
    })
  };

});



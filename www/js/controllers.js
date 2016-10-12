angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ShowsCtrl', function($scope, Shows) {
  $scope.shows = [];
  Shows.all().then(function(apiShows) {
  $scope.shows = apiShows;	
});
})
.controller('ShowDetailCtrl', function($scope, $stateParams,$ionicModal, Shows) {
  $scope.show = Shows.get($stateParams.showId);
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
  }
});



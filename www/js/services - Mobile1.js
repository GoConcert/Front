angular.module('starter.services', [])

.factory('Shows', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var shows = [
  {
    id: 1,
    title: 'Mon premier show',
    location: 'Paris',
    description: 'Cool, amateur',
    capacity: '10',
    price: '10',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Salle_Pleyel_5.jpg/220px-Salle_Pleyel_5.jpg',
    date: '2016-10-30',
    style_id: 'Classique'
  }, {
    id: 2,
    title: 'Sebastien Tellier',
    location: 'Lyon',
    description: 'Intense',
    capacity: '15',
    price: '50',
    image: "http://www.gqmagazine.fr/uploads/images/201421/cc/l_aventura_de_s__bastien_tellier_7651.jpeg",
    date: '2016-10-19',
    style_id: 'Electro'
  }, {
 id: 3,
    title: 'JazzyBazz',
    location: 'Paris',
    description: 'Ghetto',
    capacity: '50',
    price: '30',
    image: "http://www.sortirenprovence.com/wp-content/uploads/2016/03/jazzy-bazz-465x620.jpg",
    date: '2016-11-01',
    style_id: 'Rap'
  }];

  return {
    all: function() {
      return shows;
    },
    get: function(showId) {
      for (var i = 0; i < shows.length; i++) {
        if (shows[i].id === parseInt(showId)) {
          return shows[i];
        }
      }
      return null;
    }
  };
});

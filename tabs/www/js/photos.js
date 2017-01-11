angular
  .module('photos_controller', ['ngResource'])
  .controller('PhotosCtrl', function($scope, $resource) {
    var photos = $resource('https://jsonplaceholder.typicode.com/photos')
    $scope.photos = photos.query()
  })

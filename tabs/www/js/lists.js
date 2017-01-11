angular
  .module('lists_controller', ['ngResource'])
  .controller('ListsCtrl', function($scope, $resource, $http) {

    var Person = $resource('http://jsonplaceholder.typicode.com/users/:id',{id:'@id'})
    $scope.people = Person.get({'id':1});
    console.log($scope.people);
    // $scope.person = Person.get({personId : 1});
    // $scope.person = Person.get();

    //
    // $http
    //   .get('http://jsonplaceholder.typicode.com/users/')
    //   .then(function successCallback(response) {
    //     $scope.people = response.data
    //   }, function errorCallback(response) {
    //     console.log(response);
    //   })

  })

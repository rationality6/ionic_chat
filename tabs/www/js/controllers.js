var name = ""

angular
  .module('starter.controllers', [])

  .controller('Login', function($scope, $window, $http) {

    $scope.sizeHold = function() {
      var screenWidthSize = $window.innerWidth
      var margin = 20
      var width = screenWidthSize - margin
      return "http://placehold.it/" + width + "x170"
    }

    $scope.nickName = ''

    $scope.login = function(){
      name = this.nickName
    }

  })

  .controller('ChatsCtrl', function($scope, $http) {

    $scope.chats = [{
      name:'a',
      body:'b'
    }];

    var callSample = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/call'
      }).then(function successCallback(response) {
        console.log(response.data);
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    var pushApi = function(nickName, chatText) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/chats',
        data: {
          "name": nickName,
          "body": chatText
        }
      }).then(function successCallback(response) {
        console.log('pushApi works');
        callApi()
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    var callApi = function() {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/chats'
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.chats = response.data
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    // 리소스를 사용해서 3줄로 줄이기

    $scope.call = function() {
      pushApi(name,this.chatText)
    }

    // $scope.chats = Chats.all();

    // $scope.remove = function(chat) {
    //   Chats.remove(chat);
    // };

  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });

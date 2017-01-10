var name = ""
var picture = ""

angular
  .module('starter.controllers', [])
  .controller('Login', function($scope, $window, $http, $cordovaCamera, Foobar) {
    $scope.takePicture = function() {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        picture = $scope.imgURI
      }, function(err) {
        console.log('Got an error.' + err);
      });

    }

    $scope.sizeHold = function() {
      var screenWidthSize = $window.innerWidth
      var margin = 20
      var width = screenWidthSize - margin
      return "http://placehold.it/" + width + "x170"
    }

    $scope.login = function() {
      name = this.nickName
    }

  })

  .controller('ChatsCtrl', function($scope, $http) {

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
        url: 'http://192.168.0.10:3000/api/chats',
        data: {
          "name": nickName,
          "body": chatText,
          "picture": picture
        }
      }).then(function successCallback(response) {
        console.log('pushApi works');
        pullApi()
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    var pullApi = function() {
      $http({
        method: 'GET',
        url: 'http://192.168.0.10:3000/api/chats'
      }).then(function successCallback(response) {
        console.log(response.data);
        $scope.chats = response.data
        $scope.$broadcast('scroll.refreshComplete');
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    // 리소스를 사용해서 3줄로 줄이기

    $scope.call = function() {
      pushApi(name, this.chatText)
    }

    $scope.refresh = function() {
      pullApi()
    }

    $scope.doRefresh = function() {
      pullApi()
    }

    Foobar.call()

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

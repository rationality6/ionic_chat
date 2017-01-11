angular
  .module('starter.services', ['ngResource'])
  .factory('Chats', function($resource) {
    return {
      call: function() {
        console.log('Chats function works');
      }
    }
  })

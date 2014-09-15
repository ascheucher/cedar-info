'use strict';

angular.module('cedarInfoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log(JSON.stringify(awesomeThings));
    });

  });

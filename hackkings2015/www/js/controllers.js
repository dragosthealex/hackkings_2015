angular.module('starter.controllers', [])

.controller("AppCtrl", function($scope) {

})

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.centerOnMe();
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    $scope.myPos = null;

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);

      $scope.myPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      var myPos = $scope.myPos;

      $scope.map.setCenter(myPos);

      // Create my position marker
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: myPos,
        title: "ME",
        animation: google.maps.Animation.DROP
      });

      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

})

.controller("AuthCtrl", function($scope, $cordovaOauth){
  $scope.googleLogin = function() {
        $cordovaOauth.google("821913821738-5aj6fb1kfkl2qajbe4vcggfmnod1b50f.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }
});

var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/home", {
      templateUrl : "views/formsearch.html"
  })
    .when("/clicksearch/:name", {
        templateUrl : "views/search-result.html",
        controller: "SearchCtrl"
    })
    .otherwise({
      redirectTo: "/home"
  });
}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('SearchCtrl', function($scope, $http, $routeParams)
{
  var ten = $routeParams.name;
  $http({
    method : "GET",
      url : "http://localhost:8080/searchByContain/" + ten
  })
  .then(function mySuccess(response) {
    $scope.books = response.data;
    if($scope.books==""){
     alert("Không Có Kết Quả Với Từ Khóa \""+ ten + "\"");
    }
  }, function myError(response) {
    $scope.books = response.statusText;
  });
});


var myApp = angular.module("myApp", ["ngRoute", 'ngCookies']);

myApp.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "views/formsearch.html"
    })
    .when("/clicksearch/:name", {
      templateUrl: "views/search-result.html",
      controller: "SearchCtrl"
    })
    .when("/clickdetail/:id", {
      templateUrl: "views/book-detail.html",
      controller: "DetailCtrl"
    })
    .otherwise({
      redirectTo: "/home"
    });
}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('SearchCtrl', function ($scope, $http, $routeParams) {

  document.getElementById("header").style.display = "true";
  document.getElementById("footer").style.display = "true";

  var ten = $routeParams.name;
  $http({
    method: "GET",
    url: "http://localhost:8080/searchByContain/" + ten
  })
    .then(function mySuccess(response) {
      $scope.books = response.data;
      if ($scope.books == "") {
        alert("Không Có Kết Quả Với Từ Khóa \"" + ten + "\"");
      }
    }, function myError(response) {
      $scope.books = response.statusText;
    });

  $scope.detail = function (book) {
    var id = book.id_ISBN;
    $http({
      method: "GET",
      url: "http://localhost:8080/bookByISBN/" + id
      
    })
      .then(function mySuccess(response) {
        $scope.details = response.data;
      }, function myError(response) {
        $scope.details = response.statusText;
      });
  }
});

myApp.controller('DetailCtrl', function ($scope, $http, $routeParams) {


  var id = $routeParams.id;
  $http({
    method: "GET",
    url: "http://localhost:8080/bookTitleDetail/" + id
  })
    .then(function mySuccess(response) {
      $scope.bookdetails= response.data;
    }, function myError(response) {
      $scope.bookdetails = response.statusText;
    });

    $scope.detail = function (book) {
      document.getElementById("accordion").style.display = "block";
      var id = book.id_ISBN;
      $http({
        method: "GET",
        url: "http://localhost:8080/bookByISBN/" + id
      })
        .then(function mySuccess(response) {
          $scope.details = response.data;
        }, function myError(response) {
          $scope.details = response.statusText;
        });
      }
});

/////////////////////////////////////////////////////////////

myApp.controller('myCtrlLogin', function ($scope, $http, $cookies) {

  $http({
      method: "GET",
      url: "http://localhost:8080/reader"
  }).then(function mySuccess(response) {
      $scope.readers = response.data;
      var stat = "false";

      $scope.login = function () {
          for (var i = 0; i < $scope.readers.length; i++) {
              if ($scope.readers[i].username_DG == $scope.username &&
                  $scope.readers[i].password_DG == $scope.password) {
                  $cookies.putObject("reader", $scope.readers[i]);
                  $scope.reader = $cookies.getObject("reader");
                  window.location.href = "#!/home";
                  stat = "true";
              }
              if (stat == "false") {
                  document.getElementById('btnInvalid').innerHTML = 'Invalid username or password!';
              }
          }
      }

      $scope.logout = function () {
        $cookies.remove("reader");
        window.location.href = "#!/login";
      }
  });
})

// myApp.controller('myCtrlIndex', function ($scope, $cookies) {
//   $scope.reader = $cookies.getObject("reader");
//   if ($scope.reader == null) {
//       alert("Please login!");
//       window.location.href = "log-in.html";
//   }
//   $scope.logout = function () {
//       $cookies.remove("reader");
//       window.location.href = "log-in.html";
//   }
// })
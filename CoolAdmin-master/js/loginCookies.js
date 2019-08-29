var app = angular.module('myLogin', ['ngCookies']);

app.controller('myCtrlLogin', function ($scope, $http, $cookies) {
    $http({
        method: "GET",
        url: "http://localhost:8080/librarians"
    }).then(function mySuccess(response) {
        $scope.librarians = response.data;
        var stat = "false";
        $scope.login = function () {
            for (var i = 0; i < $scope.librarians.length; i++) {
                if ($scope.librarians[i].username_TT == $scope.username &&
                    $scope.librarians[i].password_TT == $scope.password) {
                    $cookies.putObject("librarian", $scope.librarians[i]);
                    window.location.href = "index.html";
                    stat = "true";
                }
                if (stat == "false") {
                    document.getElementById('btnInvalid').innerHTML = 'Invalid username or password!';
                }
            }
        }
    });
})

app.controller('myCtrlIndex', function ($scope, $cookies) {
    $scope.librarian = $cookies.getObject("librarian");
    if ($scope.librarian == null) {
        alert("Please login!");
        window.location.href = "log-in.html";
    }
    $scope.logout = function () {
        $cookies.remove("librarian");
        window.location.href = "log-in.html";
    }
})

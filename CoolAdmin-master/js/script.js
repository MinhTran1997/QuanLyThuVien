var myApp = angular.module('myApp', []);

myApp.controller('bookCtrl', function($scope, $http) {

  //Lấy dữ liệu từ JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/book"
  }).then(function mySuccess(response) {
    $scope.books = response.data;
  }, function myError(response) {
    $scope.books = response.statusText;
  });

  //Lấy dữ liệu từ JSON ở server bằng phương thức GET
  // $scope.add = function (empNo, empName, position)//Khi bấm vào nút Add
  // {
  //   if(empNo == null || empName == null || position == null)
  //   {
  //     alert("Please enter the information!");
  //     return;
  //   }
  //   else
  //   {
  //     var data =
  //     {
  //       empNo: empNo,
  //       empName: empName,
  //       position: position
  //     };
  //
  //     $http.post('http://localhost:8080/employee', JSON.stringify(data)).then(function(response)
  //     {
  //       if(response.data)
  //         $scope.msg = "Post Data Successfully!";
  //     }, function(response)
  //         {
  //           $scope.msg = "Failed!";
  //         });
  //   }
  // };
  //
  // //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  // $scope.update = function (empNo, empName, position)//Khi bấm vào nút Update
  // {
  //   $scope.hide_msg = false;
  //
  //   if(empName == null || position == null)
  //   {
  //     alert("Please enter the information!");
  //     return;
  //   }
  //   else
  //   {
  //     var data =
  //     {
  //       empNo: empNo,
  //       empName: empName,
  //       position: position
  //     };
  //
  //     $http.put('http://localhost:8080/employee', JSON.stringify(data)).then(function(response)
  //     {
  //       if(response.data)
  //         $scope.msg = "Put Data Successfully!";
  //     }, function(response)
  //         {
  //           $scope.msg = "Failed!";
  //         });
  //   }
  // };
  //
  // //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  // $scope.delete = function(empNo)////Khi bấm vào nút DELETE
  // {
  //   var data =
  //   {
  //     empNo: empNo,
  //   };
  //
  //   $http.delete('http://localhost:8080/employee/' + empNo, JSON.stringify(data)).then(function(response)
  //   {
  //     if(response.data)
  //       $scope.msg = "Delete Data Successfully!";
  //   }, function(response)
  //       {
  //         $scope.msg = "Failed!";
  //       });
  // }
  //
  // /*-------------------------------------------------------*/
  // $scope.edit = function(employees)//Khi bấm vào nút edit
  // {
  //   $scope.submit = false;
  //   $scope.disabled = true;//disable empNo không cho sửa
  //   $scope.empNo = employees.empNo;
  //   $scope.empName = employees.empName;
  //   $scope.position = employees.position;
  // }
  // /*-------------------------------------------------------*/
  //
  // $scope.cancelUpdate = function()//Khi bấm vào nút cancel
  // {
  //   $scope.submit = true;
  //   $scope.disabled = false;//enable empNo lại bình thường
  //   $scope.empNo = "";
  //   $scope.empName = "";
  //   $scope.position = "";
  // }
  // /*-------------------------------------------------------*/

});

myApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);

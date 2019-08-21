var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "views/bookTitle.html",
        controller: "bookTitleCtrl"
    })
    .when("/bookTitle", {
        templateUrl : "views/bookTitle.html",
        controller: "bookTitleCtrl"
    })
    .when("/bookTitleDetail/:id_ISBN", {
        templateUrl : "views/bookTitleDetail.html",
        controller: "bookTitleDetailCtrl"
    })
    .when("/publisher", {
        templateUrl : "views/publisher.html",
        controller: "publisherCtrl"
    })
    .when("/author", {
        templateUrl : "views/author.html",
        controller: "authorCtrl"
    })
    .otherwise({
        redirectTo: "/home"
    });

}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('bookTitleCtrl', function($scope, $http)
{
  function ymd(inputString)//Chuyển định dạng sang năm tháng ngày
  {
    var year = inputString.substring(0, 4);//Lấy năm của đầu sách
    var month = inputString.substring(5, 7);//Lấy tháng của đầu sách
    var day = inputString.substring(8, 10);//Lấy ngày của đầu sách
    var myDate = year + "-" + month + "-" + day;//Định dạng yyyy-MM-dd
    return myDate;
  }

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/bookTitle"
  }).then(function mySuccess(response) {
    $scope.bookTitles = response.data;
  }, function myError(response) {
    $scope.bookTitles = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/publisher"
  }).then(function mySuccess(response) {
    $scope.publishers = response.data;
  }, function myError(response) {
    $scope.publishers = response.statusText;
  });

  $scope.createBookTitle = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM ĐẦU SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_ISBN = "";
    $scope.id_LoaiSach = "";
    $scope.id_NXB = "";
    $scope.tenDS = "";
    $scope.tomLuocNoiDung = "";
    $scope.khoSach = "";
    $scope.soTrang = "";
    $scope.dinhKem = "";
    $scope.viTri = "";
    $scope.ngonNgu = "";
    $scope.phienBan = "";
    $scope.namXuatBan = "";
    document.getElementById("namXuatBan").value = "";
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addBookTitle = function (id_ISBN, id_LoaiSach, id_NXB, tenDS, tomLuocNoiDung, khoSach, soTrang, dinhKem, viTri, ngonNgu, phienBan, namXuatBan)//Lưu lúc thêm
  {

    if(id_ISBN == "" || id_LoaiSach == "" || id_NXB == "" || tenDS == "" || tomLuocNoiDung == "" || khoSach == "" ||
      soTrang == null || viTri == "" || ngonNgu == "" || phienBan == null || namXuatBan == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save1 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save1 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_ISBN: id_ISBN,
        id_LoaiSach: id_LoaiSach,
        id_NXB: id_NXB,
        tenDS: tenDS,
        tomLuocNoiDung: tomLuocNoiDung,
        khoSach: khoSach,
        soTrang: soTrang,
        dinhKem: dinhKem,
        viTri: viTri,
        ngonNgu: ngonNgu,
        phienBan: phienBan,
        namXuatBan: namXuatBan
      };

      $http.post('http://localhost:8080/createBookTitle', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          var soLuong = document.getElementById("soLuong").value;
          alert("Đã thêm mới một đầu sách với " + soLuong + " cuốn sách!");
          $scope.bookTitles.push(
            {
              id_ISBN: data.id_ISBN,
              id_LoaiSach: data.id_LoaiSach,
              id_NXB: data.id_NXB,
              tenDS: data.tenDS,
              tomLuocNoiDung: data.tomLuocNoiDung,
              khoSach: data.khoSach,
              soTrang: data.soTrang,
              dinhKem: data.dinhKem,
              viTri: data.viTri,
              ngonNgu: data.ngonNgu,
              phienBan: data.phienBan,
              namXuatBan: data.namXuatBan
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang

           for (var i = 0; i < soLuong; i++)
           {
             var bookData =
             {
                 bookTitle: {
                   id_ISBN: data.id_ISBN,
                   id_LoaiSach: data.id_LoaiSach,
                   id_NXB: data.id_NXB,
                   tenDS: data.tenDS,
                   tomLuocNoiDung: data.tomLuocNoiDung,
                   khoSach: data.khoSach,
                   soTrang: data.soTrang,
                   dinhKem: data.dinhKem,
                   viTri: data.viTri,
                   ngonNgu: data.ngonNgu,
                   phienBan: data.phienBan,
                   namXuatBan: data.namXuatBan
                 },
                 trangThai: false
             };

             $http.post('http://localhost:8080/createBook', JSON.stringify(bookData)).then(function(response)
             {
               if(response.data)
               {
               }
             }, function(response)
                 {
                   alert("Thêm sách thất bại!!");
                 });
           }
        }
      }, function(response)
          {
            $scope.bookTitles = response.statusText;
          });
    }
  };

  $scope.editBookTitle = function(bookTitle)//Khi bấm vào biểu tượng sửa
  {
    // alert(document.getElementById("id_NXB").value);
    $scope.modalTitle = "CẬP NHẬT ĐẦU SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_ISBN = bookTitle.id_ISBN;
    $scope.id_LoaiSach = bookTitle.id_LoaiSach;
    document.getElementById("id_NXB").value = bookTitle.publisher.id_NXB;
    $scope.tenDS = bookTitle.tenDS;
    $scope.tomLuocNoiDung = bookTitle.tomLuocNoiDung;
    $scope.khoSach = bookTitle.khoSach;
    $scope.soTrang = parseInt(bookTitle.soTrang);
    $scope.dinhKem = bookTitle.dinhKem;
    $scope.viTri = bookTitle.viTri;
    $scope.ngonNgu = bookTitle.ngonNgu;
    $scope.phienBan = bookTitle.phienBan;
    var myDate = ymd(bookTitle.namXuatBan);
    var finalDate = new Date(myDate);
    $scope.namXuatBan = finalDate;
    document.getElementById("namXuatBan").value = ymd(bookTitle.namXuatBan);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateBookTitle = function (id_ISBN, id_LoaiSach, id_NXB, tenDS, tomLuocNoiDung, khoSach, soTrang, dinhKem, viTri, ngonNgu, phienBan, namXuatBan)//Lưu lúc sửa
  {
    if(id_LoaiSach == "" || id_NXB == "" || tenDS == "" || tomLuocNoiDung == "" || khoSach == "" ||
      soTrang == "" || viTri == "" || ngonNgu == "" || phienBan == "" || namXuatBan == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save2 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save2 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_ISBN: id_ISBN,
        id_LoaiSach: id_LoaiSach,
        publisher:{
          id_NXB: id_NXB,
            tenNXB: "",
            diaChiNXB: "",
            sdtNXB: "",
            emailNXB: ""
        },
        tenDS: tenDS,
        tomLuocNoiDung: tomLuocNoiDung,
        khoSach: khoSach,
        soTrang: soTrang,
        dinhKem: dinhKem,
        viTri: viTri,
        ngonNgu: ngonNgu,
        phienBan: phienBan,
        namXuatBan: namXuatBan,
      };

      $http.put('http://localhost:8080/updateBookTitle/' + id_ISBN, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại đầu sách " + id_ISBN + "!");
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteBookTitle = function(bookTitle)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_ISBN: bookTitle.id_ISBN,
    };

    $http.delete('http://localhost:8080/deleteBookTitle/' + bookTitle.id_ISBN, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa đầu sách " + bookTitle.id_ISBN + "!");
        var pos = $scope.bookTitles.indexOf(bookTitle);
        $scope.bookTitles.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xóa thất bại!");
        });
  };

  $scope.chooseImg = function()
  {
    $scope.readyUpload = true;
  }

  $scope.uploadImg = function (bookTitle)
  {
    var url = document.getElementById("imgUpload").value;
    var fileName = url.substring(url.lastIndexOf("\\") + 1);

    var data =
    {
      hinhAnh: fileName
    };

    $http.put('http://localhost:8080/updateImage/' + id_ISBN, JSON.stringify(data)).then(function(response)
    {
      if(response.data)
      {
        alert("Đã cập nhật lại hình ảnh đầu sách " + id_ISBN + "!");
      }
    }, function(response)
        {
          alert("Lỗi cập nhật hình ảnh!");
        });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('bookTitleDetailCtrl', function($scope, $http, $routeParams)
{
  var id_ISBN = $routeParams.id_ISBN;//id_ISBN lấy được trên URL

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/bookByISBN/" + id_ISBN
  }).then(function mySuccess(response) {
    $scope.books = response.data;
  }, function myError(response) {
    $scope.books = response.statusText;
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('publisherCtrl', function($scope, $http)
{
  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/publisher",
  }).then(function mySuccess(response) {
    $scope.publishers = response.data;
  }, function myError(response) {
    $scope.publishers = response.statusText;
  });

  $scope.createPublisher = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM NHÀ XUẤT BẢN";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_NXB = "";
    $scope.tenNXB = "";
    $scope.diaChiNXB = "";
    $scope.sdtNXB = "";
    $scope.emailNXB = "";
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addPublisher = function (id_NXB, tenNXB, diaChiNXB, sdtNXB, emailNXB)//Lưu lúc thêm
  {
    if(id_NXB == "" || tenNXB == "" || diaChiNXB == "" || sdtNXB == "" || emailNXB == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save1 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save1 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_NXB: id_NXB,
        tenNXB: tenNXB,
        diaChiNXB: diaChiNXB,
        sdtNXB: sdtNXB,
        emailNXB: emailNXB
      };

      $http.post('http://localhost:8080/createPublisher', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới một nhà xuất bản!");
          $scope.publishers.push(
            {
              id_NXB: data.id_NXB,
              tenNXB: data.tenNXB,
              diaChiNXB: data.diaChiNXB,
              sdtNXB: data.sdtNXB,
              emailNXB: data.emailNXB
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.publishers = response.statusText;
          });
    }
  };

  $scope.editPublisher = function(publisher)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT NHÀ XUẤT BẢN";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_NXB = publisher.id_NXB;
    $scope.tenNXB = publisher.tenNXB;
    $scope.diaChiNXB = publisher.diaChiNXB;
    $scope.sdtNXB = publisher.sdtNXB;
    $scope.emailNXB = publisher.emailNXB;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updatePublisher = function (id_NXB, tenNXB, diaChiNXB, sdtNXB, emailNXB)//Lưu lúc sửa
  {
    if(id_NXB == "" || tenNXB == "" || diaChiNXB == "" || sdtNXB == "" || emailNXB == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save2 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save2 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_NXB: id_NXB,
        tenNXB: tenNXB,
        diaChiNXB: diaChiNXB,
        sdtNXB: sdtNXB,
        emailNXB: emailNXB,
      };

      $http.put('http://localhost:8080/updatePublisher/' + id_NXB, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại nhà xuất bản " + id_NXB + "!");
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deletePublisher = function(publisher)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_NXB: publisher.id_NXB,
    };

    $http.delete('http://localhost:8080/deletePublisher/' + publisher.id_NXB, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa nhà xuất bản " + publisher.id_NXB + "!");
        var pos = $scope.publishers.indexOf(publisher);
        $scope.publishers.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('authorCtrl', function($scope, $http)
{
  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/author",
  }).then(function mySuccess(response) {
    $scope.authors = response.data;
  }, function myError(response) {
    $scope.authors = response.statusText;
  });

  $scope.createAuthor = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM TÁC GIẢ";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_TacGia = "";
    $scope.hoTenTG = "";
    $scope.sdtTG = "";
    $scope.emailTG = "";
    $scope.trinhDo = "";
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addAuthor = function (id_TacGia, hoTenTG, sdtTG, emailTG, trinhDo)//Lưu lúc thêm
  {
    if(id_TacGia == "" || hoTenTG == "" || sdtTG == "" || emailTG == "" || trinhDo == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save1 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save1 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_TacGia: id_TacGia,
        hoTenTG: hoTenTG,
        sdtTG: sdtTG,
        emailTG: emailTG,
        trinhDo: trinhDo
      };

      $http.post('http://localhost:8080/createAuthor', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới một tác giả!");
          $scope.authors.push(
            {
              id_TacGia: data.id_TacGia,
              hoTenTG: data.hoTenTG,
              sdtTG: data.sdtTG,
              emailTG: data.emailTG,
              trinhDo: data.trinhDo
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!!");
            $scope.authors = response.statusText;
          });
    }
  };

  $scope.editAuthor = function(author)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT TÁC GIẢ";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_TacGia = author.id_TacGia;
    $scope.hoTenTG = author.hoTenTG;
    $scope.sdtTG = author.sdtTG;
    $scope.emailTG = author.emailTG;
    $scope.trinhDo = author.trinhDo;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateAuthor = function (id_TacGia, hoTenTG, sdtTG, emailTG, trinhDo)//Lưu lúc sửa
  {
    if(id_TacGia == "" || hoTenTG == "" || sdtTG == "" || emailTG == "" || trinhDo == "")
    {
      alert("Vui lòng nhập những thông tin cần thiết!");
      $scope.save2 = "";//Nhập thiếu thì form không biến mất
      return;
    }
    else
    {
      $scope.save2 = "modal";//Nhập đủ thì lưu lại và form biến mất

      var data =
      {
        id_TacGia: id_TacGia,
        hoTenTG: hoTenTG,
        sdtTG: sdtTG,
        emailTG: emailTG,
        trinhDo: trinhDo
      };

      $http.put('http://localhost:8080/updateAuthor/' + id_TacGia, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại tác giả " + id_TacGia + "!");
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteAuthor = function(author)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_TacGia: author.id_TacGia,
    };

    $http.delete('http://localhost:8080/deleteAuthor/' + author.id_TacGia, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa tác giả " + author.id_TacGia + "!");
        var pos = $scope.authors.indexOf(author);
        $scope.authors.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tạo ra directive mới để xác nhận khi xóa
myApp.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

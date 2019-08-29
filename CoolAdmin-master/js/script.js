var myApp = angular.module("myApp", ["ngRoute", "ngCookies"]);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "views/login.html",
        controller: "myCtrlLogin"
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
    .when("/reader", {
        templateUrl : "views/reader.html",
        controller: "readerCtrl"
    })
    .when("/subject", {
        templateUrl : "views/subject.html",
        controller: "subjectCtrl"
    })
    .when("/borrowBooks", {
        templateUrl : "views/borrowBooks.html",
        controller: "borrowBooksCtrl"
    })
    .when("/borrowBooksDetail/:id_PhieuMuon", {
        templateUrl : "views/borrowBooksDetail.html",
        controller: "borrowBooksDetailCtrl"
    })
    .when("/returnBooks", {
        templateUrl : "views/returnBooks.html",
        controller: "returnBooksCtrl"
    })
    .when("/returnBooksDetail/:id_PhieuTra", {
        templateUrl : "views/returnBooksDetail.html",
        controller: "returnBooksDetailCtrl"
    })
    .otherwise({
        redirectTo: "/home"
    });

}]);

function ymd(inputString)//Chuyển định dạng sang năm tháng ngày
{
  var year = inputString.substring(0, 4);//Lấy năm của đầu sách
  var month = inputString.substring(5, 7);//Lấy tháng của đầu sách
  var day = inputString.substring(8, 10);//Lấy ngày của đầu sách
  var myDate = year + "-" + month + "-" + day;//Định dạng yyyy-MM-dd
  return myDate;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('bookTitleCtrl', function($scope, $http)
{
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
      url : "http://localhost:8080/subject"
  }).then(function mySuccess(response) {
    $scope.subjects = response.data;
  }, function myError(response) {
    $scope.subjects = response.statusText;
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
      //Lấy tên hình-
      var url = document.getElementById("imgUpdate").value;
      var fileName = url.substring(url.lastIndexOf("\\") + 1);

      var data =
      {
        id_ISBN: id_ISBN,
        subject: {
          id_LoaiSach: id_LoaiSach,
          tenLoaiSach: ""
        },
        publisher: {
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
        hinhAnh: fileName
      };

      $http.post('http://localhost:8080/createBookTitle', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới đầu sách " + id_ISBN + "!");
          $scope.bookTitles.push(
            {
              id_ISBN: data.id_ISBN,
              subject: {
                id_LoaiSach: "",
                tenLoaiSach: data.subject.tenLoaiSach
              },
              publisher: {
                  id_NXB: "",
                  tenNXB: data.publisher.tenNXB,
                  diaChiNXB: "",
                  sdtNXB: "",
                  emailNXB: ""
              },
              tenDS: data.tenDS,
              tomLuocNoiDung: data.tomLuocNoiDung,
              khoSach: data.khoSach,
              soTrang: data.soTrang,
              dinhKem: data.dinhKem,
              viTri: data.viTri,
              ngonNgu: data.ngonNgu,
              phienBan: data.phienBan,
              namXuatBan: data.namXuatBan,
              hinhAnh: fileName
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            $scope.bookTitles = response.statusText;
          });
    }
  };

  $scope.editBookTitle = function(bookTitle)//Khi bấm vào biểu tượng sửa
  {

    $scope.modalTitle = "CẬP NHẬT ĐẦU SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_ISBN = bookTitle.id_ISBN;
    // $scope.id_LoaiSach = bookTitle.subject.id_LoaiSach;
    document.getElementById("id_LoaiSach").value = bookTitle.subject.id_LoaiSach;
    //$scope.id_NXB = bookTitle.publisher.id_NXB;
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
    document.getElementById("namXuatBan").value = ymd(myDate);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
    var finalDate = new Date(myDate);
    $scope.namXuatBan = finalDate;

    // var url = document.getElementById("imgUpdate").value;
    // var fileName = url.substring(url.lastIndexOf("\\") + 1);
    // $scope.hinhAnh = fileName;
    $scope.hinhAnh = bookTitle.hinhAnh;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateBookTitle = function (id_ISBN, id_LoaiSach, tenDS, tomLuocNoiDung, khoSach, soTrang, dinhKem, viTri, ngonNgu, phienBan, namXuatBan)//Lưu lúc sửa
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

      var url = document.getElementById("imgUpdate").value;
      var fileName = url.substring(url.lastIndexOf("\\") + 1);
      if(fileName == "") fileName = $scope.hinhAnh;

      var data =
      {
        id_ISBN: id_ISBN,
        subject: {
            id_LoaiSach: id_LoaiSach,
            tenLoaiSach: ""
        },
        publisher: {
            id_NXB: document.getElementById("id_NXB").value,
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
        hinhAnh: fileName
      };

      $http.put('http://localhost:8080/updateBookTitle/' + id_ISBN, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          // var pos = $scope.bookTitles.indexOf(id_ISBN);
          // $scope.bookTitles.splice(pos, 1);//Xóa liền mà không cần load lại trang
          alert("Đã cập nhật lại đầu sách " + id_ISBN + "!");
          location.reload();
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

  $scope.updateImg = function(bookTitle)
  {
    var url = document.getElementById("imgUpdate").value;
    var fileName = url.substring(url.lastIndexOf("\\") + 1);

    var data =
    {
       id_ISBN: bookTitle.id_ISBN,
       id_LoaiSach: bookTitle.id_LoaiSach,
       publisher: {
           id_NXB: bookTitle.publisher.id_NXB,
           tenNXB: "",
           diaChiNXB: "",
           sdtNXB: "",
           emailNXB: ""
       },
       tenDS: bookTitle.tenDS,
       tomLuocNoiDung: bookTitle.tomLuocNoiDung,
       khoSach: bookTitle.khoSach,
       soTrang: bookTitle.soTrang,
       dinhKem: bookTitle.dinhKem,
       viTri: bookTitle.viTri,
       ngonNgu: bookTitle.ngonNgu,
       phienBan: bookTitle.phienBan,
       namXuatBan: bookTitle.namXuatBan,
       hinhAnh: fileName
    };

    $http.put('http://localhost:8080/updateBookTitle/' + bookTitle.id_ISBN, JSON.stringify(data)).then(function(response)
    {
      if(response.data)
      {
        alert("Đã cập nhật lại hình ảnh đầu sách " + bookTitle.id_ISBN + "!");
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

  $scope.createBook = function()
  {
    $scope.modalTitle = "THÊM SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN
  }

  $scope.addBook = function()
  {
    var id_ISBN = $routeParams.id_ISBN;
    var soLuong = document.getElementById("soLuong").value;
    var message = false;

    if(soLuong > 10)
    {
      alert("Số lượng không được lớn hơn 10!");
      return;
      $scope.save1 = "";
    }
    else $scope.save1 = "modal";

    for (var i = 0; i < soLuong; i++)
    {
      var bookData =
      {
          bookTitle: {
            id_ISBN: id_ISBN,
            id_LoaiSach: "",
            id_NXB: "",
            tenDS: "",
            tomLuocNoiDung: "",
            khoSach: "",
            soTrang: "",
            dinhKem: "",
            viTri: "",
            ngonNgu: "",
            phienBan: "",
            namXuatBan: ""
          },
          trangThai: "In Stock"
      };

      $http.post('http://localhost:8080/createBook', JSON.stringify(bookData)).then(function(response)
      {
        if(response.data && !message)
        {
          alert("Đã thêm " + soLuong + " sách!");
          location.reload();
          message = true;
        }
      }, function(response)
          {
            if(!message) alert("Thêm sách thất bại!!");
            message = true;
          });
    }
  }

  $scope.deleteBook = function(book)
  {
    var data =
    {
      barcode: book.barcode,
    };

    $http.delete('http://localhost:8080/deleteBook/' + book.barcode, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa sách " + book.barcode + "!");
        var pos = $scope.books.indexOf(book);
        $scope.books.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xóa thất bại!");
        });
  }
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
    if(tenNXB == "" || diaChiNXB == "" || sdtNXB == "" || emailNXB == "")
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
          location.reload();
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
    if(hoTenTG == "" || sdtTG == "" || emailTG == "" || trinhDo == "")
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
    if(hoTenTG == "" || sdtTG == "" || emailTG == "" || trinhDo == "")
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
          location.reload();
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
myApp.controller('readerCtrl', function($scope, $http)
{
  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/reader",
  }).then(function mySuccess(response) {
    $scope.reader = response.data;
  }, function myError(response) {
    $scope.reader = response.statusText;
  });

  $scope.createReader = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM ĐỘC GIẢ";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_TheDG = "";
    $scope.hotenDG = "";
    $scope.sdt = "";
    $scope.emailDG = "";
    $scope.diaChi = "";
    $scope.ngaysinhDG = "";
    $scope.gioiTinhDG = "";
    $scope.hsdThe = "";
    $scope.username_DG = "";
    $scope.password_DG = "";
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addReader = function (id_TheDG, hotenDG, sdt, emailDG, diaChi, ngaysinhDG, gioiTinhDG, hsdThe, username_DG, password_DG)//Lưu lúc thêm
  {

    if(id_TheDG == null || hotenDG == "" || sdt == "" || emailDG == "" || diaChi == "" || ngaysinhDG == null || gioiTinhDG == "" || hsdThe == null || username_DG == "" || password_DG == "")
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
        id_TheDG: id_TheDG,
        hotenDG: hotenDG,
        sdt: sdt,
        emailDG: emailDG,
        diaChi: diaChi,
        ngaysinhDG: ngaysinhDG,
        gioiTinhDG: gioiTinhDG,
        hsdThe: hsdThe,
        username_DG: username_DG,
        password_DG: password_DG,
      };

      $http.post('http://localhost:8080/createReader', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới một độc giả!");
          $scope.reader.push(
            {
              id_TheDG: data.id_TheDG,
              hotenDG: data.hotenDG,
              sdt: data.sdt,
              emailDG: data.emailDG,
              diaChi: data.diaChi,
              ngaysinhDG: data.ngaysinhDG,
              gioiTinhDG: data.gioiTinhDG,
              hsdThe: data.hsdThe,
              username_DG: data.username_DG,
              password_DG: data.password_DG
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!!");
            $scope.reader = response.statusText;
          });
    }
  };

  $scope.editReader = function(reader)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT ĐỘC GIẢ";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id không cho sửa

    $scope.id_TheDG = reader.id_TheDG;
    $scope.hotenDG = reader.hotenDG;
    $scope.sdt = reader.sdt;
    $scope.emailDG = reader.emailDG;
    $scope.diaChi = reader.diaChi;

    var ngaySinh = ymd(reader.ngaysinhDG);
    document.getElementById("ngaysinhDG").value = ngaySinh;
    var finalNgaySinh = new Date(ngaySinh);
    $scope.ngaysinhDG = finalNgaySinh;

    $scope.gioiTinhDG = reader.gioiTinhDG;

    var hsdThe = ymd(reader.hsdThe);
    document.getElementById("hsdThe").value = hsdThe;
    var finalHSD = new Date(hsdThe);
    $scope.hsdThe = finalHSD;

    $scope.username_DG = reader.username_DG;
    $scope.password_DG = reader.password_DG;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateReader = function (id_TheDG, hotenDG, sdt, emailDG, diaChi, ngaysinhDG, gioiTinhDG, hsdThe, username_DG, password_DG)//Lưu lúc sửa
  {

    if(hotenDG == "" || sdt == "" || emailDG == "" || diaChi == "" || ngaysinhDG == null || gioiTinhDG == "" || hsdThe == null)
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
        id_TheDG: id_TheDG,
        hotenDG: hotenDG,
        sdt: sdt,
        emailDG: emailDG,
        diaChi: diaChi,
        ngaysinhDG: ngaysinhDG,
        gioiTinhDG: gioiTinhDG,
        hsdThe: hsdThe,
        username_DG: username_DG,
        password_DG: password_DG
      };

      $http.put('http://localhost:8080/updateReader/' + id_TheDG, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại độc giả " + id_TheDG + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteReader = function(reader)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_TheDG: reader.id_TheDG,
    };

    $http.delete('http://localhost:8080/deleteReader/' + reader.id_TheDG, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa độc giả " + reader.id_TheDG + "!");
        var pos = $scope.reader.indexOf(reader);
        $scope.reader.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('subjectCtrl', function($scope, $http)
{
  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/subject",
  }).then(function mySuccess(response) {
    $scope.subject = response.data;
  }, function myError(response) {
    $scope.subject = response.statusText;
  });

  $scope.createSubject = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM THỂ LOẠI SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_LoaiSach = "";
    $scope.tenLoaiSach = "";
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addSubject = function (id_LoaiSach, tenLoaiSach)//Lưu lúc thêm
  {

    if(tenLoaiSach == "")
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
        id_LoaiSach: id_LoaiSach,
        tenLoaiSach: tenLoaiSach,
      };

      $http.post('http://localhost:8080/createSubject', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới một thể loại sách!");
          $scope.subject.push(
            {
              id_LoaiSach: data.id_LoaiSach,
              tenLoaiSach: data.tenLoaiSach,
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.subject = response.statusText;
          });
    }
  };

  $scope.editSubject = function(subject)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT THỂ LOẠI SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_LoaiSach = subject.id_LoaiSach;
    $scope.tenLoaiSach = subject.tenLoaiSach;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateSubject = function (id_LoaiSach, tenLoaiSach)//Lưu lúc sửa
  {
    if(tenLoaiSach == "")
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
        tenLoaiSach: tenLoaiSach,
      };

      $http.put('http://localhost:8080/updateSubject/' + id_LoaiSach, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại thể loại sách " + id_LoaiSach + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteSubject = function(subject)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_LoaiSach: subject.id_LoaiSach,
    };

    $http.delete('http://localhost:8080/deleteSubject/' + subject.id_LoaiSach, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa thể loại sách " + subject.id_LoaiSach + "!");
        var pos = $scope.subject.indexOf(subject);
        $scope.subject.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('borrowBooksCtrl', function($scope, $rootScope, $http)
{
  $scope.permenent = true;

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/borrowBooks",
  }).then(function mySuccess(response) {
    $scope.borrowBooks = response.data;
  }, function myError(response) {
    $scope.borrowBooks = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/booksByStatus/" + "In Stock"
  }).then(function mySuccess(response) {
    $scope.books = response.data;
  }, function myError(response) {
    $scope.books = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/reader",
  }).then(function mySuccess(response) {
    $scope.readers = response.data;
  }, function myError(response) {
    $scope.readers = response.statusText;
  });

  $scope.getIdLength = function(id_And_Name)
  {
    var count = 0;
    for (var i = 0; i < id_And_Name.length; i++) {
      if(id_And_Name.charAt(i) == "-")
        count++;
    }

    return count;
  }

  $scope.getId = function(length)
  {
    return $scope.id_TheDG.substring(0, length);
  }

  $scope.showBorrowBooksDetail = function(borrowBooksDetail)
  {
    var id_PhieuMuon = borrowBooksDetail.id_PhieuMuon;
    $http({
      method : "GET",
        url : "http://localhost:8080/borrowBooksDetailById/" + id_PhieuMuon,
    }).then(function mySuccess(response) {
      $scope.borrowBooksDetail = response.data;
    }, function myError(response) {
      $scope.borrowBooksDetail = response.statusText;
    });
  }

  $scope.codes = [];
  $scope.numberOfBarcode = 0;
  $scope.addBarcode = function()
  {
    var code = document.getElementById("code").value;
    if($scope.numberOfBarcode == 3)
    {
        alert("Không thể mượn quá 3 cuốn!");
        return;
    }
    if(code == "")
    {
      alert("Vui lòng nhập barcode!");
      return;
    }
    if($scope.codes.includes(code))
    {
      alert("Barcode này đã có trong danh sách!");
      document.getElementById("code").value = "";
      return;
    }

    $scope.codes.push(code);
    document.getElementById("code").value = "";
    $scope.numberOfBarcode++;
  }

  $scope.removeBarcode = function(codes)
  {
    var pos = $scope.codes.indexOf(codes);
    $scope.codes.splice(pos, 1);
    document.getElementById("code").value = "";
    $scope.numberOfBarcode--;
  }

  $scope.createBorrowBooks = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "TẠO PHIẾU MƯỢN SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    // $scope.id_PhieuMuon = "";
    $scope.id_ThuThu = 1;
    $scope.id_TheDG = "";
    $scope.codes = [];
    document.getElementById("code").value = "";
    $scope.numberOfBarcode = 0;

    var a = new Date();
    var y = a.getFullYear();
    var m = a.getMonth();
    var d = a.getDate();
    var currentDate = new Date(y, m, d);
    $scope.ngayLapPM = currentDate;

    var stringCurrentDate = y + "-" + (m.toString().length == 1 ? 0 : "") + (m + 1) + "-" + d;//Định dạng yyyy-MM-dd để gán vào ngayLapPM (chú ý nếu tháng chỉ có 1 chữ số thì phải thêm số 0 đằng trước)
    document.getElementById("ngayLapPM").value = ymd(stringCurrentDate);
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addBorrowBooks = function (id_PhieuMuon, id_ThuThu, id_TheDG, ngayHuaTra, ngayLapPM)//Lưu lúc thêm
  {
    // alert(" id_ThuThu: " + id_ThuThu + " id_TheDG: " + id_TheDG + " Barcode: " + $scope.codes + " ngayHuaTra: " + ngayHuaTra + " ngayLapPM: " + ngayLapPM);
    if(id_ThuThu == null || $scope.codes == "" || id_TheDG == null || ngayHuaTra == null || ngayLapPM == null)
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
        id_PhieuMuon: "",
        librarian: {
            id_ThuThu: id_ThuThu,
            hoTenTT: "",
            sdt: "",
            emailTT: "",
            diaChiTT: "",
            ngaySinhTT: "",
            gioiTinhTT: "",
            username_TT: "",
            password_TT: ""
        },
        reader: {
          id_TheDG: id_TheDG,
          hotenDG: "",
          sdt: "",
          emailDG: "",
          diaChi: "",
          ngaysinhDG: "",
          gioiTinhDG: "",
          hsdThe: "",
          username_DG: "",
          password_DG: ""
      },
        ngayLapPM: ngayLapPM
      };

      $http.post('http://localhost:8080/createBorrowBooks', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã tạo mới một phiếu mượn!");
          $scope.borrowBooks.push(
            {
              id_PhieuMuon: data.id_PhieuMuon,
              librarian: {
                  id_ThuThu: data.librarian.id_ThuThu,
                  hoTenTT: "",
                  sdt: "",
                  emailTT: "",
                  diaChiTT: "",
                  ngaySinhTT: "",
                  gioiTinhTT: "",
                  username_TT: "",
                  password_TT: ""
              },
              reader: {
                id_TheDG: data.reader.id_TheDG,
                hotenDG: "",
                sdt: "",
                emailDG: "",
                diaChi: "",
                ngaysinhDG: "",
                gioiTinhDG: "",
                hsdThe: "",
                username_DG: "",
                password_DG: ""
            },
              ngayLapPM: data.ngayLapPM
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
          // location.reload();
          var ID = $scope.borrowBooks.length;
           //////////////////////////////////////////////////////////////////////////////////////////////////////
           //Thêm chi tiết phiếu mượn
           for (var i = 0; i < $scope.codes.length; i++)
           {
             var data2 = {
               id: {
                 id_PhieuMuon: ID,
                 barcode: $scope.codes[i],
               },
               ngayHuaTra: ngayHuaTra
             };

             $http.post('http://localhost:8080/createBorrowBooksDetail', JSON.stringify(data2)).then(function(response)
             {
               if(response.data)
               {
                 location.reload();
               }
             }, function(response)
                 {
                   alert("Thêm chi tiết phiếu mượn thất bại!");
                 });
           }
           //////////////////////////////////////////////////////////////////////////////////////////////////////
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.borrowBooks = response.statusText;
          });
    }
  };

  $scope.editBorrowBooks = function(borrowBooks)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT PHIẾU MƯỢN SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_PhieuMuon = borrowBooks.id_PhieuMuon;
    $scope.id_ThuThu = borrowBooks.librarian.id_ThuThu;
    $scope.id_TheDG = borrowBooks.reader.id_TheDG;

    var myDate = ymd(borrowBooks.ngayLapPM);
    document.getElementById("ngayLapPM").value = ymd(myDate);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
    var finalDate = new Date(myDate);
    $scope.ngayLapPM = finalDate;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateBorrowBooks = function (id_PhieuMuon, id_ThuThu, id_TheDG, ngayLapPM)//Lưu lúc sửa
  {
    if(id_ThuThu == null || id_TheDG == null || ngayLapPM == null)
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
        id_PhieuMuon: id_PhieuMuon,
        librarian: {
            id_ThuThu: id_ThuThu,
            hoTenTT: "",
            sdt: "",
            emailTT: "",
            diaChiTT: "",
            ngaySinhTT: "",
            gioiTinhTT: "",
            username_TT: "",
            password_TT: ""
        },
        reader: {
          id_TheDG: id_TheDG,
          hotenDG: "",
          sdt: "",
          emailDG: "",
          diaChi: "",
          ngaysinhDG: "",
          gioiTinhDG: "",
          hsdThe: "",
          username_DG: "",
          password_DG: ""
      },
        ngayLapPM: ngayLapPM
      };

      $http.put('http://localhost:8080/updateBorrowBooks/' + id_PhieuMuon, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại phiếu mượn " + id_PhieuMuon + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteBorrowBooks = function(borrowBooks)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_PhieuMuon: borrowBooks.id_PhieuMuon,
    };

    $http.delete('http://localhost:8080/deleteBorrowBooks/' + borrowBooks.id_PhieuMuon, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa phiếu mượn " + borrowBooks.id_PhieuMuon + "!");
        var pos = $scope.borrowBooks.indexOf(borrowBooks);
        $scope.borrowBooks.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('borrowBooksDetailCtrl', function($scope, $http, $routeParams)
{
  $scope.permenent = true;
  var id_PhieuMuon = parseInt($routeParams.id_PhieuMuon);

  $http({
    method : "GET",
      url : "http://localhost:8080/borrowBooksDetailById/" + id_PhieuMuon,
  }).then(function mySuccess(response) {
    $scope.borrowBooksDetail = response.data;
  }, function myError(response) {
    $scope.borrowBooksDetail = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/booksByStatus/" + "In Stock"
  }).then(function mySuccess(response) {
    $scope.books = response.data;
  }, function myError(response) {
    $scope.books = response.statusText;
  });

  $scope.createBorrowBooksDetail = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "THÊM SÁCH MƯỢN";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_PhieuMuon = id_PhieuMuon;
    $scope.barcode = "";
    $scope.ngayHuaTra = ""
  };

  $scope.addBorrowBooksDetail = function (id_PhieuMuon, barcode, ngayHuaTra)//Lưu lúc thêm
  {

    var a = new Date();
    var y = a.getFullYear();
    var m = a.getMonth() + 1;
    var d = a.getDay();
    var currentDate = new Date(y, m, d);

    var finalNgayHuaTra = ymd(ngayHuaTra.toString());
    var returnDate = new Date(finalNgayHuaTra);

    if(returnDate < currentDate)
    {
      alert("Ngày hứa trả phải lớn hơn hoặc bằng ngày hiện hành!");
      return;
    }

    if(barcode == "" || ngayHuaTra == "")
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
        id: {
          id_PhieuMuon: id_PhieuMuon,
          barcode: barcode
        },
        ngayHuaTra: ngayHuaTra
      };

      $http.post('http://localhost:8080/createBorrowBooksDetail', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã thêm mới một sách mượn!");
          $scope.borrowBooksDetail.push(
            {
              id: {
                id_PhieuMuon: data.id.id_PhieuMuon,
                barcode: data.id.barcode
              },
              ngayHuaTra: data.ngayHuaTra
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.borrowBooksDetail = response.statusText;
          });
    }
  };

  $scope.editBorrowBooksDetail = function(borrowBooksDetail)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT SÁCH MƯỢN";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable không cho sửa

    $scope.id_PhieuMuon = borrowBooksDetail.id.id_PhieuMuon;
    $scope.barcode = borrowBooksDetail.id.barcode;

    var myDate = ymd(borrowBooksDetail.ngayHuaTra);
    document.getElementById("ngayHuaTra").value = ymd(myDate);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
    var finalDate = new Date(myDate);
    $scope.ngayHuaTra = finalDate;
  };

  $scope.updateBorrowBooksDetail = function (id_PhieuMuon, barcode, ngayHuaTra)//Lưu lúc sửa
  {
    if(id_PhieuMuon == "" || barcode == "" || ngayHuaTra == "")
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
        id: {
          id_PhieuMuon: id_PhieuMuon,
          barcode: barcode
        },
        ngayHuaTra: ngayHuaTra
      };

      $http.put('http://localhost:8080/updateBorrowBooksDetail/' + id_PhieuMuon + "&" + barcode, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại chi tiết phiếu mượn " + id_PhieuMuon + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  $scope.deleteBorrowBooks = function(borrowBooksDetail)////Khi bấm vào nút DELETE
  {

    var data =
    {
      id_PhieuMuon: borrowBooksDetail.id.id_PhieuMuon,
    };

    $http.delete('http://localhost:8080/deleteBorrowBooksDetail/' + borrowBooksDetail.id.id_PhieuMuon + "&" + borrowBooksDetail.id.barcode, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa sách mượn " + borrowBooksDetail.id.barcode + "!");
        var pos = $scope.borrowBooksDetail.indexOf(borrowBooksDetail);
        $scope.borrowBooksDetail.splice(pos, 1);//Xóa liền mà không cần load lại trang


      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('returnBooksCtrl', function($scope, $http)
{
  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.get
  $http({
    method : "GET",
      url : "http://localhost:8080/returnBooks",
  }).then(function mySuccess(response) {
    $scope.returnBooks = response.data;
  }, function myError(response) {
    $scope.returnBooks = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/reader",
  }).then(function mySuccess(response) {
    $scope.readers = response.data;
  }, function myError(response) {
    $scope.readers = response.statusText;
  });

  $scope.createReturnBooks = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "TẠO PHIẾU TRẢ SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable id_ISBN

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_PhieuTra = "";
    $scope.id_TheDG = "";
    $scope.id_ThuThu = "";

    var a = new Date();
    var y = a.getFullYear();
    var m = a.getMonth();
    var d = a.getDate();
    var currentDate = new Date(y, m, d);
    var stringCurrentDate = y + "-" + (m + 1) + "-" + d;
    $scope.ngayLapPT = currentDate;
    document.getElementById("ngayLapPT").value = ymd(stringCurrentDate);
  };

  //Lấy dữ liệu dạng JSON ở server bằng phương thức $http.post
  $scope.addReturnBooks = function (id_PhieuTra, id_TheDG, id_ThuThu, ngayLapPT)//Lưu lúc thêm
  {

    if(id_TheDG == "" || id_ThuThu == "" || ngayLapPT == "")
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
        id_PhieuTra: id_PhieuTra,
        reader: {
          id_TheDG: id_TheDG,
          hotenDG: "",
          sdt: "",
          emailDG: "",
          diaChi: "",
          ngaysinhDG: "",
          gioiTinhDG: "",
          hsdThe: "",
          username_DG: "",
          password_DG: ""
      },
        librarian: {
            id_ThuThu: id_ThuThu,
            hoTenTT: "",
            sdt: "",
            emailTT: "",
            diaChiTT: "",
            ngaySinhTT: "",
            gioiTinhTT: "",
            username_TT: "",
            password_TT: ""
        },
        ngayLapPT: ngayLapPT
      };

      $http.post('http://localhost:8080/createReturnBooks', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã tạo mới một phiếu trả!");
          $scope.returnBooks.push(
            {
              id_PhieuMuon: data.id_PhieuTra,
              reader: {
                id_TheDG: data.id_TheDG,
                hotenDG: "",
                sdt: "",
                emailDG: "",
                diaChi: "",
                ngaysinhDG: "",
                gioiTinhDG: "",
                hsdThe: "",
                username_DG: "",
                password_DG: ""
            },
            librarian: {
                id_ThuThu: data.id_ThuThu,
                hoTenTT: "",
                sdt: "",
                emailTT: "",
                diaChiTT: "",
                ngaySinhTT: "",
                gioiTinhTT: "",
                username_TT: "",
                password_TT: ""
            },
              ngayLapPT: data.ngayLapPT
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
           location.reload();
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.subject = response.statusText;
          });
    }
  };

  $scope.editReturnBooks = function(returnBooks)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT PHIẾU MƯỢN SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable id_ISBN không cho sửa

    $scope.id_PhieuTra = returnBooks.id_PhieuTra;
    $scope.id_TheDG = returnBooks.reader.id_TheDG;
    $scope.id_ThuThu = returnBooks.librarian.id_ThuThu;

    var myDate = ymd(returnBooks.ngayLapPT);
    document.getElementById("ngayLapPT").value = ymd(myDate);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
    var finalDate = new Date(myDate);
    $scope.ngayLapPT = finalDate;
  };

  //Sửa dữ liệu JSON ở server bằng phương thức $http.put
  $scope.updateReturnBooks = function (id_PhieuTra, id_TheDG, id_ThuThu, ngayLapPT)//Lưu lúc sửa
  {
    if(id_TheDG == "" || id_ThuThu == "" || ngayLapPT == "")
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
        id_PhieuTra: id_PhieuTra,
        reader: {
          id_TheDG: id_TheDG,
          hotenDG: "",
          sdt: "",
          emailDG: "",
          diaChi: "",
          ngaysinhDG: "",
          gioiTinhDG: "",
          hsdThe: "",
          username_DG: "",
          password_DG: ""
      },
      librarian: {
          id_ThuThu: id_ThuThu,
          hoTenTT: "",
          sdt: "",
          emailTT: "",
          diaChiTT: "",
          ngaySinhTT: "",
          gioiTinhTT: "",
          username_TT: "",
          password_TT: ""
      },
        ngayLapPT: ngayLapPT
      };

      $http.put('http://localhost:8080/updateReturnBooks/' + id_PhieuTra, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại phiếu trả " + id_PhieuTra + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  //Xóa dữ liệu JSON ở server bằng phương thức $http.delete
  $scope.deleteReturnBooks = function(returnBooks)////Khi bấm vào nút DELETE
  {
    var data =
    {
      id_PhieuTra: returnBooks.id_PhieuTra,
    };

    $http.delete('http://localhost:8080/deleteReturnBooks/' + returnBooks.id_PhieuTra, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa phiếu trả " + returnBooks.id_PhieuTra + "!");
        var pos = $scope.returnBooks.indexOf(returnBooks);
        $scope.returnBooks.splice(pos, 1);//Xóa liền mà không cần load lại trang
      }
    }, function(response)
        {
          alert("Xảy ra lỗi!");
        });
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('returnBooksDetailCtrl', function($scope, $http, $routeParams)
{
  $scope.permenent = true;
  var id_PhieuTra = parseInt($routeParams.id_PhieuTra);
  var id_TheDG = parseInt($routeParams.id_TheDG);

  $http({
    method : "GET",
      url : "http://localhost:8080/returnBooksDetailById/" + id_PhieuTra,
  }).then(function mySuccess(response) {
    $scope.returnBooksDetail = response.data;
  }, function myError(response) {
    $scope.returnBooksDetail = response.statusText;
  });

  $http({
    method : "GET",
      url : "http://localhost:8080/booksByStatus/" + "Borrowed"
  }).then(function mySuccess(response) {
    $scope.books = response.data;
  }, function myError(response) {
    $scope.books = response.statusText;
  });

  $scope.createReturBooksDetail = function()//Khi bấm vào nút THÊM
  {
    $scope.modalTitle = "TRẢ SÁCH";//Thay đổi tiêu đề của modal
    $scope.adding = true;//Đang thêm = true
    $scope.modifying = false;//Đang sửa = false
    $scope.disabled = false;//enable

    //Khi thêm mới thì các field trong form phải trống
    $scope.id_PhieuTra = id_PhieuTra;
    $scope.barcode = "";

    var a = new Date();
    var y = a.getFullYear();
    var m = a.getMonth();
    var d = a.getDate();
    var currentDate = new Date(y, m, d);
    var stringCurrentDate = y + "-" + (m + 1) + "-" + d;
    $scope.ngayTra = currentDate;
    document.getElementById("ngayTra").value = ymd(stringCurrentDate);
  };

  $scope.addReturnBooksDetail = function (id_PhieuTra, barcode, ngayTra)//Lưu lúc thêm
  {
    if(barcode == "" || ngayTra == "")
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
        id: {
          id_PhieuTra: id_PhieuTra,
          barcode: barcode
        },
        ngayTra: ngayTra
      };

      $http.post('http://localhost:8080/createReturnBooksDetail', JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã trả lại sách " + barcode + "!");
          $scope.returnBooksDetail.push(
            {
              id: {
                id_PhieuTra: data.id.id_PhieuTra,
                barcode: data.id.barcode
              },
              ngayTra: data.ngayTra
           });//Ngay khi thêm dữ liệu thành công thì show ra dữ liệu mà không cần load lại trang
        }
      }, function(response)
          {
            alert("Thêm thất bại!");
            $scope.returnBooksDetail = response.statusText;
          });
    }
  };

  $scope.editReturnBooksDetail = function(returnBooksDetail)//Khi bấm vào biểu tượng sửa
  {
    $scope.modalTitle = "CẬP NHẬT SÁCH TRẢ";//Thay đổi tiêu đề của modal
    $scope.adding = false;//Đang thêm = false
    $scope.modifying = true;//Đang sửa = true
    $scope.disabled = true;//disable không cho sửa

    $scope.id_PhieuTra = returnBooksDetail.id.id_PhieuTra;
    $scope.barcode = returnBooksDetail.id.barcode;

    var myDate = ymd(returnBooksDetail.ngayTra);
    document.getElementById("ngayTra").value = ymd(myDate);//Muốn gán giá trị cho date input thì bắt buộc phải là định dạng yyyy-MM-dd
    var finalDate = new Date(myDate);
    $scope.ngayTra = finalDate;
  };

  $scope.updateReturnBooksDetail = function (id_PhieuTra, barcode, ngayTra)//Lưu lúc sửa
  {
    if(id_PhieuTra == "" || barcode == "" || ngayTra == "")
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
        id: {
          id_PhieuTra: id_PhieuTra,
          barcode: barcode
        },
        ngayTra: ngayTra
      };

      $http.put('http://localhost:8080/updateReturnBooksDetail/' + id_PhieuTra + "&" + barcode, JSON.stringify(data)).then(function(response)
      {
        if(response.data)
        {
          alert("Đã cập nhật lại chi tiết phiếu trả " + id_PhieuTra + "!");
          location.reload();
        }
      }, function(response)
          {
            alert("Sửa thất bại!");
          });
    }
  };

  $scope.deleteReturnBooksDetail = function(returnBooksDetail)////Khi bấm vào nút DELETE
  {

    var data =
    {
      id_PhieuTra: returnBooksDetail.id.id_PhieuTra,
    };

    $http.delete('http://localhost:8080/deleteBorrowBooksDetail/' + returnBooksDetail.id.id_PhieuTra + "&" + returnBooksDetail.id.barcode, JSON.stringify(data)).then(function(response)
    {
      if(!response.data)//Xóa thì không còn dữ liệu :D
      {
        alert("Đã xóa sách mượn " + returnBooksDetail.id.barcode + "!");
        var pos = $scope.returnBooksDetail.indexOf(returnBooksDetail);
        $scope.returnBooksDetail.splice(pos, 1);//Xóa liền mà không cần load lại trang


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
myApp.controller('myCtrlLogin', function ($scope, $rootScope, $http, $cookies) {

    document.getElementById("bookTitle").style.display = "none";
    document.getElementById("publisher").style.display = "none";
    document.getElementById("subject").style.display = "none";
    document.getElementById("author").style.display = "none";
    document.getElementById("reader").style.display = "none";
    document.getElementById("borrowBooks").style.display = "none";
    document.getElementById("returnBooks").style.display = "none";

    document.getElementById("search").style.display = "none";
    document.getElementById("user").style.display = "none";

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
                    $rootScope.thuThu = $cookies.getObject("librarian");
                    window.location.href = "#!/bookTitle";
                    stat = "true";

                    document.getElementById("bookTitle").style.display = "block";
                    document.getElementById("publisher").style.display = "block";
                    document.getElementById("subject").style.display = "block";
                    document.getElementById("author").style.display = "block";
                    document.getElementById("reader").style.display = "block";
                    document.getElementById("borrowBooks").style.display = "block";
                    document.getElementById("returnBooks").style.display = "block";
                    document.getElementById("search").style.display = "block";
                    document.getElementById("user").style.display = "block";

                    break;
                }
                if (stat == "false") {
                    document.getElementById('btnInvalid').innerHTML = 'Invalid username or password!';
                }
            }
        }
    });

    // $scope.librarian = $cookies.getObject("librarian");
    // if ($scope.librarian == null) {
    //     alert("Please login!");
    //     window.location.href = "#!/home";
    // }

    $rootScope.logout = function () {
        $cookies.remove("librarian");
        $rootScope.librarian = null;
        window.location.href = "#!/home";
    };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

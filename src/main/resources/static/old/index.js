angular.module('app', ['ngStorage']).controller('indexController', function ($scope, $http, $location, $localStorage) {
    const contextPath = 'http://localhost:8189/market';

  $scope.loadPage = function (page) {
         $http({
             url: '/market/api/v1/products',
             method: 'GET',
             params: {
                 p: page
             }
         }).then(function (response) {

             $scope.productsPage = response.data;

             let minPageIndex = page - 2;
             if (minPageIndex < 1) {
                 minPageIndex = 1;
             }

             let maxPageIndex = page + 2;
             if (maxPageIndex > $scope.productsPage.totalPages) {
                 maxPageIndex = $scope.productsPage.totalPages;
             }

             $scope.paginationArray = $scope.generatePagesIndexes(minPageIndex, maxPageIndex);

             console.log("PAGE FROM BACKEND")
             console.log($scope.productsPage);
         });
     };

     $scope.createNewProduct = function () {
         $http.post(contextPath + '/api/v1/products', $scope.newProduct)
             .then(function successCallback(response) {
                 $scope.loadPage(1);
                 $scope.newProduct = null;
             }, function errorCallback(response) {
                 console.log(response.data);
                 alert('Error: ' + response.data.messages);
             });
     };

     $scope.clickOnProduct = function (product) {
         console.log(product);
     }

     $scope.loadCart = function (page) {
         $http({
             url: '/market/api/v1/cart',
             method: 'GET'
         }).then(function (response) {
             $scope.cartDto = response.data;
         });
     };

     $scope.addToCart = function (productId) {
         $http({
             url: contextPath + '/api/v1/cart/add/' + productId,
             method: 'GET'
         }).then(function (response) {
             $scope.loadCart();
         });
     }

     $scope.decToCart = function (productId) {
         $http({
             url: contextPath + '/api/v1/cart/decToCartProduct/' + productId,
             method: 'GET'
         }).then(function (response) {
             $scope.loadCart();
         });
      }

     $scope.generatePagesIndexes = function (startPage, endPage) {
         let arr = [];
         for (let i = startPage; i < endPage + 1; i++) {
             arr.push(i);
         }
         return arr;
     }

     $scope.tryToAuth = function () {
         $http.post(contextPath + '/auth', $scope.user)
             .then(function successCallback(response) {
                 if (response.data.token) {
                     $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                     $localStorage.marketCurrentUser = {username: $scope.user.username, token: response.data.token};
                     $scope.user.username = null;
                     $scope.user.password = null;
                 }
             }, function errorCallback(response) {
             });
     };

     $scope.tryToLogout = function () {
         $scope.clearUser();
     };

     $scope.clearUser = function () {
         delete $localStorage.marketCurrentUser;
         $http.defaults.headers.common.Authorization = '';
     };

     $scope.isUserLoggedIn = function () {
         if ($localStorage.marketCurrentUser) {
             return true;
         } else {
             return false;
         }
     };

     $scope.whoAmI = function () {
         $http({
             url: contextPath + '/api/v1/users/me',
             method: 'GET'
         }).then(function (response) {
             alert(response.data.username + ' ' + response.data.email);
         });
     };

     $scope.showMyOrders = function () {
        $http({
            url: contextPath + '/api/v1/orders',
            method: 'GET'
        }).then(function (response) {
            $scope.myOrders = response.data;
        });
     };

     $scope.createOrder = function () {
        $http({
            url: contextPath + '/api/v1/orders',
            method: 'POST'
        }).then(function (response) {
            $scope.showMyOrders();
            $scope.loadCart();
        });
     };

     $scope.clearCart = function () {
        $http({
            url: contextPath + '/api/v1/cart/clear',
            method: 'GET'
        }).then(function (response) {
            $scope.loadCart();
        });
     };

     $scope.orderInfo = function () {
            $http.post(contextPath + '/api/v1/products', $scope.orderInfo)
                .then(function successCallback(response) {
                    $scope.loadPage(1);
                    $scope.orderInfo = null;
                }, function errorCallback(response) {
                    console.log(response.data);
                    alert('Error: ' + response.data.messages);
                });
     };

     if ($localStorage.aprilMarketCurrentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.aprilMarketCurrentUser.token;
        $scope.showMyOrders();
     };

     $scope.loadPage(1);
     $scope.loadCart();
 });
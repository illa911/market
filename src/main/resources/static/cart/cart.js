angular.module('app').controller('cartController', function ($scope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/market';

    $scope.loadCart = function (page) {
        $http({
            url: contextPath + '/api/v1/cart',
            method: 'GET'
        }).then(function (response) {
            $scope.cartDto = response.data;
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

    $scope.isUserLoggedIn = function () {
        if ($localStorage.aprilMarketCurrentUser) {
            return true;
        } else {
            return false;
        }
    };

    $scope.addToCart = function (productId) {
        $http({
            url: contextPath + '/api/v1/cart/add/' + productId,
            method: 'GET'
        }).then(function (response) {
            $scope.loadCart();
        });
    };

    $scope.decToCart = function (productId) {
        $http({
            url: contextPath + '/api/v1/cart/decToCartProduct/' + productId,
            method: 'GET'
        }).then(function (response) {
            $scope.loadCart();
        });
     };

//    $scope.createOrder = function () {
//        $http({
//            url: contextPath + '/api/v1/orders',
//            method: 'POST'
//        }).then(function (response) {
//            $scope.loadCart();
//        });
//    };
    $scope.createOrder = function (phone, address) {
        $http({
            url: contextPath + '/api/v1/orders',
            method: 'POST',
            params: {
                p: phone,
                a: address
            }
        }).then(function (response) {
            console.log(p,a);
            $scope.loadCart();
        });
    };

    $scope.loadCart();
});
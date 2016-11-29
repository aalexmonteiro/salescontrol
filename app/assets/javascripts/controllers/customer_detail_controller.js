var app = angular.module('customers');

app.controller('CustomerDetailController', ['$scope', '$routeParams', '$resource',
    function($scope, $routeParams, $resource) {
        var customerId = $routeParams.id;
        var customerResource = $resource('/customers/:customerId.json');
        $scope.customer = customerResource.get({
            'customerId': customerId
        });
    }
]);
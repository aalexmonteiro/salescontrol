var app = angular.module('customers');

app.controller('CustomerEditController', ['$scope', '$routeParams', '$resource', '$location',
    function($scope, $routeParams, $resource, $location) {
        var customerId = $routeParams.id;
        var customerResource = $resource(
            '/customers/:customerId.json', {
                'customerId': customerId
            }, {
                'save': {
                    'method': 'PUT'
                }
            });

        $scope.customer = customerResource.get({
            'customerId': customerId
        });

        $scope.cancel = function() {
            $location.path('/');
        }

        $scope.save = function() {
            $scope.customer.$save(
                function() {
                    $scope.edit_customer.$setPristine();
                    $scope.edit_customer.$setUntouched();
                    Materialize.toast('Registro atualizado com sucesso!', 10000, 'green');
                },
                function() {
                    Materialize.toast('Ocorreu um erro ao salvar registro!', 10000, 'red');
                });
        }
    }
]);
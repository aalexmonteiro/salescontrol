var app = angular.module('customers', ['ngRoute', 'ngResource', 'ngMessages', 'templates']);

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			controller: 'CustomerSearchController',
			templateUrl: 'customer_search.html'
		})
		.when('/:id', {
			controller: 'CustomerDetailController',
			templateUrl: 'customer_detail.html'
		})
		.when('/:id/edit', {
			controller: 'CustomerEditController',
			templateUrl: 'customer_edit.html'
		});
	}]);

app.controller('CustomerSearchController', [
	'$scope', '$http', '$location',
	function($scope, $http, $location) {
		var page = 0;
		$scope.customers = [];
		
		$scope.search = function(searchTerm) {
			if(searchTerm.length < 3) {
				$scope.customers = [];
				return;
			}
			$http.get('/customers.json', {'params': {'keywords': searchTerm, 'page': page}})
				.then(function(response) {
					$scope.customers = response.data;
				},
				function(response) {
					alert('Ocorreu um erro na busca');
				});
		}

		$scope.previousPage = function() {
			if(page > 0 ) {
				--page;
				$scope.search($scope.keywords)
			}
		}

		$scope.nextPage = function() {
			++page;
			$scope.search($scope.keywords)
		}

		$scope.viewDetails = function(customer) {
			$location.path('/' + customer.id)
		}

		$scope.edit = function(customer) {
			$location.path('/' + customer.id + '/edit')
		}

	}]);

app.controller('CustomerDetailController',
	['$scope', '$routeParams', '$resource',
	function($scope, $routeParams, $resource) {
		var customerId = $routeParams.id;
		var customerResource = $resource('/customers/:customerId.json');
		$scope.customer = customerResource.get({ 'customerId': customerId });
	}]);

app.controller('CustomerEditController',
	['$scope', '$routeParams', '$resource', '$location',
	function($scope, $routeParams, $resource, $location) {
		var customerId = $routeParams.id;
		var customerResource = $resource(
			'/customers/:customerId.json',
			{ 'customerId': customerId },
			{ 'save': { 'method': 'PUT' } });

		$scope.customer = customerResource.get({ 'customerId': customerId });

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
	}]);


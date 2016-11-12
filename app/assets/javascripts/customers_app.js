var app = angular.module("customers", []);

app.controller("CustomerSearchController", [
	"$scope", "$http",
	function($scope, $http) {
		var page = 0;
		$scope.customers = [];
		
		$scope.search = function(searchTerm) {
			if(searchTerm.length < 3) {
				$scope.customers = [];
				return;
			}
			$http.get("/customers.json", {"params": {"keywords": searchTerm, "page": page}})
				.then(function(response) {
					$scope.customers = response.data;
				},
				function(response) {
					alert("Ocorreu um erro na busca");
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

	}]);
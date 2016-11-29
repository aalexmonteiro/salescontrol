var app = angular.module('customers');

app.factory('customerSearch', [
    "$http",
    function($http) {
        var page = 0;
        var mostRecentSearchTerm = undefined;
        var success = function() {};

        var successCallback = function(newCallback) {
            success = newCallback;
        };

        var search = function(searchTerm) {
            if (searchTerm.length < 3) {
                return;
            }

            console.log('c');
            $http.get('/customers.json', {
                    'params': {
                        'keywords': searchTerm,
                        'page': page
                    }
                })
                .then(function(response) {
                        success(response.data);
                    },
                    function(response) {
                        alert('Ocorreu um erro na busca');
                    });
        };

        var previousPage = function() {
            if ((page > 0) && mostRecentSearchTerm) {
                --page;
                $scope.search(mostRecentSearchTerm)
            }
        };

        var nextPage = function() {
            if (mostRecentSearchTerm) {
                ++page;
                $scope.search(mostRecentSearchTerm)
            }
        };

        return {
            'successCallback': successCallback,
            'search': search,
            'previousPage': previousPage,
            'nextPage': nextPage
        };
    }
]);
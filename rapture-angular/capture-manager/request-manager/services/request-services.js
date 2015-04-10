/* Services */


angular.module('raptureAngular.captureManager.request.service', [])
    .value('version', '0.1')

.factory('DataServices', function($http, $q) {
    return {
        getProviders: function(channel) {
            return $http.get('/providers').then(function(result) {
                return result.data;
            });
        }

    };
})
    .service('ExceptionService', function() {

        var token = makeToken();
        // if widget needs a unique identifier within its message
        this.getToken = function() {
            return token;
        };

        this.getUniqueToken = function() {

            var newToken = makeToken();
            return newToken;
        };

        function makeToken() {
            var token = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                token += possible.charAt(Math.floor(Math.random() * possible.length));

            return token;
        }
    })





;
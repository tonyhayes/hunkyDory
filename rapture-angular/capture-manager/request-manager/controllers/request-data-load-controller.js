angular.module('raptureAngular.captureManager.request')

.controller('requestDataLoadController', [
    '$scope', '$http', '$translate', '$q', 'DataServices',

    function($scope, $http, $translate, $q, DataServices) {

        function init() {

            $scope.providers = [];
            // client object with all Providers with template inserted
            $scope.providerEditList = [];
            // hold back the user until we finish gathering the data
            $scope.providerDataLoaded = false;


            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.then(function() {

                loadProviders().then(function() {


                    $scope.providerDataLoaded = true;


                });

            });

            deferred.resolve();
        }


        function loadProviders() {

            $scope.providers = [];
            return DataServices.getProviders().then(function(result) {
                if (result.data.providers) {
                    angular.forEach(result.data.providers, function(provider) {
                        $scope.providers.modified = false;
                        $scope.providers.push(provider);
                        $scope.providerEditList[provider.id] = {
                            name: provider.name,
                            fields: provider.fields,
                            selections: [],
                            groupSelections: {
                                assets: null,
                                fields: []
                            }
                        }
                    });
                }

            });
        }


        init();

        $scope.$watch('reloadTemplate', function() {
            if (!$scope.reloadTemplate) {
                return;
            }

            init();

        });

    }
])

;
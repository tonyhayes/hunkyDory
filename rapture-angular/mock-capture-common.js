angular.module('raptureAngular.captureManager.common')
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('raptureAngular.captureManager.common.mockResponses');
    })

.factory('raptureAngular.captureManager.common.mockResponses', function($q) {
    var interceptor = {};
    interceptor.request = function(config) {
        var mockPrefix = "rapture-angular/mock-responses/";
        var redirectActions = [
            'providers',
            'fields.BloombergSAPI',
            'fields.NorthernTrust',
            'fields.StateStreet',
        ];
        redirectActions.map(function(actionName) {
            if (config.url.indexOf(actionName) >= 0) {
                config.url = mockPrefix + actionName;
            }
        });
        return config;
    };
    interceptor.response = function(response) {
        var url = response.config.url;
        return response;
    };
    return interceptor;
});
'use strict';

angular.module('raptureAngular.captureManager.request', [
    'ngRoute',
    'raptureAngular.captureManager.request.service',
    'raptureAngular.captureManager'

])

.constant('raptureAngularTemplatePath', '/rapture-angular/capture-manager/request-manager/partials/')
    .config(['$routeProvider', 'raptureAngularTemplatePath',
        function($routeProvider, raptureAngularTemplatePath) {
            $routeProvider.
            when('/request', {
                templateUrl: raptureAngularTemplatePath + 'request.html',
            }).
            when('/dashboard', {
                templateUrl: raptureAngularTemplatePath + 'dashboard.html',
                controller: 'dashboardController'
            }).
            otherwise({
                redirectTo: '/request'
            });
        }
    ]);
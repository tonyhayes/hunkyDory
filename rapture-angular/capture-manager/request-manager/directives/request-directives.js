angular.module('raptureAngular.captureManager.request')
    .directive('requestWrapper', function(raptureAngularTemplatePath) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: raptureAngularTemplatePath + 'request-wrapper.html',
            controller: 'requestController'
        };
    })
    .directive('requestDataLoad', function() {
        return {
            restrict: 'A',
            scope: {
                'providers': '=',
                'providerEditList': '=',
                'providerDataLoaded': '=',
                'reloadTemplate': '='

            },
            controller: 'requestDataLoadController'
        };
    })
    .directive('requestAccordion', function(raptureAngularTemplatePath) {
        return {
            restrict: 'A',
            scope: {
                'providers': '=',
                'providerEditList': '='
            },
            templateUrl: raptureAngularTemplatePath + 'request-accordion.html',
            controller: 'requestAccordionController',
            controllerAs: 'accordionctrl'

        };
    })


;
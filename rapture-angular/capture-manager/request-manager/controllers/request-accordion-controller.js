angular.module('raptureAngular.captureManager.request')

.controller('requestAccordionController', [
    '$scope', '$http', '$modal', 'ExceptionService', 'raptureAngularTemplatePath',
    function($scope, $http, $modal, ExceptionService, raptureAngularTemplatePath) {
        //initiate an array to hold all active tabs
        $scope.activeTabs = [];

        if ($scope.providers.length == 1) {
            //open tab if only 1 provider
            $scope.activeTabs.push($scope.providers[0].id);
        }


        $scope.assets = null;

        $scope.addSelection = function(provider) {

            var found = false;
            var selection = getSelections(provider);
            var groupSelections = getSelectionGroup(provider);

            if (!selection.length || selection == 'fields') {
                toastr.info("Please select a field to add to a group");
                return;
            }
            found = groupSelections.fields.indexOf(selection) > -1;

            if (found) {
                toastr.info("This field has already been selected");
                return;
            }

            if (groupSelections) {
                groupSelections.fields.unshift(angular.copy(selection));
                groupSelections.modified = true;
                provider.modified = true;
            }
        };

        $scope.deleteSelection = function(field, provider) {

            var group = getSelectionGroup(provider);

            for (var i = group.fields.length - 1; i >= 0; i--) {
                var id = group.fields[i];
                if (id == field) {
                    group.fields.splice(i, 1);
                }
            }

        };


        $scope.createGroup = function(group, provider) {

            //send request to server - error if empty asset
            if (!group.fields.length) {
                toastr.info("No fields have been selected");
                return;
            }
            if (!group.assets || !group.assets.length) {
                toastr.info("No assets have been selected");
                return;
            }


            saveTemplate(provider, angular.copy(group.fields), angular.copy(group.assets));
            group.fields = [];
            group.assets = null;
            provider.modified = false;

        }

        function saveTemplate(provider, fields, assets) {


            var data = {
                provider: provider.name,
                assets: assets,
                fields: fields
            }
            var saveTemplatePromise = $http.post('/requests/r​equestName', data);
            saveTemplatePromise
                .success(function(response, status, header, config) {

                    toastr.info("Data request has been logged");

                })
                .error(function(response, status, header, config) {
                    var req = JSON.stringify(config.data);
                    toastr.info(req);
                });
        }


        //check if the tab is active
        $scope.isOpenTab = function(tab) {
            //check if this tab is already in the activeTabs array
            if ($scope.activeTabs.indexOf(tab) > -1) {
                //if so, return true
                return true;
            } else {
                //if not, return false
                return false;
            }
        };

        //function to 'open' a tab
        $scope.openTab = function(tab) {
            // check if the currently open tab has any staged exceptions
            if ($scope.activeTabs.length) {
                var provider = {
                    id: $scope.activeTabs[0]
                };
                checkSelected(provider, tab);
            } else {

                openProviderTab(tab);

            }

        };


        //initiate an array to hold all active selection panels
        $scope.activeSelectionPanels = [];

        //check if the selection panel is active
        $scope.isOpenAdd = function(group) {
            if (!group.token) {
                group.token = ExceptionService.getUniqueToken();
            }

            //check if this  is already in the  array
            return ($scope.activeSelectionPanels.indexOf(group.token) > -1);
        };

        //function to 'open' a selection panel
        $scope.openAdd = function(group) {
            //check if tab is already open
            if ($scope.isOpenAdd(group)) {
                //if it is, remove it from the  array
                $scope.activeSelectionPanels.splice(this.activeSelectionPanels.indexOf(group.token), 1);
            } else {
                // first close all open  clearing the array
                $scope.activeSelectionPanels = []
                //if it's not, add it!
                $scope.activeSelectionPanels.push(group.token);
            }
        };

        function openProviderTab(tab) {
            //check if tab is already open
            if ($scope.isOpenTab(tab)) {
                //if it is, remove it from the activeTabs array
                $scope.activeTabs.splice($scope.activeTabs.indexOf(tab), 1);
            } else {
                // first close all open tabby clearing the array
                $scope.activeTabs = [];
                //if it's not, add it!
                $scope.activeTabs.push(tab);
            }
        }

        function getSelections(provider) {
            return $scope.providerEditList[provider.id].selections;
        }

        function getSelectionGroup(provider) {
            return $scope.providerEditList[provider.id].groupSelections;
        }

        function getSelectionGroupList(provider) {
            return $scope.providerEditList[provider.id].groupSelections.fields;
        }

        function setSelectionGroup(provider, list) {
            return $scope.providerEditList[provider.id].groupSelections.fields = list;
        }


        function checkSelected(provider, tab) {
            var staged = getSelectionGroupList(provider);
            if (!staged.length) {
                openProviderTab(tab);
                return;
            }
            var modalInstance = $modal.open({
                templateUrl: raptureAngularTemplatePath + "request-discard-staged.html",
                windowClass: 'mfi-modal theme-angry-ferret',
                backdrop: 'static',
                keyboard: true
            });

            modalInstance.result.then(function() {
                //processing for ok - clear exceptions and continue
                getSelectionGroup(provider, []);
                openProviderTab(tab);
            });
        }
    }
])

;
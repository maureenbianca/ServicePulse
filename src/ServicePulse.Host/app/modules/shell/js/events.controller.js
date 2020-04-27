﻿(function(window, angular) {

	"use strict";

	function controller(
		$scope,
		$location,
		auditLogService) {
		
		$scope.loadingData = true;
		
		var subscription;
		
		$scope.viewCategory = function (eventLogItem) {

			switch(eventLogItem.category) {
				case 'Endpoints':
					$location.path('/configuration/endpoints');
					break;
				case 'HeartbeatMonitoring':
					$location.path('/endpoints');
					break;
				case 'CustomChecks':
					$location.path('/custom-checks');
					break;
				case 'EndpointControl':
					$location.path('/endpoints');
					break;
				case 'MessageFailures':
					var newlocation = '/failed-messages/groups';
					if (eventLogItem.related_to && eventLogItem.related_to[0].search('message') > 0) {
						newlocation = '/failed-messages' + eventLogItem.related_to[0];
					}
					$location.path(newlocation);
					break;
				case 'Recoverability':
					$location.path('/failed-messages/groups');
					break;
				case 'MessageRedirects':
					$location.path('/configuration/redirects');
					break;
				default:
			}
		};		

		$scope.eventLog = {
			eventLogPage: 1,
			eventLogTotalItems: 105,
			eventLogItemsPerPage: 25,
			items: []
		};

		function mergeIn(destination, source, propertiesToSkip) {
			for (var propName in source) {
				if (source.hasOwnProperty(propName)) {
					if(!propertiesToSkip || !propertiesToSkip.includes(propName)) {
						destination[propName] = source[propName];
					}
				}
			}
		}

		$scope.updateUI  = function () {
			if (subscription) {
				subscription.dispose();
			}

			subscription = auditLogService.createAuditLogSource($scope.eventLog.eventLogPage, $scope.eventLog.eventLogItemsPerPage).subscribe(function (auditLog) {

				$scope.loading = false;			
					
				$scope.eventLog.eventLogTotalItems = parseInt(auditLog.total);
				mergeIn($scope.eventLog.items, auditLog.data);
				$scope.$apply();	
			});
		}

		$scope.updateUI();
	}

	controller.$inject = [
		"$scope",
		"$location",
		"auditLogService"		
	];

	angular.module("events.module")
		.controller("EventsCtrl", controller);

}(window, window.angular));

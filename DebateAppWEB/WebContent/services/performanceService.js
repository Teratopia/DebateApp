angular.module('ngDebate').factory('performanceService',
		function($http, authenticationService) {
			var service = {};

			service.indexPerformances = function() {

				return $http({
					method : 'GET',
					url : 'api/performance',
					headers : {
						'x-access-token' : authenticationService.getToken()
					}
				})

			};
			
			service.getPerformance = function(id) {

				return $http({
					method : 'GET',
					url : 'api/performance/' + id,
					headers : {
						'x-access-token' : authenticationService.getToken()
					}
				})
			};

			service.createPerformance = function(data) {

				return $http({
					method : 'POST',
					url : 'api/performance',
					dataType : 'json',
					headers : {
						'Content-Type' : 'application/json',
						'x-access-token' : authenticationService.getToken()
					},
					data : data
				})

			}

			service.instPerformanceAndMember = function(cJson) {

				return $http({
					method : 'POST',
					url : 'api/pam',
					dataType : 'json',
					headers : {
						'Content-Type' : 'application/json',
						'x-access-token' : authenticationService.getToken()
					},
					data : cJson
				})

			}

			service.deletePerformance = function(id) {

				return $http({
					method : 'DELETE',
					url : 'api/performance/' + id,
					headers : {
						'x-access-token' : authenticationService.getToken()
					}
				})

			}

			service.editPerformance = function(id, data) {

				return $http({
					method : 'PUT',
					url : 'api/performance/' + id,
					dataType : 'json',
					headers : {
						'Content-Type' : 'application/json',
						'x-access-token' : authenticationService.getToken()
					},
					data : data
				})

			}

			service.indexPerformancesByUserId = function(id) {

				return $http({
					method : 'GET',
					url : 'api/performance/user/' + id,
					headers : {
						'x-access-token' : authenticationService.getToken()
					}
				})

			}

			service.indexPerformancesByDebateId = function(id) {

				return $http({
					method : 'GET',
					url : 'api/performance/debate' + id,
					headers : {
						'x-access-token' : authenticationService.getToken()
					}
				})
			}

			return service;
		});

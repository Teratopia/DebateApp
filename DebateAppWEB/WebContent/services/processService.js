angular.module('ngDebate').factory('issueService', function($http, authenticationService){
  var service = {};

  service.indexUsersByPerformances = function(performances){

	  return $http({
		  method : 'GET',
		  url : 'api/performance/users/'+perf.id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
		  }
	  })

  };

  return service;
});

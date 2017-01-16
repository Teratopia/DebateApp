angular.module('ngDebate').factory('pmService', function($http, authenticationService){
  var service = {};

  service.indexPerformanceMembers = function(){

		return $http({
		method : 'GET',
		url : 'api/performanceMember',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})

  };

  service.getPerformanceMember = function(id){

	  return $http({
		  method : 'GET',
		  url : 'api/performanceMember/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createPerformanceMember = function(data){

	  return $http({
		  method : 'POST',
		  url : 'api/performanceMember',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })

  }

  service.deletePerformanceMember = function(id){

    return $http({
    	method : 'DELETE',
    	url : 'api/performanceMember/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })

  }

  service.editPerformanceMember = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/performanceMember/'+id,
		  dataType : 'json',
		  headers : {
			  'Content-Type' : 'application/json',
			  'x-access-token' : authenticationService.getToken()
			  },
			  data : data
	  })

  }

  return service;
});

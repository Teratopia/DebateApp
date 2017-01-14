angular.module('ngDebate').factory('rulesService', function($http, authenticationService){
  var service = {};

  service.indexRules = function(){

		return $http({
		method : 'GET',
		url : 'api/rules',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getRules = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/rules/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createRules = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/rules',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteRules = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/rules/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editRules = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/rules/'+id,
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

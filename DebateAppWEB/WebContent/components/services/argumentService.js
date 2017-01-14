angular.module('ngDebate').factory('argumentService', function($http, authenticationService){
  var service = {};

  service.indexArguments = function(){

		return $http({
		method : 'GET',
		url : 'api/argument',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getArgument = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/argument/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createArgument = function(arg){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/argument',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : arg
	  })
	  
  }

  service.deleteArgument = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/argument/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editArgument = function(id, arg){

	  return $http({
		  method : 'PUT',
		  url : 'api/argument/'+id,
		  dataType : 'json',
		  headers : {
			  'Content-Type' : 'application/json',
			  'x-access-token' : authenticationService.getToken()
			  },
			  data : arg
	  })
	  
  }

  return service;
});

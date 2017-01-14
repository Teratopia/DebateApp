angular.module('ngDebate').factory('userService', function($http, authenticationService){
  var service = {};

  service.indexUsers = function(){

		return $http({
		method : 'GET',
		url : 'api/user',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getUser = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/user/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

//  service.createUser = function(data){
//	  
//	  return $http({
//		  method : 'POST',
//		  url : 'api/user',
//		  dataType: 'json',
//		  headers : {
//		  'Content-Type' : 'application/json',
//		  'x-access-token' : authenticationService.getToken()
//		  },
//		  data : data
//	  })
//	  
//  }

  service.deleteUser = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/user/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editUser = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/user/'+id,
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

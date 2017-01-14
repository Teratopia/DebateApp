angular.module('ngDebate').factory('issueService', function($http, authenticationService){
  var service = {};

  service.indexIssues = function(){

		return $http({
		method : 'GET',
		url : 'api/issue',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getIssue = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/issue/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createIssue = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/issue',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteIssue = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/issue/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editIssue = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/issue/'+id,
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

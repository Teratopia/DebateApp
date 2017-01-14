angular.module('ngDebate').factory('commentService', function($http, authenticationService){
  var service = {};

  service.indexComments = function(){

		return $http({
		method : 'GET',
		url : 'api/comment',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getComment = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/comment/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createComment = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/comment',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteComment = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/comment/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editComment = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/comment/'+id,
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

angular.module('ngDebate').factory('voteService', function($http, authenticationService){
  var service = {};

  service.indexVotes = function(){

		return $http({
		method : 'GET',
		url : 'api/vote',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getVote = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/vote/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createVote = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/vote',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteVote = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/vote/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editVote = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/vote/'+id,
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

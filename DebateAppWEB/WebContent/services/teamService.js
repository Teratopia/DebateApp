angular.module('ngDebate').factory('teamService', function($http, authenticationService){
  var service = {};

  service.indexTeams = function(){

		return $http({
		method : 'GET',
		url : 'api/team',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getTeam = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/team/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createTeam = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/team',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteTeam = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/team/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editTeam = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/team/'+id,
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

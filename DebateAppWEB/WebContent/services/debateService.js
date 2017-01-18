angular.module('ngDebate').factory('debateService', function($http, authenticationService){
  var service = {};

  service.indexDebates = function(){

		return $http({
		method : 'GET',
		url : 'api/debate',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})

  };

  service.indexDebateFull = function(id){

		return $http({
		method : 'GET',
		url : 'api/debate/' + id + '/full',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})

  };

  service.getDebate = function(id){

	  return $http({
		  method : 'GET',
		  url : 'api/debate/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createDebate = function(data){

	  return $http({
		  method : 'POST',
		  url : 'api/debate',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })

  }

  service.deleteDebate = function(id){

    return $http({
    	method : 'DELETE',
    	url : 'api/debate/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })

  };

  service.editDebate = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/debate/'+id,
		  dataType : 'json',
		  headers : {
			  'Content-Type' : 'application/json',
			  'x-access-token' : authenticationService.getToken()
			  },
			  data : data
	  })

  };

  return service;
});

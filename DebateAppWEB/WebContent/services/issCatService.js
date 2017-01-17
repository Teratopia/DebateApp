angular.module('ngDebate').factory('issCatService', function($http, authenticationService){
  var service = {};

  service.indexIssCatsByCategory = function(){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/issCat/cat',
		  headers : {
			  'x-access-token' : authenticationService.getToken()
		  }
	  })
	  
  };
  
  service.indexIssCats = function(){

		return $http({
		method : 'GET',
		url : 'api/issCat',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
	  
  };
  
  service.getIssCat = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/issCat/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createIssCat = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/issCat',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteIssCat = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/issCat/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editIssCat = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/issCat/'+id,
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

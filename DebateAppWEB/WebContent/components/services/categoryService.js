angular.module('ngDebate').factory('categoryService', function($http, authenticationService){
  var service = {};

  service.indexCategories = function(){

		return $http({
		method : 'GET',
		url : 'api/category',
		headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
		})
  };
  
  service.getCategory = function(id){
	  
	  return $http({
		  method : 'GET',
		  url : 'api/category/'+id,
		  headers : {
			  'x-access-token' : authenticationService.getToken()
			  }
	  })
  };

  service.createCategory = function(data){
	  
	  return $http({
		  method : 'POST',
		  url : 'api/category',
		  dataType: 'json',
		  headers : {
		  'Content-Type' : 'application/json',
		  'x-access-token' : authenticationService.getToken()
		  },
		  data : data
	  })
	  
  }

  service.deleteCategory = function(id){
    
    return $http({
    	method : 'DELETE',
    	url : 'api/category/'+id,
    	headers : {
  		  'x-access-token' : authenticationService.getToken()
  		  }
    })
    
  }
  
  service.editCategory = function(id, data){

	  return $http({
		  method : 'PUT',
		  url : 'api/category/'+id,
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

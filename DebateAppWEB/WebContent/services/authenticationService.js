angular.module('ngDebate').factory('authenticationService', function($window, $http){
	  var service = {};
	  
	  	service.saveToken = function(token){
	      $window.localStorage['debate-token'] = token;
	    };

	    service.getToken = function() {
	      return $window.localStorage['debate-token'];
	    };
	    
	    service.logout = function() {
	        $window.localStorage.removeItem('debate-token');
	    };

	    service.authUser = function(user){

		  return $http({
			  method : 'POST',
			  url : 'api/auth',
			  dataType: 'json',
			  headers : {
			  'Content-Type' : 'application/json',
				  
			  },
			  data : user
		  })
		  .then(function(response){
			  service.saveToken(response.data.jwt);
			  return response;
		  })
		  
	    };
	  
	    service.createUser = function(user){
		  
		  return $http({
			  method : 'POST',
			  url : 'api/signup',
			  dataType: 'json',
			  headers : {
				  'Content-Type' : 'application/json',
			  },
			  data : user
		  })
		  
	    };
	    	  
	    service.unauthorizeUser = function(){
		  
		  return $http({
			  method : 'GET',
			  url : 'api/unauth',
			  headers : {
				  'Content-Type' : 'application/json',
			  }
		  })
		  
	    };
	  
	    service.isLoggedIn = function() {
	        var token = service.getToken();

	        if (token) {
	          // $window.atob decodes the encoded string
	          var payload = JSON.parse($window.atob(token.split('.')[1]));

	          return payload.exp > Date.now() / 1000;

	        } else {
	          return false;
	        }
	     };
	     
	     service.currentUser = function() {
	          if (isLoggedIn()) {
	            var token = getToken();
	            var payload = JSON.parse($window.atob(token.split('.')[1]));

	            return {
	              name : payload.username,
	              password : payload.password,
	              id : payload.id
	            };
	          }
	      };
	
	      return service;
});
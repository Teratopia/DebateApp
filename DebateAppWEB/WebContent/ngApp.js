var app = angular.module('ngDebate', ['ngRoute','ui.bootstrap','vAccordion', 'ngAnimate']); //ngRoute and 'ui.bootstrap' are module dependencies

app.config(function($routeProvider){ // $routeProvider is an Angular service
  console.log("INSIDE config");
  $routeProvider
		.when('/', {
			template: `<login-component></login-component>` // use templateURL to reference a different file
		})
		.when('/login', {
			template: `<login-component></login-component>` // use templateURL to reference a different file
		})
		.when('/categories', {
			template: `<categories-component></categories-component>` // use templateURL to reference a different file
		})
		.when('/join', {
			template: `<joinDebate-component></joinDebate-component>` // use templateURL to reference a different file
		})
		.when('/start', {
			template: `<startDebate-component></startDebate-component>` // use templateURL to reference a different file
		})
		.when('/debate/:id', {
			template: `<debate-component></debate-component>`, // Directs user to page displaying details of specific debate. debate is fetched from 'api/debate/{id}' on SpringREST
		})
		.when('/about', {
			template: `<about-component></about-component>` // use templateURL to reference a different file
		})
		.when('/secure/profile', {
			template: `<profile-component></profile-component>` // use templateURL to reference a different file
		})
		.when('/issues', {
			template: `<issues-component></issues-component>` // use templateURL to reference a different file
		})
		.when('/startDebate', {
			template: `<start-debate-component></start-debate-component>` // use templateURL to reference a different file
		})
		.when('/join/:id', {
			template: `<join-debate-component debate="$resolve.myData"></join-debate-component>`
				,
			resolve : {
//				     auth : function(authenticationService) {
//				       // use an authService to perform an authentication check
//				     },
				     myData : function(debateService, $route, $location) {
				       console.log("IN MYDATA");
				       console.log("current params id: ");
				       console.log($route.current.params.id);
				       var id = parseInt($route.current.params.id);

				       if (id) {
				   		        return debateService.getDebate(id) // call get debate to fetch the debate by id
				   		         .then(function(res) {
				   		           console.log("IN .THEN in ngApp");
				   		           console.log(res.data);
				   		           return res.data; // return the JSON data of the fetched debate.
				   		         })
				   		         .catch(function(err) {
				   		           // if the id was not found, redirect to not found
				   		           if (err.status == 404) {
				   		             $location.path('/_404');
				   		           }
				   		         })
				   		       } else {
				   		         // if id is absent or NaN, redirect to not found
				   		         $location.path('/_404');
				   		       }
				   		     }

			}

		})
		// .when('/debate/:id', { // Directs user to page displaying details of specific debate. debate is fetched from 'api/debate/{id}' on SpringREST
		//   template : `<detail-component debate="$resolve.myData"></detail-component>`,
		//   resolve : {
		//     auth : function(authenticationService) {
		//       // use an authService to perform an authentication check
		//     },
		//     myData : function(debateService, $route, $location) {
		//       console.log("IN MYDATA");
		//       console.log("$route: ");
		//       console.log($route);
		//       console.log("$location: ");
		//       console.log($location);
		//       var id = parseInt($route.current.params.id); // Get the id of the specific clicked on debate from the general debate-table-componenet
    //
		//       if (id) { // if the id is successfully parsed in the previous line, try to fetch the debate using the parsed id
		//         return debateService.getdebate(id) // call get debate to fetch the debate by id
		//         .then(function(res) {
		//           console.log("IN .THEN");
		//           return res.data; // return the JSON data of the fetched debate.
		//         })
		//         .catch(function(err) {
		//           // if the id was not found, redirect to not found
		//           if (err.status == 404) {
		//             $location.path('/_404');
		//           }
		//         })
		//       } else {
		//         // if id is absent or NaN, redirect to not found
		//         $location.path('/_404');
		//       }
		//     }
		//   }
		// })
		.otherwise({
		    redirectTo: '/'
		})
});

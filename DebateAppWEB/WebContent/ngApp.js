var app = angular.module('ngDebate', ['ngRoute','ui.bootstrap']); //ngRoute and 'ui.bootstrap' are module dependencies

app.config(function($routeProvider){ // $routeProvider is an Angular service
  $routeProvider
        .when('/', {
            template: `<todos-component></todos-component>` // use templateURL to reference a different file
        })
        .when('/todo/:id', { // Directs user to page displaying details of specific todo. Todo is fetched from 'api/todo/{id}' on SpringREST
          template : `<detail-component todo="$resolve.myData"></detail-component>`,
          resolve : {
            // auth : function(authService) {
            //   // use an authService to perform an authentication check
            // },
            myData : function(todoService, $route, $location) {
              console.log("IN MYDATA");
              console.log("$route: ");
              console.log($route);
              console.log("$location: ");
              console.log($location);
              var id = parseInt($route.current.params.id); // Get the id of the specific clicked on todo from the general todo-table-componenet

              if (id) { // if the id is successfully parsed in the previous line, try to fetch the todo using the parsed id
                return todoService.getTodo(id) // call getTodo to fetch the todo by id
                .then(function(res) {
                  console.log("IN .THEN");
                  return res.data; // return the JSON data of the fetched todo.
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
        .otherwise({
            redirectTo: '/'
        })
});

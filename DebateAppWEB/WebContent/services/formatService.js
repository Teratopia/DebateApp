angular.module('ngDebate').factory('formatService', function($http, authenticationService){
  var service = {};
  var colors = ["arg-right","arg-left","pink","tomato","pale-golden-rod","pale-turquoise","thistle","lemon-chiffon"];

  service.getArgPerfClass = function(arg, performances){
    for(var i = 0; i < performances.length; i++){
      if(arg.perfMember.performance.id === performances[i].id){
    	  console.log("ARG ID" + arg.perfMember.performance.id);
    	  console.log("PERFORMANCE ID" + performances[i].id);
        return colors[i];
      }
    }
  }

  service.getPerformanceClass = function(index){
    return colors[index];
  }

return service;
});

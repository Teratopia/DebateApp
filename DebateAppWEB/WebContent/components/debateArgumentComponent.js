var app = angular.module('ngDebate');

function debateArgumentController(authenticationService, debateService) { // authenticationService as parameter
  var vm = this;
  var colors = ["ivory","tomato","pale-golden-rod","pale-turquoise","thistle","lemon-chiffon"];

  vm.getPerformanceClass = function(arg){
    if(vm.performances.length < 3){
      if(arg.perfMember.performance.id === vm.performances[0].id){
        return "arg-left";
      }
      else if(arg.perfMember.performance.id === vm.performances[1].id){
        return "arg-right";
      }
      else{
        console.error("Error: User not a performer.");
      }
    }

    if(vm.performers.length >= 3){
      for(var i = 0; i < args.length; i++){
        if(arg.perfMember.performance.id === vm.performances[i].id){
          return colors[i];
        }
        else{
          console.error("Error: User not a performer.");
        }
      }
    }
  }
}

app.component('debateArgumentComponent',{
  template: ` <div class="display-screen" style="min-height:396px">
                <div ng-repeat="argument in $ctrl.args">
                  <div ng-class="$ctrl.getPerformanceClass(argument)">
                    {{argument.text}}
                  </div>
                </div>
              </div>`,

  controller : debateArgumentController,

  bindings : {
                args: '<',
                performances: '<'
              }
});

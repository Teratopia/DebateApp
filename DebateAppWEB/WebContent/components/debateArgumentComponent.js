var app = angular.module('ngDebate');

function debateArgumentController(authenticationService, debateService, formatService) { // authenticationService as parameter
  var vm = this;

  vm.assignClass = function(arg, performances){
    return formatService.getArgPerfClass(arg, performances);
  }

  vm.isRight=function(args, performances){
    return formatService.getArgNumClass(args, performances);
  }
}

//Add filter on ng-repeat to sort by timestamp?
app.component('debateArgumentComponent',{
  template: ` <div class="args-display-screen">
                <div ng-repeat="argument in $ctrl.debatewargs.arguments">
                  <div class="row arg-holder">
                    <div ng-class="$ctrl.assignClass(argument, $ctrl.debatewargs.debate.performances)">
                	  <div ng-class="$ctrl.isRight(argument, $ctrl.debatewargs.debate.performances)">{{$index}}</div>
                        <div class="pad-arg-text">
                          {{argument.text}}
                        </div>
                     </div>
                   </div>
                </div>
              </div>`,

  controller : debateArgumentController,

  bindings : {
                debatewargs: '<'
              }
});

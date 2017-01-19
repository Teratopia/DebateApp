var app = angular.module('ngDebate');

function debateArgumentController(authenticationService, debateService, formatService) { // authenticationService as parameter
  var vm = this;
  vm.classCode = null;
  vm.leftRight = null;

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
                <div ng-repeat="argument in $ctrl.debatefull.arguments | orderBy: 'timeStamp'">
                  <div class="row arg-holder">
                    <div ng-class="$ctrl.assignClass(argument, $ctrl.debatefull.debate.performances)">
                	  <div ng-class="$ctrl.isRight(argument, $ctrl.debatefull.debate.performances)">{{$index}}</div>
                        <div class="pad-arg-text">
                          {{argument.text}}
                          <div style="font-size:.7em">({{argument.user.username}})</div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>`,

  controller : debateArgumentController,

  bindings : {
                debatefull: '<'
              }
});

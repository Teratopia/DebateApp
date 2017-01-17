var app = angular.module('ngDebate');

function debateArgumentController(authenticationService, debateService, formatService) { // authenticationService as parameter
  var vm = this;

  vm.assignClass = function(arg, performances){
    return formatService.getArgPerfClass(arg, performances);
  }

  vm.isRight=function(x){
    if(x === 'arg-right'){
      return "arg-index-number-right";
    }else{
      return "arg-index-number-left";
    }
  }
}

app.component('debateArgumentComponent',{
  template: ` <div class="display-screen" style="min-height:396px">
                <div ng-repeat="argument in $ctrl.args">
                  <div class="row arg-holder">
                    <div ng-class="$ctrl.assignClass(argument, $ctrl.performances)">
                	  <div ng-class="$ctrl.isRight($ctrl.assignClass(argument, $ctrl.performances))">{{$index}}</div>
                        <div class="pad-arg-text">
                          {{argument.text}}
                        </div>
                     </div>
                   </div>
                </div>
              </div>`,

  controller : debateArgumentController,

  bindings : {
                args: '<',
                performances: '<'
              }
});

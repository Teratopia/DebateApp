var app = angular.module('ngDebate');

function debateInfoController(authenticationService, debateSerice) { // authenticationService as parameter
  var vm = this;
  vm.arguments = function(x){
    debateSerice.indexDebateArgs();
  }

}

app.component('debateInfoComponent',{
  template: ` <div class="display-screen" style="min-height:396px">
                <div ng-class="argument in $ctrl.performance">

                </div>
              </div>`,

  controller : debateInfoController,
});

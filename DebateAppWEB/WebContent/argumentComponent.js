var app = angular.module('ngDebate');

function debateInfoController(authenticationService, argumentService) { // authenticationService as parameter
  var vm = this;
  vm.argument = function(x){
    argumentService.getArgument();
  }

}

app.component('debateInfoComponent',{
  template: ` <div class="display-screen" style="min-height:396px">
                <div ng-class="expression">
                </div>
              </div>`,

  controller : debateInfoController,
});

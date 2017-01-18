var app = angular.module('ngDebate');

function argFormController(authenticationService, userService, formatService, argumentService) { // authenticationService as parameter
  var vm = this;
  vm.argumentText = 'type argument';
  vm.hrefText = 'insert URL';
  vm.userInfo;
  vm.newText;
  vm.newRef;

  authenticationService.currentUser().then(function(res){
	  vm.userInfo = res.data;
  })
  
  vm.arg = {
		  'user' : vm.userInfo,
		  'perfMember' : vm.performance,
		  'text' : vm.newText,
		  'linkRef' : vm.newRef,
		  'timeStamp' : new Date(),
		  'team' : vm.performance.team
  }
  
  vm.instArg = function(){
	  argumentService.createArgument(vm.arg).then(function(res){
		  vm.newText = null;
		  vm.newRef = null;
	  })
  }
  
  
}

app.component('argFormComponent',{
  template: `<div class="form-box">
              <form>
                <div>
                  <textarea id="arg-text" placeholder="{{$ctrl.argumentText}}" ng-model="$ctrl.newText" class="arg-text-form"></textarea>
                </div>
                <div>
                  <input type="text" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
                </div>
                <button ng-click="$ctrl.instArg()">THIS IS NOT THE BUTTON YOU'RE LOOKING FOR</button>
              </form>
            </div>

  `,

  controller : argFormController,

  bindings : {
	  			        debate: '<',
	  			        performance : '<'
              }
});

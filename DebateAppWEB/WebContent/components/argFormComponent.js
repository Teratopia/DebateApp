var app = angular.module('ngDebate');

function argFormController(authenticationService, userService, formatService, argumentService,
		debateService, performanceService, pmService) { // authenticationService as parameter
  var vm = this;
  vm.argumentText = 'type argument';
  vm.hrefText = 'insert URL';
  vm.userInfo = authenticationService.currentUser();
  vm.perfMember;
  vm.newText = "";
  vm.newRef = "";

  // Commented for testing
  //  vm.performance;
//  vm.detPerformance = function(){
//	  vm.debatefull.performance_members.forEach(function(pm){
//		  if(pm.user.id === vm.cUser.id){
//			  vm.perfMember = pm;
//			  vm.performance = pm.performance;
//		  }
//	  })
//  }
//  vm.detPerformance();
  
  //for testing
  vm.debate;
  vm.performance;
  debateService.getDebate(29).then(function(res){
	  vm.debate = res.data;
  })
  performanceService.getPerformance(24).then(function(res){
	  vm.performance = res.data;
	  
  })
  pmService.getPerformanceMember(16).then(function(res){
	  vm.perfMember = res.data;
  })
  //End Testing
  
  
  vm.instArg = function(){
	  console.log("in instArg. vm.arg = ")
	  
	  var arg = {
			  'user' : vm.userInfo,
			  'perfMember' : vm.perfMember,
			  'text' : vm.newText,
			  'linkRef' : vm.newRef,
			  'timeStamp' : new Date(),
			  'team' : vm.performance.team
	  }
	  
	  console.log(arg);
	  argumentService.createArgument(arg).then(function(res){
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
                  <input id="args-submit" ng-click="$ctrl.instArg()" type="submit" value="Send">
                </div>
                <div style="overflow: hidden; padding-right: .35em;">
                  <input type="text" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
                </div>
              </form>
            </div>`,

  controller : argFormController

  //Commented for testing
  //  ,
//
//  bindings : {
//	  			        debatefull: '<',
//	  			        cUser : '<'
//              }
});

var app = angular.module('ngDebate');

function argFormController(authenticationService, userService, formatService, argumentService,
		debateService, performanceService, pmService) { // authenticationService
														// as parameter

  var vm = this;
  vm.cUser = function(){authenticationService.getCurrentUser();}
  vm.argumentText = 'type argument';
  vm.hrefText = 'insert URL';
  vm.userInfo = authenticationService.currentUser();
  vm.perfMember;
  vm.newText = "";
  vm.newRef = "";

  // Commented for testing
   vm.performance;
 vm.detPerformance = function(){
	  vm.debatefull.performance_members.forEach(function(pm){
		  if(pm.user.id === vm.cUser.id){
			  vm.perfMember = pm;
			  vm.performance = pm.performance;
		  }
	  })
 }

   vm.$onInit=function(){
      vm.detPerformance();
 	  };

  // for testing
  // vm.debate;
  // vm.performance;
  // debateService.getDebate(29).then(function(res){
	// vm.debate = res.data;
  // })
  // performanceService.getPerformance(24).then(function(res){
	// vm.performance = res.data;
  //
  // })
  // pmService.getPerformanceMember(16).then(function(res){
	// vm.perfMember = res.data;
  // })
  // End Testing


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


// turnCount is pulled from the database
  var turnCount = 0;


  vm.$onInit=function(){
	  turnCount = vm.debatefull.debate.turnCount;
	  };
//  $timeout(function(){turnCount = vm.debatefull.debate.turnCount;},300);

  vm.turnId = "unknown";
  vm.turnCalc = function(roster){
    angular.element(document).ready(function () {
      countDown = turnCount;
      var memberIndex = [];
      for(var i = 0; i<roster.length; i++){
        memberIndex[i]=0;
      }
      var teamRow=0;
      while(countDown >= 0){
        var flag = true;
        for(var teamRow=0; teamRow<roster.length && flag; teamRow++){
      	  if(roster[teamRow].length!=0){
            if(memberIndex[teamRow] >= roster[teamRow].length){
              memberIndex[teamRow]=0;
            }
            if(countDown<1){
              turnCount++;
              vm.turnId = roster[teamRow][memberIndex[teamRow]];
              flag = false;
            }
            memberIndex[teamRow]++;
            countDown--;
            }
          }
        }

      	vm.upDebate();
        console.log("Value of vm.turn is: " + vm.turn);
    });
  }


  vm.upDebate = function(){
	  console.log("in upDebate. vm.debate = ")

	  var debate = {
			  'performances' : vm.debatefull.debate.performances,
			  'rules' : vm.debatefull.debate.rules,
			  'issue' : vm.debatefull.debate.issue,
			  'timeStamp' : vm.debatefull.debate.timeStamp,
			  'turnCount' : turnCount
	  }

	  console.log(debate);
	  debateService.editDebate(vm.debatefull.debate.id, debate).then(function(res){
      console.log(vm.debatefull.debate)
	  })
  }

  vm.$onInit=function(){
	  vm.turnCalc(vm.debatefull.roster);
	  };

  vm.currentUser = function(){
    return authenticationService.currentUser()
  }

  vm.highlight = function(x,y){
    if(x===y){
      return "highlight";
    }else{
      return "";
    }
  }

}

app.component('argFormComponent',{
  template: `<div class="form-box">
              <form>
                <div>
                  <textarea id="arg-text" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" placeholder="{{$ctrl.argumentText}}" ng-model="$ctrl.newText" class="arg-text-form"></textarea>
                </div>
                <div>
                  <input id="args-submit" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" ng-disabled="$ctrl.turnId != $ctrl.currentUser.id" ng-click="$ctrl.instArg() ; $ctrl.turnCalc($ctrl.debatefull.roster)" type="submit" value="Send">
                </div>
                <div style="overflow: hidden; padding-right: .35em;">
                  <input type="text" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
                </div>
              </form>
            </div>`,

  controller : argFormController,

  bindings : {
	  			        debatefull: '<'
             }
});

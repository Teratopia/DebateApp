var app = angular.module('ngDebate');

function argumentMasterController(authenticationService, userService, formatService, argumentService,
		debateService, performanceService, pmService, $location) { // authenticationService
														// as parameter

  var vm = this;
  vm.cUser = "";
  vm.argumentText = 'type argument';
  vm.hrefText = 'insert URL';
  vm.userInfo = authenticationService.currentUser();
  vm.perfMember;
  vm.newText = "";
  vm.newRef = "";
  vm.performance = "";
  vm.allArgs = "";

  vm.classCode = null;
  vm.leftRight = null;
  vm.debatefull = "";

  var path = $location.path().split("/");
  debateService.indexDebateFull(path[path.length-1])
  .then(function(res) {
	  vm.cUser = authenticationService.currentUser();
	  vm.debatefull = res.data;
	  vm.debatefull.performance_members.forEach(function(pm){
		  if(pm.user.id === vm.cUser.id){
			  vm.perfMember = pm;
			  vm.performance = pm.performance;
		  }
	  })
	  console.log("in indexDebFull, debatefull=")
	  console.log(vm.debatefull)
	  console.log("in indexDebFull, debatefull.arguments=")
	  console.log(vm.debatefull.arguments);
	  vm.allArgs = vm.debatefull.arguments;
	  console.log("vm.allArgs=")
	  console.log(vm.allArgs)
	  
  });

  vm.assignClass = function(arg, performances){
    return formatService.getArgPerfClass(arg, performances);
  }

  vm.isRight=function(args, performances){
    return formatService.getArgNumClass(args, performances);
  }
  
  vm.isParticipant = function(){
	  	if (vm.debatefull && vm.cUser) {
		  var participating = false;
		  var l = vm.debatefull.roster.length;
		  for (var i = 0 ; i < l ; i++) {
			  if (vm.debatefull.roster[i].includes(vm.cUser.id)) {
				  participating = true;
				  break;
			  }
		  }
		  console.log("is participant:")
		  console.log(participating)
		  return participating;
	  	}
}
  
//  var path = $location.path().split("/");
//  debateService.indexDebateFull(path[path.length-1])
//  	.then(function(res) {
//  		vm.cUser = authenticationService.currentUser();
//  		vm.debatefull = res.data;
//  	});

 	  
 	  
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
		  console.log("in create arg, res.data = ")
		  console.log(res.data)
		  vm.allArgs.push(res.data);
	  })
  }


// turnCount is pulled from the database
  var turnCount = 0;


//  vm.$onInit=function(){
//	  turnCount = vm.debatefull.debate.turnCount;
//	  };
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

//  vm.$onInit=function(){
//	  vm.turnCalc(vm.debatefull.roster);
//	  };

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

app.component('argumentMasterComponent',{
  template: `
  
	<div class="row">
      <div class="col-md-12">
		<div class="args-display-screen">
		      <div ng-repeat="argument in $ctrl.allArgs">
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
		    </div>                           
		    </div>
           </div>
           <div class="row" ng-show="$ctrl.isParticipant()">
               <div class="col-md-12">
				<div class="form-box">
              		<form>
                		<div>
                  			<textarea id="arg-text" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" placeholder="{{$ctrl.argumentText}}" ng-model="$ctrl.newText" class="arg-text-form"></textarea>
                		</div>
                		<div>
                  			<input id="args-submit" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" ng-click="$ctrl.instArg() ; $ctrl.turnCalc($ctrl.debatefull.roster)" type="submit" value="Send">
                		</div>
                		<div style="overflow: hidden; padding-right: .35em;">
                  			<input type="text" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
                		</div>
              		</form>
            	</div>                           
          		</div>
         	</div>

`,

  controller : argumentMasterController

//ng-disabled="$ctrl.turnId != $ctrl.currentUser.id"
	
});

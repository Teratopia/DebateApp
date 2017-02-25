var app = angular.module('ngDebate');

function argumentMasterController(authenticationService, userService, formatService, argumentService,
		debateService, performanceService, pmService, $location, $timeout, $interval, $timeout) { // authenticationService
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

	function compare(a,b) {
		if (a.id < b.id)
			return -1;
		if (a.id > b.id)
			return 1;
		return 0;
	}

  var path = $location.path().split("/");
  debateService.indexDebateFull(path[path.length-1])
  .then(function(res) {
	  vm.cUser = authenticationService.currentUser();
	  vm.debatefull = res.data;
		vm.allperformances = vm.debatefull.debate.performances;
		vm.allperformances.sort(compare);
	  vm.allArgs = vm.debatefull.arguments;
	  vm.debatefull.performance_members.forEach(function(pm){
			try{
				console.log("Checking to see if user is a debate participant");
				if(vm.cUser.id !== undefined && pm.user.id === vm.cUser.id){
					vm.perfMember = pm;
					vm.performance = pm.performance;
				}
			} catch(e){
				console.error(e + ": likely cause is that no user is logged in and page is being viewed as a guest.");
			}
	  })
  });

  function updateArgs(){
	  debateService.indexDebateFull(path[path.length-1])
	  .then(function(res) {
		  vm.debatefull = res.data;
		  vm.allArgs = vm.debatefull.arguments;
	  })
  }

  $interval(updateArgs, 5000);

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
		  return participating;
	  	}
}


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

	  argumentService.createArgument(arg)
	  .then(function(res){
		  vm.newText = null;
		  vm.newRef = null;
		  vm.allArgs.push(res.data);
	  });
  }


// turnCount is pulled from the database
  var turnCount = 0;



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
               <p style="font-size:1.5em;">Live Debate Feed (viewing as {{$ctrl.guest()}}):</p>
           </div>
           <div class="col-md-12">
			   <ct-component debate-data="$ctrl.debateData"></ct-component>
           </div>
    	<div class="col-md-12">
			<div class="args-display-screen" scroll-glue>
		      <div ng-repeat="argument in $ctrl.allArgs | orderBy: 'timeStamp'">
		        <div class="row arg-holder">
		          <div ng-class="$ctrl.assignClass(argument, $ctrl.allperformances)">
		      	  	<div ng-class="$ctrl.isRight(argument, $ctrl.allperformances)">{{$index}}</div>
		              <div class="pad-arg-text">
		                {{argument.text}}
		                <div class="userNameWrapper">({{argument.user.username}})</div>
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
          			<div class="hrefInputWrapper">
            			<input type="text" ng-class="$ctrl.highlight($ctrl.turnId,$ctrl.currentUser.id)" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
          			</div>
        			</form>
      			</div>
    			</div>
   			</div>`,

		controller : argumentMasterController,
  
		bindings : {
		
		}

});

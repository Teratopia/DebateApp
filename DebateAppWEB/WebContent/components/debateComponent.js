var app = angular.module('ngDebate');

function debateController(authenticationService, $timeout) { // authenticationService as parameter
  var vm = this;

  var turnCount = 0;
  $timeout(function(){turnCount = vm.debatefull.debate.turnCount;},300);

  vm.turn = "unknown";
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
      	  console.log("Roster length at " + teamRow + " is " + roster[teamRow].length);
      	  console.log("Current memberIndex for " + teamRow + " is " + memberIndex[teamRow]);
      	  if(roster[teamRow].length!=0){
            if(memberIndex[teamRow] >= roster[teamRow].length){
              memberIndex[teamRow]=0;
            }
        	  console.log("Inside first if and countDown is " + countDown);
            if(countDown<1){
              console.log("INSIDE COUNTDOWN IF");
              turnCount++;
              vm.turn = roster[teamRow][memberIndex[teamRow]];
              console.log("CURRENT TURN IS USER: ");
              console.log(roster[teamRow][memberIndex[teamRow]]);
              console.log(countDown);
              flag = false;
            }
            memberIndex[teamRow]++;
            countDown--;
            }
          }
        }
        console.log("Value of vm.turn is: " + vm.turn);
    });
  }

  vm.$onInit=function(){
	  vm.turnCalc(vm.debatefull.roster);
	  };

  vm.currentUser = authenticationService.currentUser();

  vm.guest = function(){
	  if(vm.currentUser !== undefined){
	    if(vm.currentUser.name){
	      return vm.currentUser.id;
	    }else{
	      return "guest";
	    }
	  }
  }
  
  vm.canComment = function(){
	  console.log('in canComment. pm:')
	  console.log(vm.debatefull.performance_members);
	  console.log('in canComment. cu:')
	  console.log(vm.currentUser);
	  var flag;
	  
	  if(vm.debatefull.performance_members === undefined
			  || vm.currentUser === undefined){
		  console.log("undefined")
		  return false;
	  } else {
		  if(vm.debatefull.performance_members.length < 2){
			  if(vm.debatefull.performance_members[0].id === vm.currentUser.id){
				  console.log("in <2. p_m[0] =");
				  console.log(vm.debatefull.performance_members[0])
				  flag = false;
			  } else {
				  flag = true; 
			  }
		  }
		  
		  vm.debatefull.performance_members.forEach(function(pm){
			  if(pm.user.id === vm.currentUser.id){
				  console.log("in if ===. pm.user =");
				  console.log(pm.user)
				  flag = false;
			  }
		  })
		  console.log(flag);
		  
		  if(flag === true){
			  return true;
		  } else {
			  return false;
		  }
	  }
  }

}

app.component('debateComponent',{
  template: `<nav-component></nav-component>
            <div class="container-fluid">
               <div class="row">
                   <div class="col-lg-7 col-md-7" style="padding:0px;">
                       <div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <p style="font-size:1.5em;">{{$ctrl.debatefull.debate.issue.title}}</p>
                                   </div>
                               </div>
                               <debate-info-component debate="$ctrl.debatefull.debate"></debate-info-component>
                           </div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <p style="font-size:1em;">Commentary:</p>
                                       <div class="comments-display-screen"></div>
                                   </div>
                               </div>
                               <div class="row">
                                   <div class="col-md-12" ng-show="$ctrl.canComment()" >
                                       <com-form-component></com-form-component>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-5 col-md-5">
                       <div class="row">
                           <div class="col-md-12">
                               <p style="font-size:1.5em;">Live Debate Feed (viewing as {{$ctrl.guest()}}):</p>
                           </div>
                           <div class="col-md-12">
                               <div style="/*float:left;*//*width:20px;*/min-height:20px;margin:0px 0px 10px 0px;background:rgb(30,30,30);background:rgba(248,19,4,0.5);/*-webkit-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*-moz-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*/"></div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                                <debate-argument-component debatefull="$ctrl.debatefull"></debate-argument-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                               <arg-form-component ng-show="$ctrl.getCurrentUser === {{$ctrl.turn}}" debatefull="$ctrl.debatefull"></arg-form-component>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`,

  controller : debateController,

  bindings : {
                debatefull: '<'
              }
});

var app = angular.module('ngDebate');

function debateController(authenticationService, $timeout) { // authenticationService
																// as parameter
  var vm = this;
  vm.currentUser = authenticationService.currentUser();

  vm.guest = function(){
    if(vm.currentUser === undefined){
        return "guest";
    }else{
        return vm.currentUser.username;
    }
  }

  // vm.canComment = function(){
	//   var flag;
  //
  // 	  if(vm.debatefull.performance_members === undefined || vm.currentUser === undefined || authenticationService.isLoggedIn() === false){
  // 		  return false;
  // 	  } else {
  // 		  if(vm.debatefull.performance_members.length < 2){
  // 			  if(vm.debatefull.performance_members[0].id === vm.currentUser.id){
  // 				  flag = false;
  // 			  } else {
  // 				  flag = true;
  // 			  }
	// 	  }
  //
	// 	  vm.debatefull.performance_members.forEach(function(pm){
	// 		  if(pm.user.id === vm.currentUser.id){
	// 			  console.log("in if ===. pm.user =");
	// 			  console.log(pm.user)
	// 			  flag = false;
	// 		  }
	// 	  })
	// 	  console.log(flag);
  //
	// 	  if(flag === true){
	// 		  return true;
	// 	  } else {
	// 		  return false;
	// 	  }
	//   }
  // }

  vm.isParticipant = function(){
    if(vm.currentUser != undefined){
      vm.debatefull.roster.forEach(function(team){
        team.forEach(function(member){
          if(member===vm.currentUser.id){
            return true;
          }
        });
      });
    }
    return false;
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
                                       <p style="font-size:1.5em;height:1.48em">{{$ctrl.debatefull.debate.issue.title}}</p>
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
								<ct-component debatefull = "$ctrl.debatefull"></ct-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                                <debate-argument-component debatefull="$ctrl.debatefull"></debate-argument-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                               <arg-form-component ng-show="$ctrl.isParticipant()" debatefull="$ctrl.debatefull"></arg-form-component>
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

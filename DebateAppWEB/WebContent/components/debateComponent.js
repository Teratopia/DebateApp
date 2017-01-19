var app = angular.module('ngDebate');

function debateController(authenticationService, $timeout, $scope, debateService, $route, $location) { // authenticationService
																// as parameter
  var vm = this;
  vm.currentUser = authenticationService.currentUser();
  vm.allComments;
  vm.ddLoaded = false;

  vm.isInDebate = false;

  vm.debateData = {
		  debate : {
			  performances : [],
		  },
		  performance_members : [],
		  roster : [],
  }

  vm.guest = function(){
    if(vm.currentUser === undefined){
        return "guest";
    }else{
        return vm.currentUser.username;
    }
  }

  vm.canComment = function(){
	  return vm.isParticipant();
  }

  vm.isParticipant = function(){
	  	if (vm.debateData && vm.currentUser) {
		  var participating = false;
		  var l = vm.debateData.roster.length;
		  for (var i = 0 ; i < l ; i++) {
			  if (vm.debateData.roster[i].includes(vm.currentUser.id)) {
				  participating = true;
				  break;
			  }
		  }
		  return participating;
	  	}
  }

  var path = $location.path().split("/");
  debateService.indexDebateFull(path[path.length-1])
  	.then(function(res) {
  		vm.debateData = res.data;
  		console.log("vm.debateData")
  		console.log(vm.debateData);
  		vm.ddLoaded = true;
  	});

}

app.component('debateComponent',{
  template: `<nav-component></nav-component>
            <div class="container-fluid" ng-if="$ctrl.ddLoaded === true">
               <div class="row">
                   <div class="col-lg-7 col-md-7" style="padding:0px;">
                       <div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <div style="height:2.5em">
                                           <p style="font-size:1.5em">{{$ctrl.debateData.debate.issue.title}}</p>
                                       </div>
                                   </div>
                               </div>
                               <debate-info-component debate="$ctrl.debateData.debate"></debate-info-component>
                           </div>
                           <comment-master-component debate-data="$ctrl.debateData"></comment-master-component>

                       </div>
                   </div>
                   <div class="col-lg-5 col-md-5">
                       <div class="row">
                           <div class="col-md-12">
                               <p style="font-size:1.5em;">Live Debate Feed (viewing as {{$ctrl.guest()}}):</p>
                           </div>
                           <div class="col-md-12">
								<ct-component debate-data="$ctrl.debateData"></ct-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                                <debate-argument-component debatefull="$ctrl.debateData"></debate-argument-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                               <arg-form-component ng-show="$ctrl.isParticipant()" debatefull="$ctrl.debateData"></arg-form-component>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`,

  controller : debateController

});

//<div class="col-md-12">
//<div class="row">
//    <div class="col-md-12">
//        <p style="font-size:1em;">Commentary:</p>
//        <debate-comment-component debatefull="$ctrl.debatefull" allComments="$ctrl.allComments"></debate-comment-component>
//    </div>
//</div>
//<div class="row">
//    <div class="col-md-12" ng-show="!$ctrl.isParticipant()" >
//        <com-form-component ng-show="!$ctrl.isParticipant()" allComments="$ctrl.allComments" debatefull="$ctrl.debatefull"></com-form-component>
//    </div>
//</div>

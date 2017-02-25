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
	  				<div class="col-lg-5 col-md-5">
	  					<div class="col-md-12 hidden-md hidden-lg hidden-xl">
	  						<debate-info-component title="$ctrl.debateData.debate.issue.title" debate="$ctrl.debateData.debate"></debate-info-component>
	  					</div>
	  					<argument-master-component></argument-master-component>
	  				</div>
                    <div class="col-lg-7 col-md-7" style="padding:0px;">
                        <div style="overflow-y:auto;">
                       		<div class="col-md-12 hidden-xs hidden-sm">
	  							<debate-info-component title="$ctrl.debateData.debate.issue.title" debate="$ctrl.debateData.debate"></debate-info-component>
                           	</div>
                           	<comment-master-component debate-data="$ctrl.debateData"></comment-master-component>
                       	</div>
                   	</div>
               	</div>
           	</div>`,

    controller : debateController

});


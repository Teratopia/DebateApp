angular.module('ngDebate').component("profileComponent", {

	
	template : `
	<nav-component></nav-component>
		<h2>{{$ctrl.user.username}}</h2>
		
		<h4 ng-show="$ctrl.user.teams.length > 0">Your Teams:</h4>
		<p ng-repeat = "team in $ctrl.user.teams" ng-show="$ctrl.user.teams.length > 0">{{team.name}}</p>
		<br>
		<h4>Your Debates:</h4>
		<p ng-repeat= "perf in $ctrl.performances" ng-show="$ctrl.performances.length > 0">{{perf.debate.issue.title}}</p>

	`,
	controller : function(authenticationService, performanceService){
		var vm = this;
		
		vm.user = authenticationService.currentUser();
		vm.performances = performanceService.indexPerformancesByUserId(vm.user.id);
		
		
	}
	
});
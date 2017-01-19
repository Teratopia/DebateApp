angular.module('ngDebate').component("profileComponent", {

	
	template : `
	<nav-component></nav-component>
		<h2>{{$ctrl.user.username}}'s profile:</h2>
		<br>
		<p>There's really not much to show here yet, but dont worry, all your stats will show up soon!</p>
		
		

	`,
	controller : function(authenticationService, performanceService){
		var vm = this;
		
		vm.user = authenticationService.currentUser();
		
	}
	
});
angular.module('ngDebate').component("profileComponent", {

	
	template : `
	<nav-component></nav-component>
		<h2>{{$ctrl.user.username}}'s profile</h2>
		<h5>Total number of debates: {{$ctrl.debs.length}}</h5>
		<h5>Alignment: {{$ctrl.lawfulness}} {{$ctrl.goodness}}</h5>
		<br>
		<h3>Your Debates:</h3>
		
		<v-accordion class="vAccordion--default">
        <v-pane ng-repeat="deb in $ctrl.debs">
          <v-pane-header ng-click="hideButtons = !hideButtons">
			{{deb.issue.title}} 
          </v-pane-header>
          <v-pane-content>
          <span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()"><a href="#!/join/{{deb.id}}"><button>Join</button></a></span>
			<a href="#!/debate/{{deb.id}}"><button>View</button></a>
                                  <h4>Description: </h4>
                                 	{{deb.issue.description}}<br>
                                 	<span ng-show="deb.issue.linkRef"><h4>Reference:</h4>
									<a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a><br></span>
									<h4>Categories: </h4>
                                  	<span ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </span>
                                  <h4>Stances:</h4>
                                  <ol>
                                  	<li ng-repeat="per in deb.performances">{{per.stance}}</li>
                                  </ol>
          </v-pane-content>
        </v-pane>
      </v-accordion>

	`,
	controller : function(authenticationService, performanceService, debateService){
		var vm = this;
		
		vm.user = authenticationService.currentUser();
		vm.goodness;
		vm.lawfulness;
		vm.winCount = 0;
		vm.debs;
		
		if(vm.user.goodevil < 4){
			vm.goodness = "Evil";
		} else if (vm.user.goodevil > 6){
			vm.goodness = "Good";
		} else {
			vm.goodness = "Neutral";
		}
		
		if(vm.user.lawfulchaotic < 4){
			vm.lawfulness = "Chaotic";
		} else if (vm.user.lawfulchaotic > 6){
			vm.lawfulness = "Lawful";
		} else {
			vm.lawfulness = "True";
		}
		
		debateService.indexByUser(vm.user.id).then(function(res){
			console.log("IN .THEN. RES DATA=");
			console.log(res.data);
				    vm.debs = res.data;
		})
		
	}
	
});
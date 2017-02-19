var app = angular.module('ngDebate');

function debateInfoController(authenticationService, issueService, formatService) { // authenticationService as parameter
  var vm = this;
  var popCategories = function(x){
      return issueService.getIssue(x);
  }

  vm.getPerformanceClass = function(performance, performances){
    return formatService.getPerformanceClass(performance, performances);
  }

  vm.sortPerformances = function(performances){
    return performances.sort(compare)
  }

	function compare(a,b) {
		if (a.id < b.id)
			return -1;
		if (a.id > b.id)
			return 1;
		return 0;
	}
}

app.component('debateInfoComponent',{
  template: `<v-accordion class="vAccordion--default" multiple>
              <v-pane expanded>
                <v-pane-header>
                  Description
                </v-pane-header>
                <v-pane-content>
                  <div>{{$ctrl.debate.issue.linkRef}} {{$ctrl.testval}}</div>
                  <div>{{$ctrl.debate.issue.description}}</div>
                  <div ng-repeat="category in popCategories($ctrl.debate.issue.id)">{{category}}</div>
                </v-pane-content>
              </v-pane>
              <v-pane expanded>
                <v-pane-header>
                  Stances
                </v-pane-header>
                <v-pane-content>
                  <div ng-repeat="performance in $ctrl.sortPerformances($ctrl.debate.performances)">
	  				<div class="row">
                    	<div ng-class="$ctrl.getPerformanceClass($index)" class="performanceWrapper">
                    		<div class="pad-arg-text">
                      			{{performance.team.name}}: {{performance.stance}}
                    		</div>
	  					</div>
          	         </div>
                  </div>
                </v-pane-content>
              </v-pane>
            </v-accordion>`,

  controller : debateInfoController,

  bindings : {
	  			        debate: '<',
	  			        testval: '='
              }
});

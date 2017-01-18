var app = angular.module('ngDebate');

function debateInfoController(authenticationService, issueService, formatService) { // authenticationService as parameter
  var vm = this;
  var popCategories = function(x){
      return issueService.getIssue(x);
  }

  vm.getPerformanceClass = function(performance, performances){
    return formatService.getPerformanceClass(performance, performances);
  }
}

app.component('debateInfoComponent',{
  template: `<v-accordion class="vAccordion--default" multiple>
              <v-pane>
                <v-pane-header>
                  Description
                </v-pane-header>
                <v-pane-content>
                  <div>{{$ctrl.debate.issue.linkRef}}</div>
                  <div>{{$ctrl.debate.issue.description}}</div>
                  <div ng-repeat="category in popCategories($ctrl.debate.issue.id)">{{category}}</div>
                </v-pane-content>
              </v-pane>
              <v-pane>
                <v-pane-header>
                  Stances
                </v-pane-header>
                <v-pane-content>
                  <div ng-repeat="performance in $ctrl.debate.performances">
	  				<div class="row">
                    	<div ng-class="$ctrl.getPerformanceClass($index)" style="width:90%;margin:0px 0px 10px 0px">
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
	  			        debate: '<'
              }
});

var app = angular.module('ngDebate');

function debateInfoController(authenticationService, issueService, formatService) { // authenticationService as parameter
  var vm = this;
  var popCategories = function(x){
      return issueService.getIssue(x);
  }

  vm.getPerformanceClass = function(arg){
    return formatService.getPerformanceClass(arg);
  }
}

app.component('debateInfoComponent',{
  template: `<v-accordion class="vAccordion--default" multiple>
              <v-pane>
                <v-pane-header>
                  Description
                </v-pane-header>
                <v-pane-content>
                  <div>{{$ctrl.performances[0].debate.issue.linkRef}}</div>
                  <div>{{$ctrl.performances[0].debate.issue.description}}</div>
                  <div ng-repeat="category in popCategories($ctrl.performances[0].debate.issue.id)">{{category}}</div>
                </v-pane-content>
              </v-pane>
              <v-pane>
                <v-pane-header>
                  Stances
                </v-pane-header>
                <v-pane-content>
                  <div ng-repeat="performance in $ctrl.performances">
                    <span ng-class="$ctrl.getPerformanceClass($index)">
                      {{performance.team.name}}: {{performance.stance}}
                    </span>
                  </div>
                </v-pane-content>
              </v-pane>
            </v-accordion>`,

  controller : debateInfoController,

  bindings : {
	  			performances: '<'
              }
});

//performances[0].debate.issue.description

//"performance": {
//    "id": 1,
//    "debate": {
//      "id": 1,
//      "rules": {
//        "id": 1,
//        "argPerTurn": 2,
//        "charsPerArg": 256,
//        "timeLimit": 86165,
//        "openingStatements": false,
//        "referencesOn": false,
//        "winValue": 100,
//        "publicFlag": false,
//        "viewersFlag": false,
//        "commentsView": false,
//        "privateDebate": true
//      },
//      "issue": {
//        "@id": 1,
//        "id": 1,
//        "title": "Biggie vs Tupac",
//        "description": null,
//        "linkRef": null
//      },
//      "timeStamp": 1484257476000
//    },
//    "team": {
//      "id": 1,
//      "name": "testTeam1"
//    },
//    "stance": "Tupac > Biggie"

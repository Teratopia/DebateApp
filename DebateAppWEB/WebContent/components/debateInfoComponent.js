var app = angular.module('ngDebate');

function debateInfoController(authenticationService) { // authenticationService as parameter
  var vm = this;

}

app.component('debateInfoComponent',{
  template: `<v-accordion class="vAccordion--default" multiple>
              <v-pane>
                <v-pane-header>
                  Description:
                </v-pane-header>
                <v-pane-content>
                  <div>INSERT HREF HERE!</div>
                  <div>INSERT DESCRIPTION HERE!</div>
                  <div>INSERT LIST OF CATEGORIES HERE!</div>
                </v-pane-content>
              </v-pane>
              <v-pane>
                <v-pane-header>
                  Stances:
                </v-pane-header>
                <v-pane-content>
                  SEE END OF CODE FOR NG-REPEAT FOR STANCES
                </v-pane-content>
              </v-pane>
            </v-accordion>`,

  controller : debateInfoController,
});

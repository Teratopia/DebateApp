var app = angular.module('ngDebate');

function issuesController(authenticationService) { // authenticationService as parameter
  var vm = this;

}

app.component('issuesComponent',{
  template: `<nav-component></nav-component>
             <v-accordion class="vAccordion--default">
              <v-pane>
                <v-pane-header>
                  Cramer vs Cramer: Which Cramer is the best Cramer
                </v-pane-header>
                <v-pane-content>
                                  <v-accordion class="vAccordion--default" multiple>
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
                                  </v-accordion>
                </v-pane-content>
              </v-pane>
              <v-pane>
                <v-pane-header>
                  Chick or Egg: Which should be first as a source of protein
                </v-pane-header>
                <v-pane-content>
                                  <v-accordion class="vAccordion--default" multiple>
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
                                  </v-accordion>
                </v-pane-content>
              </v-pane>
              <v-pane>
                <v-pane-header>
                  Does this make my ass look big?
                </v-pane-header>
                <v-pane-content>
                                  <v-accordion class="vAccordion--default" multiple>
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
                                  </v-accordion>
                </v-pane-content>
              </v-pane>
            </v-accordion>`,

  controller : issuesController,
});

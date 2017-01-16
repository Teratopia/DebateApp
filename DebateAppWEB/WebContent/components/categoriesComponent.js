angular.module('ngDebate').component("categoriesComponent", {

	template: `<nav-component></nav-component>
        <v-accordion class="vAccordion--default">
         <v-pane ng-repeat="deb in $ctrl.debates">
           <v-pane-header ng-click="hideButtons = !hideButtons">
			{{deb.issue.title}} 
            <button href="" ng-show="hideButtons">Join</button>
			<button href="" ng-show="hideButtons">View</button>
           </v-pane-header>
           <v-pane-content>
                             <v-accordion class="vAccordion--default" multiple>
                               <v-pane>
                                 <v-pane-header>
                                   Description:
                                 </v-pane-header>
                                 <v-pane-content>
                                  	{{deb.issue.description}}<br>
									<a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a><br>
                                   	<span ng-repeat="cat in deb.issue.categories">{{cat.title}} </span>
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
	
	controller : function(categoryService, issueService, debateService){
		
		console.log('in catComp');
		
		var vm = this;
		vm.cats = categoryService.indexCategories();
		vm.issues;
		vm.debates;
		issueService.indexIssues()
			.then(function(res) {
			    console.log("IN .THEN");
			    vm.issues = res.data;
			})
		
		debateService.indexDebates()
			.then(function(res) {
				    console.log("IN .THEN");
				    vm.debates = res.data;
				})	
		
		console.log(vm.issues);
		
		vm.joinDebate = function(){
			console.log("joindebate");
		}

		vm.viewDebate = function(){
			console.log("joindebate");
		}
	
		vm.createDebate = function(){
			console.log("createDebate");
		}
	 } });

angular.module('ngDebate').component("categoriesComponent", {

	template: `<nav-component></nav-component>
	
		<h5>Filter by:</h5>
		<column ng-repeat="cat in $ctrl.cats"> {{cat.title}} 
		<input type="checkbox" ng-click="$ctrl.filterDebates(cat.id)"></column>
		<br><br>
	
        <v-accordion class="vAccordion--default">
         <v-pane ng-repeat="deb in $ctrl.debates">
           <v-pane-header ng-click="hideButtons = !hideButtons">
			{{deb.issue.title}} 
           </v-pane-header>
           <v-pane-content>
           <a href="#!/join/{{deb.id}}"><button>Join {{deb.id}}</button></a>
			<button href="">View</button>
                                   <h4>Description: </h4>
                                  	{{deb.issue.description}}<br>
                                  	<span ng-show="deb.issue.linkRef"><h4>Reference:</h4>
									<a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a><br></span>
									<h4>Categories: </h4>
                                   	<span ng-repeat="cat in deb.issue.categories">{{cat.title}} </span>
                                   <h4>Stances:</h4>
                                   <ol>
                                   	<li ng-repeat="per in deb.performances">{{per.stance}}</li>
                                   </ol>
           </v-pane-content>
         </v-pane>
       </v-accordion>`,
	
	controller : function(categoryService, issueService, debateService){
		
		console.log('in catComp');
		
		
		
		var vm = this;
		vm.cats;
		vm.issues;
		vm.allDebates;
		vm.debates;
		vm.filterIds = [];
		
		categoryService.indexCategories()
			.then(function(res) {
				    console.log("IN .THEN");
				    vm.cats = res.data;
				})
		
		issueService.indexIssues()
			.then(function(res) {
			    console.log("IN .THEN");
			    vm.issues = res.data;
			})
		
		debateService.indexDebates()
			.then(function(res) {
				    console.log("IN .THEN");
				    vm.allDebates = res.data;
				    vm.debates = res.data;
				    console.log(vm.debates);
				})	
		
		vm.filterDebates = function(id){
			var index = 0;
			var found = false;
			
			vm.filterIds.forEach(function(cat){
				if(cat === id){
					found = true;
				}
				if(found === false){
				index++;
				}
			})
			
			if(found){
				console.log("in found");
				console.log(index);
				vm.filterIds.splice(index, 1);
			} else {
				console.log("in else found");
				console.log(index);
				vm.filterIds.push(id);
			}
			
			var filteredDebates = [];
			vm.allDebates.forEach(function(deb){
				var there = false;
				if(there === false){
				deb.issue.categories.forEach(function(cat){
					if(there === false){
					vm.filterIds.forEach(function(id){
						if(there === false){
							if(cat.id === id){
								filteredDebates.push(deb);
								there = true;
							}
						}
					});
					}
				});
				}
			});
			
			vm.debates = filteredDebates;
			
		}
				
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

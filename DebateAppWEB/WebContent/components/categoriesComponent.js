angular.module('ngDebate').component("categoriesComponent", {

	template: `<nav-component></nav-component>

		<h5>Filter by:</h5>
		<column ng-repeat="cat in $ctrl.cats | orderBy:'title'"> {{cat.title}}
		<input type="checkbox" ng-click="$ctrl.filterDebates(cat)">&nbsp&nbsp</column>
		<br><br>
	      <v-accordion class="vAccordion--default">
	       <v-pane ng-repeat="deb in $ctrl.debates">
	         <v-pane-header ng-click="hideButtons = !hideButtons" class="category-header">
					 	 <div class="cat-wrapper">
							 	<div class="category-left">
								 	<img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout" style="height:80px;float:left;border-radius:5px;border:1px solid rgb(169,169,169);">
							 	</div>
	 					 		<div class="category-right">
	 								<h4 style="margin-top: 0px;margin-bottom: 0px;">Issue: {{deb.issue.title}}</h4>
									<h5 style="margin:5px 0px;float:left;position:relative">Description: {{deb.issue.description}}</h5>
								</div>
				 	   </div>
						 <span ng-show="deb.issue.linkRef">
	         </v-pane-header>
	         <v-pane-content>
	         	<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()">
							<a href="#!/join/{{deb.id}}"><button>Join</button></a></span>
							<a href="#!/debate/{{deb.id}}"><button>View</button>
							</a>
							<h4>Reference:</h4>
							<a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a><br></span>
							<h4>Categories: </h4><span ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </span>
	            <h4>Stances:</h4>
		            <ol>
		            	<li ng-repeat="per in deb.performances">{{per.stance}}</li>
		            </ol>
	         </v-pane-content>
	       </v-pane>
	     </v-accordion>`,

	controller : function(categoryService, issueService, debateService, authenticationService){

		var vm = this;
		vm.logged = function(){
			return authenticationService.isLoggedIn();
		}
		vm.cats;
		vm.issues;
		vm.allDebates;
		vm.debates;
		vm.filterCats = [];

		categoryService.indexCategories()
			.then(function(res) {
				    vm.cats = res.data;
				    console.log("IN .indexCategories");
				    console.log(vm.cats);
				})

		issueService.indexIssues()
			.then(function(res) {
			    console.log("IN .indexIssues");
			    vm.issues = res.data;
			    console.log(vm.issues);
			})

		debateService.indexDebates()
			.then(function(res) {
				    console.log("IN .THEN");
				    vm.allDebates = res.data;
				    vm.debates = res.data;
				    console.log(vm.debates);
				})

		vm.getCats = function(issCats){
			var catArray = [];
			issCats.forEach(function(ic1){
				vm.cats.forEach(function(cat){
					cat.issCats.forEach(function(ic2){
						if(ic1.id === ic2.id){
							catArray.push(cat);
						}
					})
				})
			});
			return catArray;
		}

		vm.filterDebates = function(cat1){
			var index = 0;
			var found = false;

			vm.filterCats.forEach(function(cat2){
				if(cat1.id === cat2.id){
					found = true;
				}
				if(found === false){
					index++;
				}
			})

			if(found === true){
				console.log("in found");
				console.log(index);
				vm.filterCats.splice(index, 1);
			} else {
				console.log("in else found");
				console.log(index);
				vm.filterCats.push(cat1);
			}

			var filteredDebates = [];

			vm.allDebates.forEach(function(deb){
				var there = false;
				if(there === false){
					deb.issue.issCats.forEach(function(ic1){
						if(there === false){
							vm.filterCats.forEach(function(cat){
								if(there === false){
									cat.issCats.forEach(function(ic2){
										if(ic2.id === ic1.id){
											there = true;
											filteredDebates.push(deb);
										}
									})
								}
							})
						}
					})
				}
			})
			vm.debates = filteredDebates;

			if(vm.filterCats.length === 0){
				vm.debates = vm.allDebates;
			}

//			vm.allDebates.forEach(function(deb){
//				var there = false;
//				if(there === false && deb.issue.issCats !== undefined && deb.issue.issCats.length > 0){
//					console.log("1a");
//					deb.issue.issCats.forEach(function(ic){
//						if(there === false){
//							console.log("2a");
//							vm.filterIds.forEach(function(id){
//								if(there === false){
//									console.log("3a");
//									console.log(deb);
//									console.log(ic);
//									if(ic.category.id === id){
//										console.log("4a there!")
//										console.log(deb);
//										filteredDebates.push(deb);
//										there = true;
//									}
//								}
//							})
//						}
//					})
//				}
//			})

//			vm.allDebates.forEach(function(deb){
//				var there = false;
//				if(there === false && deb.issue !== undefined && deb.issue.categories !== undefined){
//				deb.issue.categories.forEach(function(cat){
//					if(there === false){
//					vm.filterIds.forEach(function(id){
//						if(there === false){
//							if(cat.id === id){
//								filteredDebates.push(deb);
//								there = true;
//							}
//						}
//					});
//					}
//				});
//				}
//			});


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

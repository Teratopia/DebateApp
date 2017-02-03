angular.module('ngDebate').component("categoriesComponent", {

	template: `<nav-component></nav-component>

		<h5 style="margin:10px">Filter by:</h5>
		<column style="padding:10px" ng-repeat="cat in $ctrl.cats | orderBy:'title'"> {{cat.title}}
		<input type="checkbox" ng-click="$ctrl.filterDebates(cat)">&nbsp&nbsp</column>
		<br><br>
		<div class="container-fluid" style="padding:0;margin:0">
	    <div class="row" style="padding:0;margin:0">
		      <v-accordion class="vAccordion--default">
						<div class="col-sm-12 col-md-6">
							<v-pane ng-repeat="deb in $ctrl.debates" ng-if="$index<$ctrl.debates.length/2">
								<v-pane-header ng-click="hideButtons = !hideButtons | " class="category-header" >
									<div class="cat-wrapper">
										<div class="category-left">
											<img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout" style="height:80px;float:left;border-radius:5px;border:1px solid rgb(169,169,169);">
										</div>
										<div class="category-right">
											<h4 style="margin-top: 0px;margin-bottom: 0px;">{{$index}} Issue: {{deb.issue.title}}</h4>
											<h5 style="margin:5px 0px;float:left;position:relative">Description: {{deb.issue.description}}</h5>
										</div>
									</div>
								</v-pane-header>
								<v-pane-content>
									<div style="padding: 0px 15px;margin-bottom: -10px;border-bottom: 2px solid #00909b;">
										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()">
											<a href="#!/join/{{deb.id}}"><button style="margin: 5px 0px;">Join</button></a>
										</span>
										<a href="#!/debate/{{deb.id}}">
											<button style="margin: 5px 0px;">View</button>
										</a>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4 style="margin:5px 0px 2px 0px;">Reference: </h4>
											</div>
											<div class="desc-right">
												<div style="display: inline-block; margin: 0px 7px 0px 1px;" ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)"><a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a></div>
											</div>
										</div>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4 style="margin:5px 0px 2px 0px;">Categories: </h4>
											</div>
											<div class="desc-right">
												<div style="display: inline-block; margin: 0px 7px 0px 1px;" ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </div>
											</div>
										</div>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4 style="margin:5px 0px 2px 0px;">Stances: </h4>
											</div>
											<div class="desc-right">
												<div style="display: inline-block; margin: 0px 7px 0px 1px;">
													<ol style="-webkit-padding-start: 17px">
														<li ng-repeat="per in deb.performances">{{per.stance}}</li>
													</ol>
												</div>
											</div>
										</div>

									</div>
								</v-pane-content>
			     		</v-pane>
						 </div>
	 						<div class="col-sm-12 col-md-6">
	 							<v-pane ng-repeat="deb in $ctrl.debates" ng-if="$index>=$ctrl.debates.length/2">
	 								<v-pane-header ng-click="hideButtons = !hideButtons | " class="category-header" >
	 									<div class="cat-wrapper">
	 										<div class="category-left">
	 											<img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout" style="height:80px;float:left;border-radius:5px;border:1px solid rgb(169,169,169);">
	 										</div>
	 										<div class="category-right">
	 											<h4 style="margin-top: 0px;margin-bottom: 0px;">{{$index}} Issue: {{deb.issue.title}}</h4>
	 											<h5 style="margin:5px 0px;float:left;position:relative">Description: {{deb.issue.description}}</h5>
	 										</div>
	 									</div>
	 								</v-pane-header>
	 								<v-pane-content>
	 									<div style="padding: 0px 15px;margin-bottom: -10px;border-bottom: 2px solid #00909b;">
	 										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()">
	 											<a href="#!/join/{{deb.id}}"><button style="margin: 5px 0px;">Join</button></a>
	 										</span>
	 										<a href="#!/debate/{{deb.id}}">
	 											<button style="margin: 5px 0px;">View</button>
	 										</a>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4 style="margin:5px 0px 2px 0px;">Reference: </h4>
												</div>
												<div class="desc-right">
													<div style="display: inline-block; margin: 0px 7px 0px 1px;" ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)"><a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a></div>
												</div>
											</div>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4 style="margin:5px 0px 2px 0px;">Categories: </h4>
												</div>
												<div class="desc-right">
													<div style="display: inline-block; margin: 0px 7px 0px 1px;" ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </div>
												</div>
											</div>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4 style="margin:5px 0px 2px 0px;">Stances: </h4>
												</div>
												<div class="desc-right">
													<div style="display: inline-block; margin: 0px 7px 0px 1px;">
														<ol style="-webkit-padding-start: 17px">
															<li ng-repeat="per in deb.performances">{{per.stance}}</li>
														</ol>
													</div>
												</div>
											</div>

	 									</div>
	 								</v-pane-content>
	 			     		</v-pane>
	 						 </div>
			     </v-accordion>
			 </div>
		 </div>`,

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

//			if(vm.filterCats.length === 0) { vm.debates = vm.allDebates; }
// vm.allDebates.forEach(
// function(deb){ var there = false;
									// if(there === false && deb.issue.issCats
									// !== unde
// fined &&
																// deb.issue.issCats
// .length
																							// >
																							// 0){
																							// console.log("1a");
// deb.issue.issCats.forEach(fun
// ction(ic){ if(there
// === false){ console.log("2a");
// vm.filterIds.forEach(funct
// ion(id){ if(there ==
// = false){ console.
// log("3a"); consol
// e.log(deb); console.log(ic)
// ; if(ic.category.id ===
													// id
// ){
															// console.log("4a
// there!")
														// console.log(deb);
// filteredDebat
// es.push(deb);

//									// there = tru
// e;
// }
// }
//							// }) } }) } })
// vm.allDebates.forEach(
// function(deb){ var there = false;
									// if(there === false && deb.issue !==
									// undefined
// &&
																// deb.issue.categories
																// !==
																// undefined){
																// deb.
// issue.categories.forEach(fun
// ction(cat){ if(there ===
												// false){
// vm.filterIds.forEach(fun
// ction(id){ if(there
// === false){ if(cat.id === id
// ){ filteredDeb
// ates.push(d
// eb);
// there
// = true; /
// / }
//						// }
//});
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
	 }
 });

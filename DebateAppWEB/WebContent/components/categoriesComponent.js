angular.module('ngDebate').component("categoriesComponent", {

	template: `<nav-component></nav-component>

		<h5 id="filterHeader">Filter by:</h5>
			<div class="col-lg-12">
				<category ng-repeat="cat in $ctrl.cats | orderBy:'title'">
				    <div class="inline-field">
				        <label for="{{cat.title}}">{{cat.title}} </label>
				        <input id="{{cat.title}}" type="checkbox" ng-click="$ctrl.addCat(cat)">
				    </div>
				</category>
			</div>
		<br><br>
		<div class="container-fluid noPadNoMarg">
	    <div class="row noPadNoMarg">
		      <v-accordion class="vAccordion--default">
						<div class="col-sm-12 col-md-6">
							<v-pane ng-repeat="deb in $ctrl.debates" ng-if="$index<$ctrl.debates.length/2">
								<v-pane-header ng-click="hideButtons = !hideButtons" class="category-header" >
									<div class="cat-wrapper">
										<div class="category-left">
											<img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout" class="quibPaneImage">
										</div>
										<div class="category-right">
											<h4> Issue: <i>{{deb.issue.title}}</i></h4>
											<h5>Description: <i>{{deb.issue.description}}</i></h5>
										</div>
									</div>
								</v-pane-header>
								<v-pane-content>
									<div class="vPaneContentWrapper">
										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged() && $ctrl.isNotParticipant(deb.performances.perfMembers)">
											<a href="#!/join/{{deb.id}}"><button class="quibButton">Join</button></a>
										</span>
										<a href="#!/debate/{{deb.id}}">
											<button class="quibButton">View</button>
										</a>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4>Reference: </h4>
											</div>
											<div class="desc-right">
												<div ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)"><a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a></div>
											</div>
										</div>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4>Categories: </h4>
											</div>
											<div class="desc-right">
												<div ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </div>
											</div>
										</div>

										<div class="desc-wrapper">
											<div class="desc-left">
												<h4>Stances: </h4>
											</div>
											<div class="desc-right">
												<div>
													<ol>
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
									<v-pane-header ng-click="hideButtons = !hideButtons" class="category-header" >
										<div class="cat-wrapper">
											<div class="category-left">
												<img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout" class="quibPaneImage">
											</div>
											<div class="category-right">
												<h4> Issue: <i>{{deb.issue.title}}</i></h4>
												<h5>Description: <i>{{deb.issue.description}}</i></h5>
											</div>
										</div>
									</v-pane-header>
									<v-pane-content>
										<div class="vPaneContentWrapper">
										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged() && $ctrl.isNotParticipant(deb.performances)">
												<a href="#!/join/{{deb.id}}"><button class="quibButton">Join</button></a>
											</span>
											<a href="#!/debate/{{deb.id}}">
												<button class="quibButton">View</button>
											</a>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4>Reference: </h4>
												</div>
												<div class="desc-right">
													<div ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)"><a href="{{deb.issue.linkRef}}">{{deb.issue.linkRef}}</a></div>
												</div>
											</div>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4>Categories: </h4>
												</div>
												<div class="desc-right">
													<div ng-repeat="cat in $ctrl.getCats(deb.issue.issCats)">{{cat.title}} </div>
												</div>
											</div>

											<div class="desc-wrapper">
												<div class="desc-left">
													<h4>Stances: </h4>
												</div>
												<div class="desc-right">
													<div>
														<ol>
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
		vm.debates;
		vm.filterCats = [];
		  vm.userinfo = authenticationService.currentUser();


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

			vm.debates.forEach(function(deb){
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
		
		  vm.isNotParticipant = function(performances){
			  
			  if (vm.userinfo) {
				  var notParticipating = true;
				  console.log("debate performance members: " + i + " ", performances.Object.perfMembers[0].id);
				  console.log("debate performance members: " + i + " ", JSON.stringify(performances));
				  var l = performances.perfMembers.length;
				  for (var i = 0 ; i < l ; i++) {
					  if (performances.perfMembers[i].includes(vm.userinfo.id)) {
						  notParticipating = false;
						  break;
					  }
				  }
				  console.log(notParticipating)
				  return notParticipating;
			  	}
		  }
	 }
 });

angular.module('ngDebate').component("profileComponent", {


	template : `
	<nav-component></nav-component>
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12">
					<h2>{{$ctrl.user.username}}'s profile</h2>
					<h5>Total number of debates: {{$ctrl.debates.length}}</h5>
					<h5>Alignment: {{$ctrl.lawfulness}} {{$ctrl.goodness}}</h5>
					<br>
					<div id="debateHeader">
						<h3>Your Debates:</h3>
					</div>
				</div>
			</div>
		</div>

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
											<h4> Issue: {{deb.issue.title}}</h4>
											<h5>Description: {{deb.issue.description}}</h5>
										</div>
									</div>
								</v-pane-header>
								<v-pane-content>
									<div class="vPaneContentWrapper">
										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()">
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
	 											<h4> Issue: {{deb.issue.title}}</h4>
	 											<h5>Description: {{deb.issue.description}}</h5>
	 										</div>
	 									</div>
	 								</v-pane-header>
	 								<v-pane-content>
	 									<div class="vPaneContentWrapper">
	 										<span ng-show="{{deb.performances.length}} < 2 && $ctrl.logged()">
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
		 </div>

	`,
	controller : function(authenticationService, performanceService, debateService){
		var vm = this;

		vm.user = authenticationService.currentUser();
		vm.goodness;
		vm.lawfulness;
		vm.winCount = 0;
		vm.debates;

		if(vm.user.goodevil < 4){
			vm.goodness = "Evil";
		} else if (vm.user.goodevil > 6){
			vm.goodness = "Good";
		} else {
			vm.goodness = "Neutral";
		}

		if(vm.user.lawfulchaotic < 4){
			vm.lawfulness = "Chaotic";
		} else if (vm.user.lawfulchaotic > 6){
			vm.lawfulness = "Lawful";
		} else {
			vm.lawfulness = "True";
		}

		debateService.indexByUser(vm.user.id).then(function(res){
			console.log("IN .THEN. RES DATA=");
			console.log(res.data);
				    vm.debates = res.data;
		})

	}

});

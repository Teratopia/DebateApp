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
					<div style="border-bottom: 2px solid #D8D8D8;margin:0px 0px 10px 0px">
						<h3>Your Debates:</h3>
					</div>
				</div>
			</div>
		</div>

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

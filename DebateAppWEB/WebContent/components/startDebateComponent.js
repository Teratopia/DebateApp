angular.module('ngDebate').component("startDebateComponent", {

	template : `

		<nav-component></nav-component>
		<div class = "container-fluid">
		<h2>Create a New Debate</h2>
		<form id="new-quib" name="sdForm" novalidate>
			<div>
				<div ng-show="$ctrl.showDivs(1)" class="col-sm-12 col-md-7 noPadNoMorg-sm">
				<h4>Issue</h4>
					<div>
						<input type="text" name="issTitle" ng-model="issTitle" required ng-minlength="6" ng-maxlength="41" class="light-theme" placeholder="Issue Title"/>
					</div>
					<div>
						<textarea name="issDesc" ng-model="issDesc" required ng-minlength="6" ng-maxlength="255" form="sdForm" ng-attr-placeholder="Issue Description"></textarea>
					</div>
					<div>
						<input type="text" ng-minlength="6" ng-maxlength="41" class="light-theme" placeholder="Issue Link" ng-model="issLink"/>
					</div>
					<div>
						<category ng-repeat="cat in $ctrl.cats">
						    <div class="inline-field">
						        <label for="{{cat.title}}">{{cat.title}} </label>
						        <input id="{{cat.title}}" type="checkbox" ng-click="$ctrl.addCat(cat)">
						    </div>
						</category>
					</div>
				</div>
				<div ng-show="showSettings" class="col-sm-12 col-md-5 noPadNoMorg-sm">
						<h4>Settings</h5>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/argument-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Arguments per Turn</label>
							<select class="settings-selector" ng-model="ruleApt" ng-options="opt for opt in $ctrl.aptOptions">
							</select>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/length-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Max Characters / Argument</label>
					      	<div style="float:right">
					      		<md-input-container class="noPadNoMorg">
					        		<input flex="" name="sliderval" id="settings-sliderval" type="number" ng-model="$ctrl.ruleCpt" aria-label="red" aria-controls="sliderCpt">
								</md-input-container>
							</div>
							<div>
								<md-slider-container>
									<md-slider flex min="250" max="380" ng-model="$ctrl.ruleCpt" aria-label="red" id="ng-slider">
									</md-slider>
							    </md-slider-container>
							</div>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/stopwatch-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Time limit</label>
							<select class="settings-selector" id="time-selector" ng-model="tLimit" ng-options="time.name for time in $ctrl.timeOptions">
							</select>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/vote-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Minimum Votes to Win</label>
							<select class="settings-selector" ng-model="vtWin" ng-options="votes for votes in $ctrl.vtWinOptions">
							</select>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/percentage-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Minimum % to Win</label>
							<select class="settings-selector" id="percent-selector" ng-model="ptWin" ng-options="precent.name for precent in $ctrl.ptWinOptions">
							</select>
						</div>
						<!-- commented out opening statements until determined whether to use -->
						<!--<div>
							Opening Statements Enabled <input type="checkbox" ng-model="oStatements"/>
						</div>-->
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/link-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">References Enabled</label>
							<label class="switch">
						    	<input type="checkbox" id="refsEnabled" ng-model="refsEnabled" ngclass="$root.bodylayout">
						    	<div class="slider round"></div>
						  	</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/visable-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Viewer Comments Visable</label>
							<label class="switch">
						    	<input type="checkbox" id="vcsVisable" ng-model="vcsVisable" ngclass="$root.bodylayout">
						    	<div class="slider round"></div>
						  	</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/privacy-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Private Debate</label>
							<label class="switch">
						    	<input type="checkbox" id="pDebate" ng-model="pDebate" ngclass="$root.bodylayout">
						    	<div class="slider round"></div>
						  	</label>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12">
		                <div class="form-group centerif-sm" >
							<button class="btn btn-primary quibButton" ng-disabled="sdForm.$invalid" ng-click="$ctrl.instantiateIssue(issTitle, issDesc, issLink) ; $ctrl.instantiateRules(ruleApt, ruleCpt, tLimit, oStatements, refsEnabled, vtWin, vcsVisable, pDebate)">Post Issue</button>
						</div>
						<div>
							  <a href="" ng-hide = "showSettings" ng-click="showSettings = !showSettings">show settings</a>
							  <a href="" ng-show = "showSettings" ng-click="showSettings = !showSettings">hide settings</a>
						</div>
						<div style="height:60px;font-size:12px;color:#e09182;text-align:center">
		               		<div ng-show="sdForm.issTitle.$dirty && sdForm.issTitle.$invalid">
		    	 				<p>Issue title must be between 6 and 42 characters.</p>
		    		        </div>
							<div ng-show="sdForm.issDesc.$dirty && sdForm.issDesc.$invalid">
		    	 				<p>Issue description must be between 6 and 255 characters.</p>
		     				</div>
		              	</div>
	              	</div>
              	</div>
			</div>

			<div ng-show="$ctrl.showDivs(3)">
				<h5>Your Team</h5>
				<input type="text" ng-model="$ctrl.defaultTeamName"/><br>
				<input type="text" placeholder="Your Stance on This Issue" ng-model="perfStance"/><br><br>
				<button ng-click="$ctrl.instantiateTeam($ctrl.defaultTeamName); $ctrl.instantiateDebate()">Create Team</button>
			</div>

			<div ng-show="$ctrl.showDivs(4)">
				<button ng-click="$ctrl.instantiatePerformanceMember(perfStance)"><a href="#!/debate/{{$ctrl.debate.id}}">Start Debate</a></button><br><br>
			</div>

		</form>
		</div>

	`,
	controller : function(categoryService, authenticationService, issueService, debateService, teamService,
			performanceService, pmService, rulesService, issCatService, $scope){
		var vm = this;
		vm.ruleCpt = 315;
		
		vm.numRange = function(min, max, increase){
			var input = [];
		    for (var i=min; i<=max; i += increase)
		      input.push(i);
		    return input;
		  }

		categoryService.indexCategories().then(function(res) {
//        	console.log("in perf promise");
//        	console.log(res.data);
//        	console.log(res);
        	vm.cats =  res.data;
		}).then(function(res){
			$scope.ruleApt = vm.aptOptions[0];
			$scope.tLimit = vm.timeOptions[10];
			$scope.vtWin = vm.vtWinOptions[2];
			$scope.ptWin = vm.ptWinOptions[3];
			console.log(vm.cats);
			console.log("LOADED CATS ##################");
		})
		
		vm.ptWinOptions = [{
				name: "55%",
				val: 55
			},{
				name: "60%",
				val: 60
			},{
				name: "65%",
				val: 65
			},{
				name: "70%",
				val: 70
			},{
				name: "75%",
				val: 75
			},{
				name: "80%",
				val: 80
			},{
				name: "85%",
				val: 85
			},{
				name: "90%",
				val: 90
			},{
				name: "95%",
				val: 95
			},{
				name: "100%",
				val: 100
			}
		];
		vm.aptOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		vm.vtWinOptions = [5,10,25,50,75,100,250,500,1000];
		vm.timeOptions = [
			{
				name: "5 Minutes",
				val: 300
			}, {
				name: "10 Minutes",
				val: 600
			}, {
				name: "15 Minutes",
				val: 900
			}, {
				name: "30 Minutes",
				val: 1800
			}, {
				name: "1 hour",
				val: 36000
			}, {
				name: "2 hours",
				val: 72000
			}, {
				name: "4 hours",
				val: 144000
			}, {
				name: "8 hours",
				val: 288000
			}, {
				name: "16 hours",
				val: 57600
			}, {
				name: "32 hours",
				val: 115200
			}, {
				name: "3 days",
				val: 230400
			}, 
		];
								

		vm.defaultTeamName = authenticationService.currentUser().name;
		vm.currentUser = authenticationService.currentUser();
		vm.issue;
		vm.rules;
		vm.debate;
		vm.performance;
		vm.performanceMember;
		vm.catsBox = [];
		vm.hideIndex = 1;

		vm.addCat = function(cat){
//			console.log("add cat 1:")
//			console.log(cat);
			var flag = false;
			var index = 0;
			var startSplice;
			vm.catsBox.forEach(function(c){
				if (c.id === cat.id){
					flag = true;
					startSplice = index;
				}
				index++;
			})
			if(flag === false){
				vm.catsBox.push(cat);
			} else {
				vm.catsBox.splice(startSplice, 1);
			}
//			console.log("addCat -- CATS:");
//			console.log(vm.catsBox);

		}

		vm.showDivs = function(q){
			if(q === vm.hideIndex){
				return true;
			} else {
				return false;
			}
		}

//		vm.postDebate = function(issTitle, issDesc, issLink, ruleApt, ruleCpt, tLimit, vtWin, oStatements,
//				refsEnabled, vcsVisable, pDebate, teamName, perfStance){
//			vm.instantiateIssue(issTitle, issDesc, issLink);
//			vm.instantiateRules(ruleApt, ruleCpt, tLimit, oStatements, refsEnabled, vtWin, vcsVisable, pDebate);
//			vm.instantiateDebate();
//			vm.instantiateTeam(teamName);
//			vm.instantiatePerformance(perfStance);
//			vm.instantiatePerformanceMember();
//			vm.currentUser = authenticationService.currentUser();
//
//		}

		vm.instantiateIssue = function(title, desc, link){

			var iss = {
					'title' : title,
					'description': desc,
					'linkRef' : link
			}
			console.log(iss);
			issueService.createIssue(iss).then(function(res) {
//            	console.log("in perf promise");
//            	console.log(res.data);
//            	console.log(res);
            	vm.issue =  res.data;
			})
			vm.hideIndex = 2;
		}

		vm.instantiateRules = function(apt, cpa, tLimit, oStatements, refOn, winVal, commView, isPrivate){
			var rul = {
					'argPerTurn' : apt,
					'charsPerArg' : cpa,
					'timeLimit' : tLimit,
					'openingStatements' : oStatements,
					'referencesOn' : refOn,
					'winValue' : winVal,
					'publicFlag' : commView,
					'viewersFlag' : false,
					'commentsView' : false,
					'privateDebate' : isPrivate
			}

			rulesService.createRules(rul).then(function(res) {
//            	console.log("in perf promise");
//            	console.log(res.data);
//            	console.log(res);
            	vm.rules =  res.data;
			})

			vm.instantiateIssCats();

			vm.hideIndex = 3;
		}

		vm.instantiateIssCats = function(){
			vm.catsBox.forEach(function(cat){
				var issCat = {
						'category' : cat,
						'issue' : vm.issue
				}

				issCatService.createIssCat(issCat);
			})
		}

		vm.instantiateDebate = function(){
//			console.log("inst debate, issue:");
//			console.log(vm.issue);
			var deb = {
					'issue' : vm.issue,
					'rules' : vm.rules,
					'timeStamp' : new Date()
			}

			debateService.createDebate(deb).then(function(res) {
//            	console.log("in perf promise");
//            	console.log(res.data);
//            	console.log(res);
            	vm.debate =  res.data;
			})
		}

		vm.instantiateTeam = function(name){
			var t = {
					'name': name
			}

			teamService.createTeam(t).then(function(res) {
//            	console.log("in perf promise");
//            	console.log(res.data);
//            	console.log(res);
            	vm.team =  res.data;
			})
			vm.hideIndex = 4;
		}

//		vm.instantiatePerformance = function(stance){
//			var per = {
//
//					'debate' : vm.debate,
//					'team' : vm.team,
//					'stance' : stance
//
//			}
//			vm.performance = performanceService.createPerformance(per);
//		}

		vm.instantiatePerformanceMember = function(stance){
			var instPAM = {
				'debateId' : vm.debate.id,
				'teamId' : vm.team.id,
				'stance' : stance,
				'timeTotal' : 0,
				'userId' : vm.currentUser.id,
				'role' : null
			}

//			console.log('CURRENT USER: #################################');
//			console.log(vm.currentUser);
//			console.log('IPAM: #################################');
//			console.log(instPAM);

			performanceService.instPerformanceAndMember(instPAM);
		}

	}

});

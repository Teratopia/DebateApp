angular.module('ngDebate').component("startDebateComponent", {

	template : `
	
		<nav-component></nav-component>
		<h2>Start a Debate</h2>
		<form name="sdForm" novalidate>
		
			<div ng-show="$ctrl.showDivs(1)">
			<h5>Issue</h5>
			<input type="text" placeholder="Issue Title" ng-model="issTitle"/><br><br>
			<input type="text" placeholder="Issue Description" ng-model="issDesc"/><br><br>
			<input type="text" placeholder="Issue Link" ng-model="issLink"/><br><br>
			<span ng-repeat="cat in $ctrl.cats">{{cat.title}} <input type="checkbox" ng-click="$ctrl.addCat(cat)"/>&nbsp&nbsp&nbsp</span>
			<br><br>
			<button ng-click="$ctrl.instantiateIssue(issTitle, issDesc, issLink)"><a>Post Issue</a></button>
			</div>
			
			<div ng-show="$ctrl.showDivs(2)">
			<h5>Rules</h5>
			<select ng-model="ruleApt">
				<option value="" disabled selected>Arguments per Turn</option>
				<option ng-repeat="opt in $ctrl.aptOptions" value="{{opt}}" name="opt">{{opt}}</option>
				<option value="100" name="Unlimited">
			</select><br><br>
			<input type="text" placeholder="Characters per Argument" name="ruleCpt"/><br><br>
			<select ng-model="tLimit">
				<option value="" disabled selected>Time Limit</option>
				<option value="300" name="five">5 Minutes</option>
				<option value="600" name="ten">10 Minutes</option>
				<option value="900" name="fifteen">15 Minutes</option>
				<option value="1800" name="thirty">30 Minutes</option>
				<option value="3600" name="1hour">1 Hour</option>
				<option value="7200" name="2hour">2 Hours</option>
				<option value="14400" name="4hour">4 Hours</option>
				<option value="28800" name="8hour">8 Hours</option>
				<option value="57600" name="16hour">16 Hours</option>
				<option value="115200" name="32hour">32 Hours</option>
				<option value="230400" name="3day">3 Days</option>
				<option value="100" name="None">
			</select><br><br>
			<select ng-model="vtWin">
				<option value="" disabled selected>Votes to Win</option>
				<option value="5" name="None">5</option>
				<option value="10" name="None">10</option>
				<option value="25" name="None">25</option>
				<option value="50" name="None">50</option>
				<option value="100" name="None">100</option>
				<option value="250" name="None">250</option>
				<option value="500" name="None">500</option>
				<option value="1000" name="None">1000</option>
			</select><br><br>
			Opening Statements Enabled <input type="checkbox" ng-model="oStatements"/><br><br>
			References Enabled <input type="checkbox" ng-model="refsEnabled"/><br><br>
			Viewer Comments Visable <input type="checkbox" ng-model="vcsVisable"/><br><br>
			Private Debate<input type="checkbox" ng-model="pDebate"/><br><br>
			
			<button ng-click="$ctrl.instantiateRules(ruleApt, ruleCpt, tLimit, oStatements, refsEnabled, vtWin, vcsVisable, pDebate)"><a>Set Rules</a></button>

			</div>
			
			<div ng-show="$ctrl.showDivs(3)">
			<h5>Your Team</h5>
			<input type="text" ng-model="$ctrl.defaultTeamName"/><br>
			<input type="text" placeholder="Your Stance on This Issue" ng-model="perfStance"/><br><br>
			<button ng-click="$ctrl.instantiateTeam($ctrl.defaultTeamName); $ctrl.instantiateDebate()"><a>Create Team</a></button>
			</div>
			
			<div ng-show="$ctrl.showDivs(4)">
			<button ng-click="$ctrl.instantiatePerformanceMember(perfStance)"><a href="#!/categories">Start Debate</button></a><br><br>
			</div>
			
		</form>
	
	`,
	controller : function(categoryService, authenticationService, issueService, debateService, teamService,
			performanceService, pmService, rulesService, issCatService){
		var vm = this;
		
		categoryService.indexCategories().then(function(res) {
//        	console.log("in perf promise");
//        	console.log(res.data);
//        	console.log(res);
        	vm.cats =  res.data;
		}).then(function(res){
			
		console.log("CATS ##################");
		console.log(vm.cats);
		})
		vm.aptOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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


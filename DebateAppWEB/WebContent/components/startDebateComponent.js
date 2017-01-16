angular.module('ngDebate').component("startDebateComponent", {

	template : `
	
		<nav-component></nav-component>
		<h2>Start a Debate</h2>
		<form name="sdForm" novalidate>
		
			<h5>Issue</h5>
			<input type="text" placeholder="Issue Title" ng-model="issTitle"/>
			<input type="text" placeholder="Issue Description" ng-model="issDesc"/>
			<input type="text" placeholder="Issue Link" ng-model="issLink"/>
			<span ng-repeat="cat in $ctrl.cats">
			<input type="checkbox" id="catsBox">{{cat.title}}</input>
			</span><br>
			
			<h5>Rules</h5>
			<select ng-model="ruleApt">
				<option value="" disabled selected>Arguments per Turn</option>
				<option ng-repeat="opt in $ctrl.aptOptions" value="opt" name="opt">
				<option value="100" name="Unlimited">
			</select>
			<input type="text" placeholder="Characters per Argument" name="ruleCpt"/>
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
			</select>
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
			</select>
			<input type="checkbox" ng-model="oStatements">Opening Statements Enabled</input>
			<input type="checkbox" ng-model="refsEnabled">References Enabled</input>
			<input type="checkbox" ng-model="vcsVisable">Viewer Comments Visable</input>
			<input type="checkbox" ng-model="pDebate">Private Debate</input>
			
			<h5>Your Team</h5>
			<input type="text" value="$ctrl.defaultTeamName" ng-model="teamName"/>
			<input type="text" placeholder="Your Stance on This Issue" ng-model="perfStance"/>
			
			<button ng-click="$ctrl.postDebate(issTitle, issDesc, issLink, ruleApt, ruleCpt, tLimit, vtWin, oStatements,
			refsEnabled, vcsVisable, pDebate, teamName, perfStance)">Post Debate</button>
			
		</form>
	
	`,
	controller : function(categoryService, authenticationService, issueService, debateService, teamService,
			performanceService, pmService, rulesService){
		var vm = this;
		
		vm.cats = categoryService.indexCategories();
		vm.aptOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		vm.defaultTeamName = authenticationService.currentUser().name;
		vm.issue;
		vm.rules;
		vm.debate;
		vm.performance;
		vm.performanceMember;
		
		
		vm.postDebate = function(issTitle, issDesc, issLink, ruleApt, ruleCpt, tLimit, vtWin, oStatements,
				refsEnabled, vcsVisable, pDebate, teamName, perfStance){
			vm.instantiateIssue(issTitle, issDesc, issLink);
			vm.instantiateRules(ruleApt, ruleCpt, tLimit, oStatements, refsEnabled, vtWin, vcsVisable, pDebate);
			vm.instantiateDebate();
			vm.instantiateTeam(teamName);
			vm.instantiatePerformance(perfStance);
			vm.instantiatePerformanceMember();
			
		}
		
		vm.instantiateIssue = function(title, desc, link){
			var iss = {
					'title' : title,
					'description': desc,
					'linkRef' : link
			}
			
			vm.issue = issueService.createIssue(iss);
		}
		
		vm.instantiateRules = function(apt, cpa, tLimit, oStatements, refOn, winVal, commView, isPrivate){
			var rul = {
					'argPerTurn' : apt,
					'charsPerArg' : cpa,
					'timeLimit' : tLimit,
					'openingStatements' : pStatements,
					'referencesOn' : refOn,
					'winValue' : winVal,
					'publicFlag' : commView,
					'viewersFlag' : false,
					'commentsView' : false,
					'privateDebate' : isPrivate
			}
			
			vm.rules = rulesService.createRules(rul);
		}
		
		vm.instantiateDebate = function(){
			var deb = {
					'issue' : vm.issue,
					'rules' : vm.rules,
			}
			
			vm.debate = debateService.createDebate(deb);
		}
		
		vm.instantiateTeam = function(name){
			var t = {
					'name': name
			}
			
			vm.team = teamService.createTeam(t);
		}
		
		vm.instantiatePerformance = function(stance){
			var per = {
					
					'debate' : vm.debate,
					'team' : vm.team,
					'stance' : stance
					
			}
			
			vm.performance = performanceService.createPerformance(per);
		}
		
		vm.instantiatePerformanceMember = function(){
			
			var pm = {
					
					'performance' : vm.performance,
					'user' : authenticationService.currentUser()
			}
			
			vm.performanceMember = pmService.createPerformanceMember(pm);
		}
		
	}
	
});
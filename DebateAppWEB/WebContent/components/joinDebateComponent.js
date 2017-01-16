angular.module('ngDebate').component("joinDebateComponent", {
	
	template : `
		<h2>Join Debate</h2>
		<form name="sdForm" novalidate>
		
			<h5>{{$ctrl.debate.issue.title}}</h5>
			<p><em>{{$ctrl.debate.issue.description}}</em></p>
			<p>Reference: {{$ctrl.debate.issue.refLink}}</p>
			<br>
			<h5>Rules: </h5>
			<ul>
				<li>Arguments per Turn: {{$ctrl.debate.rules.argPerTurn}}</li>
				<li>Characters per Argument: {{$ctrl.debate.rules.charsPerArg}}</li>
				<li>Time Limit: {{$ctrl.debate.rules.timeLimit}}</li>
				<li>Opening Statments: {{$ctrl.debate.rules.openingStatements}}</li>
				<li>References Enabled: {{$ctrl.debate.rules.referencesOn}}</li>
				<li>Votes to Win: {{$ctrl.debate.rules.winValue}}</li>
				<li>Viewer Comments Visable: {{$ctrl.debate.rules.commentsView}}</li>
				<li>Private Debate: {{$ctrl.debate.rules.privateDebate}}</li>
			</ul>
			
			<h5>Your Team:</h5>
			<input type="text" value="$ctrl.defaultTeamName" ng-model="teamName"/>
			<input type="text" placeholder="Your Stance on This Issue" ng-model="perfStance"/>
			
			<button ng-click="$ctrl.joinDebate(teamName, perfStance)">Join Debate</button>
			
		</form>
	`,
	
	controller : function(debateService, authenticationService){
		var vm = this;
		vm.debate = debateService.show(debNumber);
		vm.defaultTeamName = authenticationService.currentUser().username;
		vm.team;
		vm.performance;
		vm.performanceMember;
		
		vm.joinDebate = function(teamName, stance){
			vm.instantiateTeam(teamName);
			vm.instantiatePerformance(stance);
			vm.instantiatePerformanceMember();
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
		
		
		
	},
	bindings : {
	
		debNumber : "<"
	
	}
	
});

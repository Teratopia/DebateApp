angular.module('ngDebate').component("joinDebateComponent", {
	bindings : {
		
		debate : "="
	
	},
	template : `
		<nav-component></nav-component>
		<h2>Join Debate</h2>
		<form name="sdForm" novalidate>
		
			<h3>Issue: {{$ctrl.debate.issue.title}}</h3>
			<p><em> Description: {{$ctrl.debate.issue.description}}</em></p>
			<p ng-show="$ctrl.debate.issue.linkRef">Reference: <a href= "$ctrl.debate.issue.linkRef">{{$ctrl.debate.issue.linkRef}}</a></p>
			
			
			<div style="width:360px">
						<div class="inline-block">
							<div class="inline-block">
								<h4>Settings</h5>
							</div>
							<div class="inline-block">	
								<a href="" ng-show = "showSettings" ng-click="showSettings = !showSettings">hide settings</a>
							</div>
						</div>
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/argument-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Arguments per Turn
							<div style="float:right">{{$ctrl.debate.rules.argPerTurn}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/length-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Max Characters / Argument
							<div style="float:right">{{$ctrl.debate.rules.charsPerArg}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/stopwatch-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Time limit
							<div style="float:right">{{$ctrl.debate.rules.timeLimit}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/vote-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Minimum Votes to Win
							<div style="float:right">{{$ctrl.debate.rules.winValue}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/percentage-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Minimum % to Win
							<div style="float:right">N/A</div>
							</label>
						</div>
						
						<!-- commented out opening statements until determined whether to use -->
						<!--<div>
							Opening Statements Enabled <input type="checkbox" ng-model="oStatements"/>
						</div>-->
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/link-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">References Enabled
							<div style="float:right">{{$ctrl.debate.rules.referencesOn}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/visable-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Viewer Comments Visable
							<div style="float:right">{{$ctrl.debate.rules.commentsView}}</div>
							</label>
						</div>
						
						<div class="settings-box">
							<img class="settings-icon" src="./assets/img/privacy-icon.png" ngclass="$root.bodylayout"></img>
							<label class="settings-label">Private Debate
							<div style="float:right">{{$ctrl.debate.rules.privateDebate}}</div>
							</label>
						</div>
					</div>
			
			
			
			
			
			
			
			
			
			<h4>Enter your team name & stance:</h4>
			<input type="text" ng-model="$ctrl.defaultTeamName"/><br><br>
			<input type="text" placeholder="Your Stance on This Issue" ng-model="$ctrl.stance"/><br><br>
			
			<a href="#!/debate/{{$ctrl.debate.id}}"><button ng-click="$ctrl.joinDebate($ctrl.defaultTeamName, $ctrl.stance)">Join Debate</button></a>
			
		</form>
	`,
	
	controller : function(debateService, authenticationService, teamService, performanceService, pmService, $scope){
		var vm = this;
			
		vm.defaultTeamName = authenticationService.currentUser().username + "'s Team";
		vm.stance = "";
		vm.team = null;
		vm.performance = null;
		vm.performanceMember = null;
		vm.currentUser = authenticationService.currentUser();
		
		vm.joinDebate = function(teamName, stance){
		
			var t = {
					'name': vm.defaultTeamName
			}
			
			teamService.createTeam(t).then(function(res) {
            	console.log("in team promise");
            	console.log(res.data);
            	console.log(res);
            	vm.team = res.data;
            }).then(function(res){
            	
        			var instPAM = {
        				'debateId' : vm.debate.id,
        				'teamId' : vm.team.id,
        				'stance' : stance,
        				'timeTotal' : 0,
        				'userId' : vm.currentUser.id,
        				'role' : null
        			}

        			console.log('CURRENT USER: #################################');
        			console.log(vm.currentUser);
        			console.log('IPAM: #################################');
        			console.log(instPAM);
        			
        			performanceService.instPerformanceAndMember(instPAM);
        		})
            }
	}

});

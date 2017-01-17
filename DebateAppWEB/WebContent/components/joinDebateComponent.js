angular.module('ngDebate').component("joinDebateComponent", {
	bindings : {
		
		debate : "="
	
	},
	template : `
		<nav-component></nav-component>
		<h2>Join Debate</h2>
		<form name="sdForm" novalidate>
		
			<h5>{{$ctrl.debate.issue.title}}</h5>
			<p><em>{{$ctrl.debate.issue.description}}</em></p>
			<p ng-show="$ctrl.debate.issue.linkRef">Reference: <a href= "$ctrl.debate.issue.linkRef">{{$ctrl.debate.issue.linkRef}}</a></p>
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
			<input type="text" ng-model="$ctrl.defaultTeamName"/><br><br>
			<input type="text" placeholder="Your Stance on This Issue" ng-model="$ctrl.stance"/><br><br>
			
			<button ng-click="$ctrl.joinDebate($ctrl.defaultTeamName, perfStance)">Join Debate</button>
			<button ng-click="$ctrl.mPatch()">Fix</button>
			
		</form>
	`,
	
	controller : function(debateService, authenticationService, teamService, performanceService, pmService){
		console.log("in joinDebate");
		console.log(authenticationService.currentUser());
		
		var vm = this;
	
		vm.defaultTeamName = authenticationService.currentUser().username;
		
		console.log(vm.defaultTeamName);
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


//    			vm.instantiateTeam(teamName);
//$q.when(vm.team !== null).then(vm.instantiatePerformance(stance));
//$q.when(vm.performance !== null).then(vm.instantiatePerformanceMember);
	
//	if(vm.team !== null){
//		console.log("team:");
//		console.log(vm.team);
//		
//		vm.instantiatePerformance(stance);
//		
//		if(vm.performance !== null){
//			console.log("performance");
//			console.log(vm.performance);
//			vm.instantiatePerformanceMember();
//			if(vm.performanceMember !== null){
//			console.log("pm:")
//			console.log(vm.performanceMember)
//			}
//		}
//}

//vm.instantiateTeam = function(name){
//	var t = {
//			'name': name
//	}
//	
//	teamService.createTeam(t).then(function(res) {
//    	console.log("in team promise");
//    	console.log(res.data);
//    	console.log(res);
//    	vm.team = res.data;
//    })
//
//}
//
//vm.instantiatePerformance = function(stance){
//	console.log("in stance:");
//	console.log(stance);
//	
//	var per = {
//			
//			'debate' : vm.debate,
//			'team' : vm.team,
//			'stance' : stance,
//			
//	}
//	
//	performanceService.createPerformance(per).then(function(res) {
//    	console.log("in perf promise");
//    	console.log(res.data);
//    	console.log(res);
//    	vm.performance =  res.data;
//    })
//
//}
//
//vm.instantiatePerformanceMember = function(){
//	
//	var pm = {
//			
//			'performance' : vm.performance,
//			'user' : vm.currentUser
//	}
//	
//	pmService.createPerformanceMember(pm).then(function(res) {
//    	console.log("in pm promise");
//    	console.log(res.data);
//    	console.log(res);
//    	vm.performanceMember = res.data;
//    })
//
//}

//            	var per = {
//    					'debate' : vm.debate,
//    					'team' : vm.team,
//    					'stance' : vm.stance,
//    			}
//            	
//            	performanceService.createPerformance(per).then(function(res) {
//                	console.log("in perf promise");
//                	console.log(res.data);
//                	console.log(res);
//                	vm.performance =  res.data;
//                }).then(function(res){
//                	
//                	var pm = {
//        					'performance' : vm.performance,
//        					'user' : vm.currentUser
//        			}
//        			
//        			pmService.createPerformanceMember(pm).then(function(res) {
//                    	console.log("in pm promise");
//                    	console.log(res.data);
//                    	console.log(res);
//                    	vm.performanceMember = res.data;
//                    })
//                })
var app = angular.module('ngDebate');

app.factory('authenticationService', function(categoryService, authenticationService, issueService, debateService, teamService,
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

angular.module('ngDebate').component("ctComponent", {

	template : `
	<div class="row" style="overflow: hidden;margin:0px 5px;" ng-hide="$ctrl.noTwoPerfs()">
		<div style="float:right" ng-hide="$ctrl.hideButtons()">
			<a><button ng-click="$ctrl.logVote($ctrl.performance2)" style="width:50px;height:25px">Yellow</button></a>
		</div>
		<div style="overflow: hidden;">
			<div style="float:left" ng-hide="$ctrl.hideButtons()">
				<a><button ng-click="$ctrl.logVote($ctrl.performance1)" style="width:50px;height:25px">Blue</button></a>
			</div>
			<div style="overflow: hidden;">
				<div style="width: {{$ctrl.leftBarPercentage()}}%;margin-right:-1px;border-right:1px solid #fff;height:25px;background-color:red;float:left;"></div>
				<div style="width: {{100-$ctrl.leftBarPercentage()}}%;margin-left:-1px;border-left:1px solid #fff;height:25px;background-color:blue;float:right;"></div>
			</div>
		</div>
	</div>
	<div ng-show="$ctrl.noTwoPerfs()">
		<h5>Waiting for Opponent</h5>
	</div>
		`,

	controller : function(authenticationService, voteService, performanceService, debateService, $location, $interval){
		var vm = this;
		vm.leftVotes = 1;
		vm.rightVotes = 1;
		vm.user = authenticationService.currentUser();
		vm.performance1;
		vm.performance2;
		vm.debate;
		vm.hasVoted;
		vm.dummyArray = [{
					'user' : null,
					'debate' : null,
					'performance' : null
				}];

	  var path = $location.path().split("/");
	  debateService.indexDebateFull(path[path.length-1])
	  	.then(function(res) {
	  		vm.debateData = res.data;
	  		vm.ddLoaded = true;
	  		vm.performance1 = vm.debateData.debate.performances[0];
			vm.performance2 = vm.debateData.debate.performances[1];
			vm.performer1 = vm.debateData.debate.performances[0].team.name;
			vm.performer2 = vm.debateData.debate.performances[1].team.name;
			vm.debate = vm.debateData.debate;
			
			if(vm.hasVoted === undefined && vm.debate !== undefined){
				voteService.indexVotesByDebate(vm.debate).then(function(res) {
	            	var votesCast =  res.data;
	            	if(votesCast === undefined){
	            		vm.hasVoted = vm.dummyArray;
	            	} else {
	            		vm.hasVoted = votesCast;
	            		vm.countLeft();
	            		vm.countRight();
	            	}
				})

			}
	  	});
	  
	  function updateVotes(){
		  voteService.indexVotesByDebate(vm.debate).then(function(res) {
			  vm.hasVoted = res.data;
			  console.log("hasVoted:")
			  console.log(vm.hasVoted)
		  })
	  }
	  
	  $interval(updateVotes, 5000);

		vm.noTwoPerfs = function(){
			if (!vm.debate) return false;
			if(vm.debate.performances.length <2){
				return true;
			} else {
				return false;
			}
		}

		vm.hideButtons = function(){
			
			if(authenticationService.isLoggedIn() === false){
				return true;
			} else {
				
					var flag = false;
				vm.debateData.performance_members.forEach(function(pm){
					if(vm.user !== undefined){
						if(pm.user.id === vm.user.id){
							flag = true
						}
					}
				})
				if(flag === true){
					return true;
				} else {
					return false;
				}
			}
		}

		vm.leftBarPercentage = function(){
			var totVotes = vm.leftVotes + vm.rightVotes;
			var dec = vm.leftVotes/totVotes;
			return dec*100;
		}

		vm.countLeft = function(){
			var index = 0;
			vm.hasVoted.forEach(function(v){
				if(v.performance.id === vm.performance1.id){
					index++;
				}
			})
			console.log("left Votes: ")
			console.log(index);
			vm.leftVotes = index;
			return index;
		}

		vm.countRight = function(){
			var index = 0;
			vm.hasVoted.forEach(function(v){
				if(v.performance.id === vm.performance2.id){
					index++;
				}
			})
			console.log("right Votes: ")
			console.log(index);
			vm.rightVotes = index;
			return index;
		}

		vm.logVote = function(performance){

			console.log("in log vote")

			var flag = false;
			var presentVote;
			var newVote = {
					'user' : vm.user,
					'debate' : vm.debate,
					'performance' : performance,
					'timeStamp' : new Date()
				}
			vm.hasVoted.forEach(function(v){
				console.log("hasVoted foreach v = ")
				console.log(v)
				if(vm.user.id === v.user.id){
					flag = true;
					presentVote = v;
				}
			})

			if(flag === false){
				console.log("in false, newvote = ")
				console.log(newVote)
				voteService.createVote(newVote).then(function(res){
					newVote = res.data;
					console.log(newVote);
					vm.hasVoted.push(newVote);
					vm.leftVotes = vm.countLeft();
					vm.rightVotes = vm.countRight();
				})
			}

			if(flag === true){
				console.log("in true")
				voteService.editVote(presentVote.id, newVote).then(function(res){
					console.log("in edit vote. res data = ")
					console.log(res.data);
					presentVote = res.data;
					console.log("presentvote = ")
					console.log(presentVote);
					var index = 0;
					vm.hasVoted.forEach(function(v){
						if(presentVote.id === v.id){
							console.log('in presentVote = v.id')
							vm.hasVoted.splice(index, 1);
							vm.hasVoted.push(presentVote);
						}
						index++;
					})
					vm.leftVotes = vm.countLeft();
					vm.rightVotes = vm.countRight();
				})
			}

		}
	},

	bindings : {
		debateData : '<'
	}


});

// encapsulate performances and voteCounts in json to hold in unlimited array
//<div style="width:{{$ctrl.leftBarPercentage}}%;height:25px;border:2px solid #000;background-color:red;float:left"/>
//<div style="width:{{100-$ctrl.leftBarPercentage}}%;height:25px;border:3px solid #000;background-color:blue;float:right"/>

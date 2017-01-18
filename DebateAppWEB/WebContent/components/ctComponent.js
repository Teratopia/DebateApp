angular.module('ngDebate').component("ctComponent", {

	template : `
	<div style="width:100%">
		<div style="width:100%">
			<div style="float:left">
				<button ng-click="$ctrl.logVote($ctrl.performance1)">Red</button>
			</div>
			<div style="width:100%">
				<div style="width: {{$ctrl.leftBarPercentage()}}%; height:25px;border:1px solid #000;background-color:red;float:left;"></div>
				<div style="width: {{100-$ctrl.leftBarPercentage()}}%;height:25px;border:1px solid #000;background-color:blue;float:right;"></div>
			</div>
		</div>
		<div style="float:right">
			<button ng-click="$ctrl.logVote($ctrl.performance2)">Blue</button>
		</div>
	</div>
		`,
	
	controller : function(authenticationService, voteService, performanceService, debateService){
		var vm = this;
		vm.leftVotes = 1;
		vm.rightVotes = 1;
		vm.user = authenticationService.currentUser();
		vm.performance1;
		vm.performance2;
		vm.debate;
		vm.hasVoted = [];
		vm.dummyArray = [{
					'user' : null,
					'debate' : null,
					'performance' : null
				}];
		
		performanceService.getPerformance(1).then(function(res) {
			console.log("per 1:");
			console.log(res.data);
        	vm.performance1 = res.data;
		})
		performanceService.getPerformance(2).then(function(res) {
			console.log("per 2:");
			console.log(res.data);
			vm.performance2 = res.data;
		})
		debateService.getDebate(5).then(function(res) {
			console.log("debate:");
			console.log(res.data);
			vm.debate = res.data;
		})
		
		if(vm.hasVoted.length === 0 && vm.debate !== undefined){
		
			voteService.indexVotesByDebate(vm.debate).then(function(res) {
            	var votesCast =  res.data;
            	if(votesCast === undefined){
            		vm.hasVoted = vm.dummyArray;
            	} else {
            		vm.hasVoted.push(votesCast);
            	}
			})
			
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
				if(vm.user.id === v.user.id){
					flag = true;
					presentVote = v;
				}
			})
			
			if(flag === false){
				console.log("in false, newvote = ")
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
	}
	
	
});
 
// encapsulate performances and voteCounts in json to hold in unlimited array
//<div style="width:{{$ctrl.leftBarPercentage}}%;height:25px;border:2px solid #000;background-color:red;float:left"/>
//<div style="width:{{100-$ctrl.leftBarPercentage}}%;height:25px;border:3px solid #000;background-color:blue;float:right"/>
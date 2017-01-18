angular.module('ngDebate').component("ctComponent", {

	template : `
	<div style="width:100%">
		<div style="width:100%">
			<div style="float:left">
				<button ng-click="$ctrl.addLeft()">Red</button>
			</div>
			<div style="width:100%">
				<div style="width: {{$ctrl.leftBarPercentage()}}%; height:25px;border:1px solid #000;background-color:red;float:left;"></div>
				<div style="width: {{100-$ctrl.leftBarPercentage()}}%;height:25px;border:1px solid #000;background-color:blue;float:right;"></div>
			</div>
		</div>
		<div style="float:right">
			<button ng-click="$ctrl.addRight()">Blue</button>
		</div>
	</div>
		`,
	
	controller : function(){
		var vm = this;
		vm.leftVotes = 1;
		vm.rightVotes = 1;
		
		vm.addLeft =function(){
			vm.leftVotes = vm.leftVotes+1;
			console.log("left: ");
			console.log(vm.leftVotes)
			console.log("right: ");
			console.log(vm.rightVotes)
			console.log("LBP: ");
			console.log(vm.leftBarPercentage());
			console.log("RBP: ");
			console.log(100-vm.leftBarPercentage());
		}
		vm.addRight =function(){
			vm.rightVotes = vm.rightVotes+1;
			console.log("left: ");
			console.log(vm.leftVotes)
			console.log("right: ");
			console.log(vm.rightVotes)
			console.log("LBP: ");
			console.log(vm.leftBarPercentage());
			console.log("RBP: ");
			console.log(100-vm.leftBarPercentage());
		}
		vm.leftBarPercentage = function(){
			var totVotes = vm.leftVotes + vm.rightVotes;
			var dec = vm.leftVotes/totVotes;
			return dec*100;
		}
		
		
	}
	
	
});
//<div style="width:{{$ctrl.leftBarPercentage}}%;height:25px;border:2px solid #000;background-color:red;float:left"/>
//<div style="width:{{100-$ctrl.leftBarPercentage}}%;height:25px;border:3px solid #000;background-color:blue;float:right"/>
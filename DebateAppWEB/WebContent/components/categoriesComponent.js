angular.module('ngDebate').component("categoriesComponent", {

	template : `
		<nav-component></nav-component>
		<h2>Categories</h2><button ng-click="$ctrl.createDebate()">Create New Debate</button>
		
		<div ng-repeat="cat in $ctrl.cats">
			<button ng-click="showIssues = !showIssues">{{cat.title}}</button>
				<h4>{{cat.description}}</h4>
					<div ng-hide="showIssues" ng-repeat="iss in cat.issues">
						<button ng-click="$ctrl.joinDebate()">Join Debate</button>
						<button ng-click="$ctrl.viewDebate()">View Debate</button>
						<h6>{{iss.title}}</h6>
						<p>{{iss.description}}</p>
						<p>{{iss.linkRef}}</p>
						
					<div>
		</div>
	
	`,
	controller : function(categoryService){
		
		console.log('in catComp');
		
		var vm = this;
		vm.cats = categoryService.indexCategories();
		
		vm.joinDebate = function(){
			console.log("joindebate");
		}

		vm.viewDebate = function(){
			console.log("joindebate");
		}
	
		vm.createDebate = function(){
			console.log("createDebate");
		}
		
	}
	
	
});
angular.module('ngDebate').component("categoriesComponent", {

	template : `
	
		<h2>Categories</h2><button ng-click="$ctrl.createDebate()">Create New Debate</button>
		
		<div ng-repeat="cat in $ctrl.cats">
		<button ng-click="showIssues = !showIssues">{{cat.title}}</button>
		<h4>{{cat.description}}</h4>
		<div ng-hide="showIssues" ng-repeat="iss in cat.issues">
			<button ng-click="$ctrl.joinDebate()">{{iss.title}}</button>
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
	
		vm.createDebate = function(){
			console.log("createDebate");
		}
		
	}
	
	
});
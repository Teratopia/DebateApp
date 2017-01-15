angular.module('ngDebate').component("loginComponent", {

	template : `
	
		<h2>Start a Debate</h2>
		<form name="sdForm">
			<h5>Issue</h5>
			<input type="text" placeholder="Issue Title" name="issTitle"/>
			<input type="text" placeholder="Issue Description" name="issDesc"/>
			<input type="text" placeholder="Issue Link" name="issLink"/>
			<span ng-repeat="cat in $ctrl.cats">
			<input type="checkbox" id="catsBox">{{cat.title}}</input>
			</span><br>
			<h5>Rules</h5>
			<select>
				<option value="" disabled selected>Arguments per Turn</option>
				<option ng-repeat="opt in $ctrl.aptOptions" value="opt" name="opt">
				<option value="100" name="Unlimited">
			</select>
			
			
			  
			
		
		</form>
	
	`,
	controller : function(categoryService){
		var vm = this;
		
		vm.cats = categoryService.indexCategories();
		vm.aptOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
		
		
	}
	
	
	
});
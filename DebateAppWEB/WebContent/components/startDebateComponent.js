angular.module('ngDebate').component("loginComponent", {

	template : `
	
		<h2>Start a Debate</h2>
		<form name="sdForm" novalidate>
		
			<h5>Issue</h5>
			<input type="text" placeholder="Issue Title" name="issTitle"/>
			<input type="text" placeholder="Issue Description" name="issDesc"/>
			<input type="text" placeholder="Issue Link" name="issLink"/>
			<span ng-repeat="cat in $ctrl.cats">
			<input type="checkbox" id="catsBox">{{cat.title}}</input>
			</span><br>
			
			<h5>Rules</h5>
			<select ng-model="ruleApt">
				<option value="" disabled selected>Arguments per Turn</option>
				<option ng-repeat="opt in $ctrl.aptOptions" value="opt" name="opt">
				<option value="100" name="Unlimited">
			</select>
			<input type="text" placeholder="Characters per Argument" name="ruleCpt"/>
			<select>
				<option value="" disabled selected>Time Limit</option>
				<option value="300" name="five">5 Minutes</option>
				<option value="600" name="ten">10 Minutes</option>
				<option value="900" name="fifteen">15 Minutes</option>
				<option value="1800" name="thirty">30 Minutes</option>
				<option value="3600" name="1hour">1 Hour</option>
				<option value="7200" name="2hour">2 Hours</option>
				<option value="14400" name="4hour">4 Hours</option>
				<option value="28800" name="8hour">8 Hours</option>
				<option value="57600" name="16hour">16 Hours</option>
				<option value="115200" name="32hour">32 Hours</option>
				<option value="230400" name="3day">3 Days</option>
				<option value="100" name="None">
			</select>
			<select>
				<option value="" disabled selected>Votes to Win</option>
				<option value="5" name="None">5</option>
				<option value="10" name="None">10</option>
				<option value="25" name="None">25</option>
				<option value="50" name="None">50</option>
				<option value="100" name="None">100</option>
				<option value="250" name="None">250</option>
				<option value="500" name="None">500</option>
				<option value="1000" name="None">1000</option>
			</select>
			<input type="checkbox" id="oStatements">Opening Statements Enabled</input>
			<input type="checkbox" id="refsEnabled">References Enabled</input>
			<input type="checkbox" id="vcsVisable">Viewer Comments Visable</input>
			<input type="checkbox" id="pDebate">Private Debate</input>
			
			<h5>Your Team</h5>
			<input type="text" value="$ctrl.defaultTeamName" name="teamName"/>
			<input type="text" placeholder="Your Stance on This Issue" name="perfStance"/>
			
		</form>
	
	`,
	controller : function(categoryService, authenticationService){
		var vm = this;
		
		vm.cats = categoryService.indexCategories();
		vm.aptOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		vm.defaultTeamName = authenticationService.currentUser().name;
		
		vm.postDebate = function(){
			
			
			
			
		}
	}
	
	
	
});
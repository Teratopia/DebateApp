var app = angular.module('ngDebate');

function NavBarCtrl($scope) {
	console.log("loaded")
    $scope.isCollapsed = true;
    $scope.log = function(){console.log("Clicked!")}
}

app.controller('navCtrl', NavBarCtrl);

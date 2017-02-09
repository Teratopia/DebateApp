var app = angular.module('ngDebate');

function navController(authenticationService, formatService, $rootScope) {
  var vm = this;
  vm.isCollapsed = true;
  vm.checkLogin = function(x){
	  return authenticationService.isLoggedIn()
	  };
  vm.logout = function(){
	  authenticationService.logout();
  }

}

app.component('navComponent',{
  template: ` <div>
                  <nav class="navbar navbar-inverse navigation-clean" ng-class="$root.bodylayout">
                      <div class="container-fluid" >
                          <div class="navbar-header">
                              <a class="navbar-brand navbar-link" href="#!/categories"><img src="assets/img/Quib-Logo-WHITE.png" ngclass="$root.bodylayout"></a>
                                      <label class="switch">
									    <input type="checkbox" ng-model="$root.bodylayout" ng-true-value="'dark-theme'" ng-false-value="'light-theme'">
									    <div class="slider round"></div>
									  </label>
                              <button class="navbar-toggle collapsed" ng-click="$ctrl.isCollapsed = !$ctrl.isCollapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                          </div>
                          <div class="collapse navbar-collapse" uib-collapse="$ctrl.isCollapsed" id="navcol-1">
                              <ul class="nav navbar-nav navbar-right">
                                  <!--<li class="active" role="presentation" ng-show="$ctrl.checkLogin()"><a ng-class="$root.bodylayout" href="#">First Item</a></li> -->
                                  <li class="line_item" role="presentation"><a ng-class="$root.bodylayout" href="#!/about">About </a></li>
                                  <li class="line_item" role="presentation" ng-show="$ctrl.checkLogin()"><a ng-class="$root.bodylayout" href="#!/startDebate">New Quib</a></li>
									<li class="line_item" role="presentation"><a ng-class="$root.bodylayout" href="#!/categories">Browse Quibs</a></li>

                                  <li ng-hide="$ctrl.checkLogin()" class="line_item" role="presentation"><a ng-class="$root.bodylayout" href="#!/login">Log In</a></li>
                                  <li ng-show="$ctrl.checkLogin()" class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" ng-class="$root.bodylayout" uib-dropdown-toggle aria-expanded="true" href="#">Profile <span class="caret"></span></a>
                                      <ul class="dropdown-menu" uib-dropdown-menu role="menu">
                                          <li class="sub_line_item " role="presentation"><a href="#!/secure/profile">View Profile</a></li>
                                          <li class="sub_line_item " role="presentation"><a href="#" ng-click="$ctrl.logout()">Log Out</a></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </nav>
              </div>`,

  controller : navController,
  binding : {
	  	theme : '='
  }

});

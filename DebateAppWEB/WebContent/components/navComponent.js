var app = angular.module('ngDebate');

function navController(authenticationService) {
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
                  <nav class="navbar navbar-inverse navigation-clean" style="margin-bottom:10px;background-color:#1e2021;">
                      <div class="container-fluid">
                          <div class="navbar-header">
                              <a class="navbar-brand navbar-link" href="#!/categories" style="padding:0px;margin:0px 0px 0px 0px;"><img src="assets/img/Quib-Logo-WHITE.png" style="float:left;border-radius:5px;border:1px solid rgb(169,169,169);"></a>
                              <button class="navbar-toggle collapsed" ng-click="$ctrl.isCollapsed = !$ctrl.isCollapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                          </div>
                          <div class="collapse navbar-collapse" uib-collapse="$ctrl.isCollapsed" id="navcol-1">
                              <ul class="nav navbar-nav navbar-right"><!--
                                  <li class="active" role="presentation" ng-show="$ctrl.checkLogin()"><a href="#">First Item</a></li> -->
                                  <li class="line_item" role="presentation"><a href="#!/about">About </a></li>
                                  <li class="line_item" role="presentation" ng-show="$ctrl.checkLogin()"><a href="#!/startDebate">New Quib</a></li>
									<li class="line_item" role="presentation"><a href="#!/categories">Browse Quibs</a></li>

                                  <li ng-hide="$ctrl.checkLogin()" class="line_item" role="presentation"><a href="#">Log In</a></li>
                                  <li ng-show="$ctrl.checkLogin()" class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#">Profile <span class="caret"></span></a>
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

});

//<li class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#"  ng-show="$ctrl.checkLogin()">Search Quibs<span class="caret"></span></a>
//<ul class="dropdown-menu" uib-dropdown-menu role="menu">
//    <li class="sub_line_item" role="presentation"><a href="#">Insert Search Bar Here</a></li>
//</ul>
//</li>
//<li class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#" ng-show="$ctrl.checkLogin()">Quibagories<span class="caret"></span></a>
//<ul class="dropdown-menu" uib-dropdown-menu role="menu">
//    <li class="sub_line_item" role="presentation"><a href="#">Quibagory 1</a></li>
//    <li class="sub_line_item" role="presentation"><a href="#">Quibagory 2</a></li>
//    <li class="sub_line_item" role="presentation"><a href="#">Quibagory 3</a></li>
//    <li class="sub_line_item " role="presentation"><a href="#">Quibagory 4</a></li>
//    <li class="sub_line_item " role="presentation"><a href="#">Quibagory 5</a></li>
//</ul>
//</li>

var app = angular.module('ngDebate'); //ngRoute and 'ui.bootstrap' are module dependencies

function navController(authenticationService) {
  var vm = this;
  vm.isCollapsed = true;
  vm.checkLogin = function(x){return authenticationService.isLoggedIn()};
}

app.component('navComponent',{
  template: ` <div>
                  <nav class="navbar navbar-inverse navigation-clean" style="margin-bottom:10px;background-color:#1e2021;">
                      <div class="container-fluid">
                          <div class="navbar-header">
                              <a class="navbar-brand navbar-link" href="./" style="padding:0px;margin:0px 0px 0px 0px;"><img src="assets/img/Quib-Logo-WHITE.png" style="float:left;border-radius:5px;border:1px solid rgb(169,169,169);"></a>
                              <button class="navbar-toggle collapsed" ng-click="$ctrl.isCollapsed = !$ctrl.isCollapsed"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                          </div>
                          <div class="collapse navbar-collapse" uib-collapse="$ctrl.isCollapsed" id="navcol-1">
                              <ul class="nav navbar-nav navbar-right"><!--
                                  <li class="active" role="presentation"><a href="#">First Item</a></li> -->
                                  <li class="line_item" role="presentation"><a href="#intro">About </a></li>
                                  <li class="line_item" role="presentation"><a href="#">New Quib</a></li>
                                  <li class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#">Search Quibs<span class="caret"></span></a>
                                      <ul class="dropdown-menu" uib-dropdown-menu role="menu">
                                          <li class="sub_line_item" role="presentation"><a href="#">Insert Search Bar Here</a></li>
                                      </ul>
                                  </li>
                                  <li class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#">Quibagories<span class="caret"></span></a>
                                      <ul class="dropdown-menu" uib-dropdown-menu role="menu">
                                          <li class="sub_line_item" role="presentation"><a href="#">Quibagory 1</a></li>
                                          <li class="sub_line_item" role="presentation"><a href="#">Quibagory 2</a></li>
                                          <li class="sub_line_item" role="presentation"><a href="#">Quibagory 3</a></li>
                                          <li class="sub_line_item " role="presentation"><a href="#">Quibagory 4</a></li>
                                          <li class="sub_line_item " role="presentation"><a href="#">Quibagory 5</a></li>
                                      </ul>
                                  </li>
                                  <li ng-hide="$ctrl.checkLogin()" class="line_item" role="presentation"><a href="#">Log In</a></li>
                                  <li ng-show="$ctrl.checkLogin()" class="dropdown open" uib-dropdown keyboard-nav><a class="dropdown-toggle" uib-dropdown-toggle aria-expanded="true" href="#">Profile <span class="caret"></span></a>
                                      <ul class="dropdown-menu" uib-dropdown-menu role="menu">
                                          <li class="sub_line_item " role="presentation"><a href="#">View Profile</a></li>
                                          <li class="sub_line_item " role="presentation"><a href="#">Log Out</a></li>
                                      </ul>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </nav>
              </div>`,

  controller : navController,

});

angular.module('ngDebate').component("loginComponent", {

 template : `

	<div style="font-size:14px;line-height:1.42857143;color:#333;background-color:#1e2021;">
        <nav class="navbar navbar-inverse navigation-clean" style="margin-bottom:10px;background-color:#1e2021;">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand navbar-link" href="./" style="padding:0px;margin:0px 0px 0px 0px;"><img src="assets/img/Quib-Logo-WHITE.png" style="float:left;border-radius:5px;border:1px solid rgb(169,169,169);"></a>
                    <button class="navbar-toggle collapsed" ng-click="$ctrl.isCollapsed = !$ctrl.isCollapsed; log()"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                </div>
                <div class="collapse navbar-collapse" uib-collapse="$ctrl.isCollapsed" id="navcol-1">
                    <ul class="nav navbar-nav navbar-right"><!--
                        <li class="active" role="presentation"><a href="#">First Item</a></li> -->
                        <li class="line_item" role="presentation"><a href="#intro">About </a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="login-dark">
        <form name="logForm" novalidate>
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class="form-group">
                <input style="text-align: center" class="form-control" name="username" ng-model="post.username" placeholder="Username" required ng-minlength="6" ng-maxlength="41">
            </div>
            <div class="form-group">
                <input style="text-align: center" class="form-control" type="password" name="password" ng-model="post.password" placeholder="Password" required ng-minlength="6" ng-maxlength="42">
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" ng-click="$ctrl.login(post.username, post.password); post.username = ''; post.password='';">Log In</button>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" ng-click="$ctrl.signup(post.username, post.password); post.username = ''; post.password='';">Sign Up</button>
            </div>
 			<div style="height:60px;font-size:12px;color:#e09182;text-align:center">
		         <div ng-show="logForm.password.$dirty && logForm.username.$invalid ">
	 				<p>Username must be between 6 and 42 characters.</p>
		         </div>
	 				<div ng-show="logForm.username.$dirty && logForm.password.$dirty && logForm.password.$invalid">
	 				<p>Password must be between 6 and 42 characters.</p>
 				</div>
            </div>
	 </form>
    </div>

 `,
 controller : function(authenticationService){
	 var vm = this;

	 vm.isCollapsed = true;
	 vm.jwt;

     vm.login = function(uname, pword){
     	var user = {
     			'username' : uname,
     			'password' : pword,
     			'type' : 'USER'
     	}

     	authenticationService.authUser(user).then(function(response){
     		console.log(response);
     		vm.jwt = response.data.jwt;
     		authenticationService.saveToken(vm.jwt);
     		})
     }

     vm.signup = function(uname, pword){
    	 var user = {
    			 'username' : uname,
    			 'password' : pword,
    			 'type' : 'USER'
    	 }

    	 authenticationService.createUser(user).then(function(response){
    		 console.log('IN COMP SIGNUP RESPONSE:');
    		 console.log(response);
    		 vm.jwt = response.data.jwt;
    		 authenticationService.saveToken(vm.jwt);
    	 })
     }
 }
});


// <a href="#" class="forgot">Forgot your email or password?</a>

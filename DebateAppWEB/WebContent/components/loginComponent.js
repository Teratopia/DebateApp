angular.module('ngDebate').component("loginComponent", {

 template : ` <nav-component></nav-component>
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
 controller : function(authenticationService, $location){
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
     		console.log("LOGIN AUTH RESPONSE");
     		console.log(response);
     		vm.jwt = response.data.jwt;
     		authenticationService.saveToken(vm.jwt);
     		}).then(function(res){
     			console.log("IN SECOND");
     			$location.path('/categories');
     		})
     }

     vm.signup = function(uname, pword){
    	 var user = {
    			 'username' : uname,
    			 'password' : pword,
    			 'lawfulchaotic' : 5,
    			 'goodevil' : 5,
    			 'type' : 'USER'
    	 }

    	 authenticationService.createUser(user).then(function(response){
    		 console.log('IN COMP SIGNUP RESPONSE:');
    		 console.log(response);
    		 vm.jwt = response.data.jwt;
    		 console.log("COMPT SIGNUP JWT: ")
    		 console.log(response.data.jwt)
    		 authenticationService.saveToken(vm.jwt);
    		 
    	 }).then(function(res){
  			console.log("IN SECOND");
 			$location.path('/categories');
 		})
     }
 }
});


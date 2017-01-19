angular.module('ngDebate').component("commentMasterComponent", {

	template : `

		<div class="col-md-12">
               <div class="row">
                   <div class="col-md-12">
                       <p style="font-size:1em;">Commentary:</p>
                       <div class="comments-display-screen">
						<div ng-repeat="comment in $ctrl.allComments | orderBy:'timeStamp'">
          				{{comment.user.username}} says: {{comment.text}}
						</div>
					</div>
                  </div>
               </div>
               <div class="row">
                   <div class="col-md-12" ng-hide="$ctrl.isParticipant()" >
						<div class="form-box">
							<form>
								<div>
									<textarea id="arg-text" placeholder="{{$ctrl.argumentText}}"
									ng-model="$ctrl.newText" class="arg-text-form"></textarea>
								</div>
								<div>
  									<input id="args-submit" ng-click="$ctrl.instCom()" type="submit"
  									value="Send">
								</div>
								<div style="overflow: hidden; padding-right: .35em;">
  									<input type="text" placeholder="{{$ctrl.hrefText}}"
  									ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
								</div>
							</form>
						</div>
                   </div>
               </div>
           </div>

	`,

	controller : function(authenticationService, userService, formatService, commentService,
			debateService, $location, $interval){

		var vm = this;
		  vm.classCode = null;
		  vm.leftRight = null;
		  vm.allComments;

		  vm.argumentText = 'type comment';
		  vm.hrefText = 'insert URL';
		  vm.userInfo = authenticationService.currentUser();
		  vm.newText = "";
		  vm.newRef = "";
		  vm.debate;

		  var path = $location.path().split("/");
		  debateService.indexDebateFull(path[path.length-1])
		  	.then(function(res) {
		  		vm.debateData = res.data;
		  		vm.ddLoaded = true;
		  		vm.debate = vm.debateData.debate;

				  commentService.indexCommentsByDebate(vm.debateData.debate.id).then(function(res){
					  vm.allComments = res.data;
				  })
		  	});
		  
		  function updateComs(){
			  commentService.indexCommentsByDebate(vm.debateData.debate.id).then(function(res){
				  vm.allComments = res.data;
				  console.log("all comments:")
				  console.log(vm.allComments)
			  })
		  }
		  
		  $interval(updateComs, 5000);

		  vm.instCom = function(){
			  console.log("in instCom. com = ")

			  var com = {
					  'user' : vm.userInfo,
					  'debate' : vm.debate,
					  'text' : vm.newText,
					  'linkRef' : vm.newRef,
					  'timeStamp' : new Date()
			  }

			  console.log(com);
			  commentService.createComment(com).then(function(res){
				  vm.newText = null;
				  vm.newRef = null;
				  vm.allComments.push(res.data);
			  })
		  }

		  vm.assignClass = function(arg, performances){
		    return formatService.getArgPerfClass(arg, performances);
		  }

		  vm.isRight=function(args, performances){
		    return formatService.getArgNumClass(args, performances);
		  }

		  vm.isParticipant = function(){

			  if(authenticationService.isLoggedIn() === false){
				  return true;
			  } else if (vm.debateData && vm.userInfo) {
				  var participating = false;
				  var l = vm.debateData.roster.length;
				  for (var i = 0 ; i < l ; i++) {
					  if (vm.debateData.roster[i].includes(vm.userInfo.id)) {
						  participating = true;
						  break;
					  }
				  }
				  return participating;
			  	}
		  }
		},
});
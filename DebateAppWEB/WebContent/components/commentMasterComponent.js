angular.module('ngDebate').component("commentMasterComponent", {

	template : `

		<div class="col-md-12">
               <div class="row">
                   <div class="col-md-12">
                       <p id="commentaryHeader">Commentary: {{$ctrl.interaction}}</p>
                       <div class="comments-display-screen">
						<!--<div ng-repeat="comment in $ctrl.allComments | orderBy:'timeStamp'">
							<div>
          						{{comment.user.username}} says: {{comment.text}}
							</div>
						</div>-->
							<comment-component depth="$ctrl.depth" comref="$ctrl.comref" comments="$ctrl.allComments"></comment-component>
						</div>
                  	</div>
               </div>
               <div class="row">
                   <div class="col-md-12" ng-hide="$ctrl.isParticipant()" >
						<div class="form-box">
							<form>
								<div>
									<textarea id="arg-text" placeholder="{{$ctrl.argumentText}}"
									ng-model="$ctrl.newText" class="arg-text-form">{{$ctrl.comref}}</textarea>
								</div>
								<div>
  									<input id="args-submit" ng-click="$ctrl.instCom()" type="submit"
  									value="Send">
								</div>
								<div id="URLInputWrapper">
  									<input type="text" placeholder="{{$ctrl.hrefText}}"
  									ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
								</div>
							</form>
						</div>
                   </div>
               </div>
           </div>`,
           
	bindings : {
		
		interaction : "="
	
	},

	controller : function(authenticationService, userService, formatService, commentService,
			debateService, $location, $interval){

		  var vm = this;
		  vm.depth=0;
		  vm.classCode = null;
		  vm.leftRight = null;
		  vm.allComments;
		  vm.$onInit = function(){
				  vm.interaction = "Testing Interaction Variable Binding";
		  };
		  
		  console.log(vm.interaction);

		  vm.argumentText = 'type comment';
		  vm.hrefText = 'insert URL';
		  vm.userInfo = authenticationService.currentUser();
		  vm.newText = "";
		  vm.newRef = "";
		  vm.comref = null;
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
				  console.log("all comments:");
				  console.log(vm.allComments);
				  console.log(vm.comref);
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
					  'comment' : vm.comref,
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

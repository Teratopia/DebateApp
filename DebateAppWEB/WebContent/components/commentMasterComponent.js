angular.module('ngDebate').component("commentMasterComponent", {

	template : `

		<div class="col-md-12">
               <div class="row">
                   <div class="col-md-12">
                       <div style="height:2.54em">
                       		<p style="font-size:1.5em" id="commentaryHeader">Commentary:</p>
                   		</div>
                       <div>
							<comment-component ng-scope trigger="$ctrl.trigger" depth="$ctrl.depth" userinfo="$ctrl.userinfo" debate="$ctrl.debate" newref="$ctrl.newref" newtext="$ctrl.newtext" comref="$ctrl.comref" comments="$ctrl.allComments"></comment-component>
						</div>
                  	</div>
               </div>
               <div class="row">
                   <div class="col-md-12" ng-hide="$ctrl.isParticipant() || $ctrl.isNumeric($ctrl.comref)" >
						<div class="form-box">
							<form>
								<div>
									<textarea id="arg-text" placeholder="{{$ctrl.placeholderText}}"
									ng-model="$ctrl.newtext" class="arg-text-form"></textarea>
								</div>
								<div>
  									<input id="args-submit" ng-click="$ctrl.instCom()" type="submit"
  									value="Send">
								</div>
								<div id="URLInputWrapper">
  									<input type="text" placeholder="{{$ctrl.hrefText}}"
  									ng-model="$ctrl.newref" id="arg-href-link" class="href-link"/>
								</div>
							</form>
						</div>
                   </div>
               </div>
           </div>`,
           
	bindings : {
	
	},

	controller : function(authenticationService, userService, formatService, commentService,
			debateService, $location, $interval, $scope){

		  var vm = this;
		  vm.depth=0;
		  vm.classCode = null;
		  vm.leftRight = null;
		  vm.allComments;
		  

		  vm.isNumeric = function(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}
		  
		  vm.placeholderText = 'type comment';
		  vm.hrefText = 'insert URL';
		  vm.userinfo = authenticationService.currentUser();
		  vm.newtext = "";
		  vm.newref = "";
		  vm.comref = null;
		  vm.debate;
		  vm.trigger = true;
		  
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
			  if(vm.trigger){
				  commentService.indexCommentsByDebate(vm.debateData.debate.id).then(function(res){
					  vm.allComments = res.data;
					  console.log("all comments:");
					  console.log(vm.allComments);
					  console.log(vm.comref);
				  })
			  }
		  }
		  
		 
		  $interval(updateComs, 5000);
		  
		  

		  vm.instCom = function(){

			  var com = {
					  'user' : vm.userinfo,
					  'debate' : vm.debate,
					  'text' : vm.newtext,
					  'linkRef' : vm.newref,
					  'comment' : vm.comref,
					  'timeStamp' : new Date()
			  }

			  
			  commentService.createComment(com).then(function(res){
				  vm.newtext = null;
				  vm.newref = null;
				  vm.allComments.push(res.data);
			  })

			  vm.comref=null;
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
			  } else if (vm.debateData && vm.userinfo) {
				  var participating = false;
				  var l = vm.debateData.roster.length;
				  for (var i = 0 ; i < l ; i++) {
					  if (vm.debateData.roster[i].includes(vm.userinfo.id)) {
						  participating = true;
						  break;
					  }
				  }
				  return participating;
			  	}
		  }
		},
});

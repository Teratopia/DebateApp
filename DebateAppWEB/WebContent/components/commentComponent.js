var app = angular.module('ngDebate');

function commentController(commentService, $scope){

	  var vm = this;
	  vm.highlight="";
	  vm.placeholderText = "";
	  
	  vm.instCom = function(){

		  console.log("userinfo",vm.userinfo);
		  console.log("debate",vm.debate);
		  console.log("text",vm.newtext);
		  console.log("href",vm.newref);
		  console.log("comref",vm.comref);
	  
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
}

app.component("commentComponent", {

	template : `

		<div ng-repeat="comment in $ctrl.comments | orderBy:'timeStamp'">
			<div ng-class="$ctrl.depth>0 ? 'padComment' : 'nopadComment'">
				<div ng-class="$ctrl.comref===comment.id ? 'comment-highlight' : ''">
					<span ng-show="$ctrl.depth>0">↳</span> <span class="{{$root.bodylayout}} comment-text">{{comment.user.username}}:</span> {{comment.text}}
						<a ng-click="$ctrl.comref=comment.id; $ctrl.trigger = false" style="font-size:80%">(reply)</a>
				</div>
				<div class="row">
                   <div class="col-md-12" ng-show="$ctrl.comref===comment.id" >
						<div class="form-box">
							<form>
								<div>
									<textarea id="arg-text" placeholder="@{{comment.user.username}}"
									ng-model="$ctrl.newtext" class="arg-text-form"></textarea>
								</div>
								<div>
  									<input id="args-submit" ng-click="$ctrl.instCom() ; $ctrl.trigger = true" type="submit"
  									value="Send">
								</div>
								<div>
  									<input id="args-cancel" ng-click="$ctrl.comref = null ; $ctrl.trigger = true" type="submit"
  									value="Cancel">
								</div>
								<div id="URLInputWrapper">
  									<input type="text" placeholder="{{$ctrl.hrefText}}"
  									ng-model="$ctrl.newref" id="arg-href-link" class="href-link"/>
								</div>
							</form>
						</div>
                   </div>
               </div>
				<comment-component ng-scope trigger="$ctrl.trigger" refresh="$ctrl.refresh" depth="$ctrl.depth+1" userinfo="$ctrl.userinfo" debate="$ctrl.debate" newref="$ctrl.newref" newtext="$ctrl.newtext"  comref="$ctrl.comref" comments="comment.comments"></comment-component>
			</div>
		</div>
		
		`,

	controller : commentController,
           
	bindings : {
		
		comments : "<",
		comref : "=",
		depth : "<",
		newtext : "=",
		newref : "=",
		debate : "=",
		userinfo : "=",
		trigger : "="
	
	}
});

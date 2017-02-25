var app = angular.module('ngDebate');

function commentController(){

	  var vm = this;
	
}

app.component("commentComponent", {

	template : `

		<div ng-repeat="comment in $ctrl.comments | orderBy:'timeStamp'">
			<div ng-class="$ctrl.depth>0 ? 'padComment' : 'nopadComment'">
				<span ng-show="$ctrl.depth>0">↳</span> <span class="{{$root.bodylayout}} comment-text">{{comment.user.username}}:</span> {{comment.text}}
					<a ng-click="$ctrl.comref=comment.id" style="font-size:80%">(reply)</a>
				<comment-component depth="$ctrl.depth+1" comref="$ctrl.comref" comments="comment.comments"></comment-component>
			</div>
		</div>
		
		`,

	controller : commentController,
           
	bindings : {
		
		comments : "<",
		comref : "=",
		depth : "<"
	
	}
});

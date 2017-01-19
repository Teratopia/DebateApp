var app = angular.module('ngDebate');

function debateCommentController(authenticationService, debateService, formatService, commentService) { // authenticationService as parameter
  var vm = this;
  vm.classCode = null;
  vm.leftRight = null;
  vm.allComments;

  vm.$onInit = function(){
	  	console.log("in comment controller on init")
		  commentService.indexCommentsByDebate(vm.debatefull.debate.id).then(function(res){
			  vm.allComments = res.data;
			  console.log("allComments = res.Data:")
			  console.log(vm.allComments);
		  })
  }
  
  vm.assignClass = function(arg, performances){
    return formatService.getArgPerfClass(arg, performances);
  }

  vm.isRight=function(args, performances){
    return formatService.getArgNumClass(args, performances);
  }
  
}

//Add filter on ng-repeat to sort by timestamp?
app.component('debateCommentComponent',{
  template: ` <div class="comments-display-screen">
                <div ng-repeat="comment in $ctrl.allComments | orderBy:'timeStamp'">
                          {{comment.user.username}} says: {{comment.text}} 
                </div>
              </div>`,

  controller : debateCommentController,

  bindings : {
                debatefull: '<'
//                allComments : '='
              }
});

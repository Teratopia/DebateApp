var app = angular.module('ngDebate');

function comFormController(authenticationService, userService, formatService, commentService,
		debateService) { // authenticationService as parameter
  var vm = this;
  vm.argumentText = 'type comment';
  vm.hrefText = 'insert URL';
  vm.userInfo = authenticationService.currentUser();
  vm.newText = "";
  vm.newRef = "";

  
  //for testing
  vm.debate;
  debateService.getDebate(29).then(function(res){
	  vm.debate = res.data;
  })
  //End Testing
//  vm.debate = vm.debatefull.debate;
  
  
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
	  })
  }
  
}

app.component('comFormComponent',{
  template: `<div class="form-box">
              <form>
                <div>
                  <textarea id="arg-text" placeholder="{{$ctrl.argumentText}}" ng-model="$ctrl.newText" class="arg-text-form"></textarea>
                </div>
                <div>
                  <input id="args-submit" ng-click="$ctrl.instCom()" type="submit" value="Send">
                </div>
                <div style="overflow: hidden; padding-right: .35em;">
                  <input type="text" placeholder="{{$ctrl.hrefText}}" ng-model="$ctrl.newRef" id="arg-href-link" class="href-link"/>
                </div>
              </form>
            </div>`,

  controller : comFormController

  //Commented for testing
  //  ,
//
//  bindings : {
//	  			        debatefull: '<',
//	  			        cUser : '<'
//              }
});

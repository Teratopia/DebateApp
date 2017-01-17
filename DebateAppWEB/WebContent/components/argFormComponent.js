var app = angular.module('ngDebate');

function argFormController(authenticationService, userService, formatService) { // authenticationService as parameter
  var vm = this;
  vm.argumentText = 'type argument';
  vm.hrefText = 'insert URL';
  vm.userInfo = function(){authenticationService.currentUser();}
}

app.component('argFormComponent',{
  template: `<div class="form-box">
              <form>
                <div>
                  <textarea id="arg-text" placeholder="{{$ctrl.argumentText}}" class="arg-text-form"></textarea>
                </div>
                <div>
                  <input type="text" placeholder="{{$ctrl.hrefText}}" id="arg-href-link" class="href-link"/>
                </div>
                
              </form>
            </div>

  `,

  controller : argFormController,

  bindings : {
	  			        debate: '<'
              }
});

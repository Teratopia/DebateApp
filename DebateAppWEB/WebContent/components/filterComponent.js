var app = angular.module('ngDebate');

function filterController(authenticationService) { // authenticationService as parameter
  var vm = this;

}

app.component('filterComponent',{
  template: ` <div class="container-fluid">
                  <div class="row">
                      <div class="col-md-2 col-sm-4 col-xs-6">Category One Checkbox</div>
                      <div class="col-md-2 col-sm-4 col-xs-6"></div>
                      <div class="col-md-2 col-sm-4 col-xs-6"></div>
                      <div class="col-md-2 col-sm-4 col-xs-6"></div>
                      <div class="col-md-2 col-sm-4 col-xs-6"></div>
                      <div class="col-md-2 col-sm-4 col-xs-6"></div>
                  </div>
              </div>`,

  controller : filterController,
});

var app = angular.module('ngDebate');

function appController() {
  var vm = this;
}

app.component('appComponent', {
  template : `<ng-view></ng-view>`,

  controller : appController,
});

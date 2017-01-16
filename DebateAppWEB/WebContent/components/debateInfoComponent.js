var app = angular.module('ngDebate');

function debateInfoController(authenticationService) { // authenticationService as parameter
  var vm = this;

}

app.component('debateInfoComponent',{
  template: `<div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <p style="color:#ffffff;font-size:1.5em;">Title </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p style="color:#ffffff;font-size:1em;">href </p>
                        <p style="color:#ffffff;font-size:1em;">Description </p>
                        <p style="color:#ffffff;font-size:1em;">Categories </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p style="color:#ffffff;font-size:1em;">Stances (ng-repeat)</p>
                    </div>
                </div>
            </div>`,

  controller : debateInfoController,
});

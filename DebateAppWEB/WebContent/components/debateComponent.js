var app = angular.module('ngDebate');

function debateController(authenticationService, $timeout) { // authenticationService
																// as parameter
  var vm = this;
  vm.currentUser = authenticationService.currentUser();
  vm.allComments;

  vm.guest = function(){
    if(vm.currentUser === undefined){
        return "guest";
    }else{
        return vm.currentUser.username;
    }
  }

  vm.isParticipant = function(){
	  var flag = false;
    if(vm.currentUser !== undefined){
      vm.debatefull.roster.forEach(function(team){
        team.forEach(function(member){
//          console.log("PARTICIPANTS:" + member)
          if(member===vm.currentUser.id){
            flag = true;
          }
        });
      });
    }
//    console.log("IS PARTICIPANT:")
//    console.log(flag);
    return flag;
    }
}

app.component('debateComponent',{
  template: `<nav-component></nav-component>
            <div class="container-fluid">
               <div class="row">
                   <div class="col-lg-7 col-md-7" style="padding:0px;">
                       <div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <div style="height:1.6em">
                                           <p style="font-size:1.5em">{{$ctrl.debatefull.debate.issue.title}}</p>
                                       </div>
                                   </div>
                               </div>
                               <debate-info-component debate="$ctrl.debatefull.debate"></debate-info-component>
                           </div>
                           <comment-master-component debatefull="$ctrl.debatefull"></comment-master-component>
                       </div>
                   </div>
                   <div class="col-lg-5 col-md-5">
                       <div class="row">
                           <div class="col-md-12">
                               <p style="font-size:1.5em;">Live Debate Feed (viewing as {{$ctrl.guest()}}):</p>
                           </div>
                           <div class="col-md-12">
								<ct-component debatefull = "$ctrl.debatefull"></ct-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                                <debate-argument-component debatefull="$ctrl.debatefull"></debate-argument-component>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                               <arg-form-component ng-show="$ctrl.isParticipant()" debatefull="$ctrl.debatefull"></arg-form-component>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`,

  controller : debateController,

  bindings : {
                debatefull: '<',
              }
});



//<div class="col-md-12">
//<div class="row">
//    <div class="col-md-12">
//        <p style="font-size:1em;">Commentary:</p>
//        <debate-comment-component debatefull="$ctrl.debatefull" allComments="$ctrl.allComments"></debate-comment-component>
//    </div>
//</div>
//<div class="row">
//    <div class="col-md-12" ng-show="!$ctrl.isParticipant()" >
//        <com-form-component ng-show="!$ctrl.isParticipant()" allComments="$ctrl.allComments" debatefull="$ctrl.debatefull"></com-form-component>
//    </div>
//</div>
//</div>

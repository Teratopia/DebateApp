var app = angular.module('ngDebate');

function debateController(authenticationService, $timeout) { // authenticationService as parameter
  var vm = this;

  vm.currentUser = function(){
    return authenticationService.currentUser()
  }

  vm.guest = function(){
    if(isNaN(vm.currentUser().id)){
        return "guest";
    }else{
        return vm.currentUser().username;
    }
  }

  vm.isParticipant = function(){
    var cUser = vm.currentUser();
    vm.debatefull.roster.forEach(function(team){
      team.forEach(function(member){
        if(member===cUser.id){
          return true;
        }
      });
    });
    return false;
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
                                       <p style="font-size:1.5em;">{{$ctrl.debatefull.debate.issue.title}}</p>
                                   </div>
                               </div>
                               <debate-info-component debate="$ctrl.debatefull.debate"></debate-info-component>
                           </div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <p style="font-size:1em;">Commentary:</p>
                                       <div class="comments-display-screen"></div>
                                   </div>
                               </div>
                               <div class="row">
                                   <div class="col-md-12">
                                       <p style="font-size:1.5em;">Add Comment Form Field</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-5 col-md-5">
                       <div class="row">
                           <div class="col-md-12">
                               <p style="font-size:1.5em;">Live Debate Feed (viewing as {{$ctrl.guest()}}):</p>
                           </div>
                           <div class="col-md-12">
                               <div style="/*float:left;*//*width:20px;*/min-height:20px;margin:0px 0px 10px 0px;background:rgb(30,30,30);background:rgba(248,19,4,0.5);/*-webkit-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*-moz-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*/"></div>
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
                debatefull: '<'
              }
});

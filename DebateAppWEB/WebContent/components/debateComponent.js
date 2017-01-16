var app = angular.module('ngDebate');

function debateController(authenticationService) { // authenticationService as parameter
  var vm = this;

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
                                       <p style="font-size:1.5em;">Title</p>
                                   </div>
                               </div>
                               <debate-info-component></debate-info-component>
                           </div>
                           <div class="col-md-12">
                               <div class="row">
                                   <div class="col-md-12">
                                       <p style="font-size:1em;">Commentary:</p>
                                       <div class="display-screen" style="min-height: 280px"></div>
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
                               <p style="font-size:1.5em;">Live Debate Feed:</p>
                           </div>
                           <div class="col-md-12">
                               <div style="/*float:left;*//*width:20px;*/min-height:20px;margin:0px 0px 10px 0px;background:rgb(30,30,30);background:rgba(248,19,4,0.5);/*-webkit-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*-moz-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*//*box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);*/"></div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12" style="/*padding:0px;*/">
                        	   <!-- style="overflow:hidden;min-height:396px;margin:5px;background:rgb(30,30,30);background:rgba(249,249,249,0.1);-webkit-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);-moz-box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);box-shadow:inset 4px 4px 40px -10px rgba(0,0,0,0.7),3px 3px 5px 1px rgba(0,0,0,0.1);" -->
                               <div class="display-screen" style="min-height:396px"></div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-12">
                               <p style="font-size:1.5em;">Add Argument Form Field</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`,

  controller : debateController,
});

//<v-pane-content ng-repeat="stance in BIND STANCES LIST HERE!!!!" ng-disabled="LOGIC TEST FOR STANCES CASE OF EMPTY!!!!">
//{{stance}}
//</v-pane-content>

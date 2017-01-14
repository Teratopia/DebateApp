var app = angular.module('ngTodo');

function todosController(todoService, todoAuthenticationService) { // Name todosController and load todoService and todoAuthenticationService as parameters
  var vm = this;
  vm.message = 'ngTODO'; //
  vm.showComplete = false;
  vm.todos = [];
  vm.task;
  vm.logoutUser = function(x){todoAuthenticationService.logout()};
  vm.checkLogin = function(x){return todoAuthenticationService.isLoggedIn()};
  vm.newTodo = function(x){
	  			todoService.createTodo(x)
	  				.then(vm.loadTodos);
  };

  vm.deleteTodo = function(x){todoService.deleteTodo(x).then(vm.loadTodos)};
  vm.updateTodo = function(id, t){todoService.updateTodo(id,t).then(vm.loadTodos)};

  vm.loadTodos = function(){
    todoService.getTodos()
      .then(function(response){
        vm.todos = response.data;
      });
  }

  vm.loadTodos();

  vm.todosCounter = function(todos){
    var count = 0;
    todos.forEach(function(todo){
      if(!todo.completed){
        count++;
      }
    });
    return count;
  }

  vm.styleHeader = function(todosCount){
    if(todosCount < 3){
      return 'green';
    } else if (todosCount < 6) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  vm.strikeThrough = function(completed){
    if(completed){
      return 'strike-through';
    }else{
      return "";
    }
  }
}

app.component('todosComponent',{

  template: `
      <div class="container-fluid" style="padding:0;">
          <nav ng-class="$ctrl.styleHeader($ctrl.todosCounter($ctrl.todos))" class="navbar navbar-default navigation-clean-search">
              <div class="container-fluid">
                  <div class="navbar-header"><a class="navbar-brand navbar-link" href="#">{{$ctrl.message}}( {{$ctrl.todosCounter($ctrl.todos)}} ) </a>
                      <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                  </div>
                  <div class="collapse navbar-collapse" id="navcol-1">
                      <ul class="nav navbar-nav">
                          <li class="active" role="presentation"><a href="#">ToDos </a></li>
                          <li role="presentation"><a href="#">About </a></li>
                          <li role="presentation"><a href="#">Contact </a></li>
                          <li ng-show="$ctrl.checkLogin()" ng-click="$ctrl.logoutUser()" role="presentation"><a href="#">LogOut </a></li>
                          <li ng-hide="$ctrl.checkLogin()" role="presentation"><a href="./#!/login">LogIn </a></li>
                      </ul>
                      <div style="display: inline-block" class="navbar-right" >
                          <form class="navbar-form navbar-right" target="_self">
                              <div class="form-group" style="width:100%;">
                                  <input class="form-control search-field" type="search" name="search" id="search-field" style="width:100%;">
                              </div>
                          </form>
                          <a class="btn btn-default navbar-btn navbar-right action-button" role="button" href="#">ADD TODO</a>
                      </div>
                  </div>
              </div>
          </nav>
      </div>
             <input type="text" id="textInput" placeholder="Enter a new Todo " ng-model="$ctrl.task" /><button id="todoAdd" ng-click="$ctrl.newTodo($ctrl.task)">Add</button>
             <todos-table-component delete="$ctrl.deleteTodo" todos="$ctrl.todos" update="$ctrl.updateTodo" show="$ctrl.showComplete" strike="$ctrl.strikeThrough"></todos-table-component>
             <label>Show completed tasks: </label><input type="checkbox" ng-model="$ctrl.showComplete"/>
             <footer-component todos="$ctrl.todos"></footer-component>`,
  controller : todosController,
});

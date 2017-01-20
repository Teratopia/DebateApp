angular.module('ngDebate').factory(
		'formatService',
		function($http, authenticationService) {
			var service = {};
			var colors = [ "ivory", "blue", "pink", "tomato",
					"pale-golden-rod", "light-green", "pale-turquoise",
					"thistle", "lemon-chiffon", "sea-green", "drab" ];

			function compare(a,b) {
			  if (a.id < b.id)
			    return -1;
			  if (a.id > b.id)
			    return 1;
			  return 0;
			}

			service.getTheme = function(theme){
				if(theme){
					return "light-theme";
				}else{
					return "dark-theme";
				}
			}
			
			service.getBarClass = function(index) {
						if (index === 0) {
 							return colors[0] + " bar-right";
						} else {
 							return colors[1] + " bar-left";
						}
				}

			service.getArgPerfClass = function(arg, performances) {

				performances.sort(compare);

				for (var i = 0; i < performances.length; i++) {
					if (arg.perfMember.performance.id === performances[i].id) {
//						console.log(arg.perfMember.performance);
//						console.log(performances);
						if (i === 0) {
// 							console.log(colors[i] + " arg-right");
							return colors[i] + " arg-right";
						} else {
// 							console.log(colors[i] + " arg-left");
							return colors[i] + " arg-left";
						}
					}
				}
			}

			service.getPerformanceClass = function(index) {
				if (index === 0) {
					return colors[index] + " arg-right";
				} else {
					return colors[index] + " arg-left";
				}
			}

			service.getArgNumClass = function(arg, performances) {

				performances.sort(compare);

				for (var i = 0; i < performances.length; i++) {
					if (arg.perfMember.performance.id === performances[i].id) {
						if (i === 0) {
							return "arg-index-number-right";
						} else {
							return "arg-index-number-left";
						}
					}
				}
			}

			return service;
		});

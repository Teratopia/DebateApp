angular.module('ngDebate').factory(
		'formatService',
		function($http, authenticationService) {
			var service = {};
			var colors = [ "ivory", "blue", "pink", "tomato",
					"pale-golden-rod", "pale-turquoise", "thistle",
					"lemon-chiffon" ];

			service.getArgPerfClass = function(arg, performances) {
				for (var i = 0; i < performances.length; i++) {
					if (arg.perfMember.performance.id === performances[i].id) {
						console.log("ARG ID" + arg.perfMember.performance.id);
						console.log("PERFORMANCE ID" + performances[i].id);
						if (i === 0) {
							return colors[i] + " arg-right";
						} else {
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

app.directive("ngFilters", []).filter("index", function() {
  "use strict";
  return function(input, model) {
    return model.indexOf( input );  
  }
});

app.directive("ngFilters", []).filter("limit", function() {
  "use strict";
 	return function(input, limit) {
 		
 	}
});

app.directive("ngFilters", []).filter("findpath", function() {
  "use strict";
  return function(input) {
    if (input) {
      return "uploads/" + input.split('/').pop();
    }
  } 
});

// limites amount displayed
app.directive("ngFilters", []).filter("range", function() {
  "use strict";
  return function(input, total) {
    total = parseInt(total);
    console.log(input, total);
  };
});

// capitalize first letters
app.directive('ngFilters', []).filter('capitalize', function () {
    "use strict";
    return function (input) {
      if (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
      }
    };
});
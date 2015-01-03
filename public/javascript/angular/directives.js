
// get files from upload fields
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

// capitalize first letters
app.directive('ngFilters', []).filter('capitalize', function () {
    "use strict";
    return function (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});

app.directive('ngFadeIn', function() {
  "use strict";
  return function(scope, el, attr) {
    scope.$watch(attr.ngShow, function toggleFade() { 
      angular.element(el).addClass('active');
    });
  }
});


// draggable image 
app.directive('ngImageDrag', ["$document", function($document) {
    return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    }
}]);

app.directive('ngDropBox', function() {
  return {
    scope: {
      drop: '&' // parent
    },
    link: function(scope, element) {
      var el = element[0] 
    
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropeffect = 'move';
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
      false
      )

      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      )

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      )

      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          this.classList.remove('over');

          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);

          return false;
        },
        false
      );
    } 
  }
});



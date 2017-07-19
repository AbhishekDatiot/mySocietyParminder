(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('customValidate', function () {
            return {
                // limit usage to argument only
                restrict: 'A',
                scope: {
                    validateField: '='
                },
                // require NgModelController, i.e. require a controller of ngModel directive
                require: 'ngModel',
                link: function (scope, element, attr, ctrl) {
                    function customValidator(ngModelValue) {
                        if (scope.validateField == ngModelValue) {
                            ctrl.$setValidity('passwordValidator', false);
                        } else {
                            ctrl.$setValidity('passwordValidator', true);
                        }

                        // we need to return our ngModelValue, to be displayed to the user(value of the input)
                        return ngModelValue;
                    }

                    // we need to add our customValidator function to an array of other(build-in or custom) functions
                    // I have not notice any performance issues, but it would be worth investigating how much
                    // effect does this have on the performance of the app
                    ctrl.$parsers.push(customValidator);
                }
            };
        });

})();
(function () {
    angular.module('app').factory('toasterService', toasterService);

    toasterService.$inject = ['toaster'];

    function toasterService(toaster) {
        return {
            clear: clear,
            responseError: responseError,
            success: success,
            wait: wait,
            warning: warning,
            error: error
        };

        function clear() {
            toaster.clear();
            return this;
        }

        function success(title, body) {
            toaster.pop('success', title, body, 10000);
        }

        function responseError(response) {
            toaster.pop((response.status >= 500 ? 'error' : 'warning'), 'Erro: ' + response.status + ' - ' + response.statusText, response.data.message, 20000);
        }

        function wait(title, body) {
            toaster.pop('wait', title, body);
        }

        function warning(title, body) {
            toaster.pop('warning', title, body, 10000);
        }

        function error(title, body) {
            toaster.pop('error', title, body, 10000);
        }
    }
})();
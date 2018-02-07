(function () {
    angular.module('app').factory('produtoService', produtoService);

    produtoService.$inject = ['$resource'];

    function produtoService($resource) {
        var api = $resource(API_URL + '/v1/produtos/:id', {id: '@id'});

        return {
            criarResource : criarResource,
            buscarProdutos: getProdutos
        };

        function criarResource() {
            return new api();
        }

        function getProdutos() {
            return api.query().$promise;
        }
    }
})();
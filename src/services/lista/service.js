(function () {
    angular.module('app').factory('listaService', listaService);

    listaService.$inject = ['$resource'];

    function listaService($resource) {
        var api = $resource(API_URL + '/v1/listas/:id', {id: '@id'});

        return {
            buscarListas: buscarListas,
            salvarLista: salvarLista
        };

        function buscarListas() {
            return api.query().$promise;
        }

        function salvarLista(dados) {
            var lista = new api();
            lista.dados = dados;
            return lista.$save();
        }
    }
})();
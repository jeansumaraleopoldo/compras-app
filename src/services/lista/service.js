(function () {
    angular.module('app').factory('listaService', listaService);

    listaService.$inject = ['$resource'];

    function listaService($resource) {
        var api = $resource(API_URL + '/v1/lista/:id', {id: '@id'});

        return {
            salvarLista: salvarLista
        };

        function salvarLista(dados) {
            var lista = new api();
            lista.dados = dados;
            return lista.$save();
        }
    }
})();
(function () {
    app.controller('ListaController', ListaController);

    function ListaController(lista, $scope) {

        iniciar();

        $scope.valorTotal = valorTotal;

        function iniciar() {
            valorTotal();
            $scope.lista = lista;
        }

        function valorTotal() {
            var valorTotal = 0;
            lista.produtos.forEach(function (produto) {
               valorTotal += produto.valor * produto.quantidade;
            });
            return valorTotal;
        }
    }
})();
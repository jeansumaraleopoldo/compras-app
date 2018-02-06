(function () {
    angular.module('app').controller('ProdutoController', ProdutoController);

    ProdutoController.$inject = ['produtoService'];

    function ProdutoController(produtoService) {
        iniciar();

        function iniciar() {
            getProdutos();
        }

        function getProdutos() {
            produtoService.getProdutos().then(function (value) {
                console.log('ok');
            });
        }
    }
})();
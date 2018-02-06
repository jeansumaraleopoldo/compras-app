(function () {
    angular.module('app').controller('ProdutoController', ProdutoController);

    ProdutoController.$inject = ['produtoService', 'listaService'];

    function ProdutoController(produtoService, listaService) {
        var vm = this;

        vm.adicionarProduto = adicionarProduto;
        vm.finalizarLista   = finalizarLista;
        vm.salvar           = salvar;

        iniciar();

        function iniciar() {
            vm.produtosPendentes = [];
            getProdutos();
        }

        function adicionarProduto() {
            vm.produtosAdicionar.push({
                nome:       '',
                valor:      '',
                imagem:     '',
                quantidade: ''
            });
        }

        function finalizarLista() {
            listaService.salvarLista(vm.produtosPendentes)
                .then(function (response) {
                    console.log(response);
                });
        }

        function getProdutos() {
            produtoService.getProdutos()
                .then(function (produtos) {
                    vm.produtos = produtos;
                });
        }

        function salvar() {
            vm.produtoAdicionar.valorTotal = vm.produtoAdicionar.produto.valor * vm.produtoAdicionar.quantidade;
            console.log(vm.produtoAdicionar);
            vm.produtosPendentes.push(vm.produtoAdicionar);
            vm.produtoAdicionar = undefined;
        }

    }
})();
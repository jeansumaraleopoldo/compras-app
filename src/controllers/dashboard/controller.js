(function () {
    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['produtoService', 'listaService', 'toasterService', '$timeout', 'ModalService'];

    function DashboardController(produtoService, listaService, toasterService, $timeout, ModalService) {
        var vm = this;

        vm.abrirLista = abrirLista;
        vm.adicionarProduto = adicionarProduto;
        vm.adicionarNovaLista = adicionarNovaLista;
        vm.cancelarLista = cancelarLista;
        vm.finalizarLista = finalizarLista;
        vm.removerProduto = removerProduto;
        vm.salvar = salvar;
        vm.salvarProduto = salvarProduto;
        vm.valorTotal = valorTotal;

        iniciar();

        function iniciar() {

            vm.produtosPendentes = [];
            adicionarProduto();
            buscarProdutos();
            buscarListas();
        }

        function abrirLista(lista) {
            ModalService.showModal({
                templateUrl: "modal.html",
                controller: "ListaController",
                inputs: {
                    lista: lista
                }
            }).then(function(modal) {
                modal.element.modal();
            });
        }

        function adicionarNovaLista() {
            vm.produtosPendentes.splice(0, vm.produtosPendentes.length);
        }

        function adicionarProduto() {
            vm.produto = produtoService.criarResource();
        }

        function cancelarLista() {
            vm.produtosPendentes.splice(0, vm.produtosPendentes.length);
        }

        function finalizarLista() {
            vm.finalizandoLista = true;
            listaService.salvarLista(vm.produtosPendentes)
                .then(function () {
                    vm.produtosPendentes.splice(0, vm.produtosPendentes.length);
                    toasterService.success('Lista adicionada');
                    vm.finalizandoLista = false;
                    buscarListas();
                })
                .catch(function (response) {
                    toasterService.responseError(response);
                });
        }

        function buscarProdutos() {
            $timeout(function () {
                toasterService.wait('Carregando os produtos');
            }, 100);
            produtoService.buscarProdutos()
                .then(function (produtos) {
                    toasterService.clear();
                    vm.produtos = produtos;
                })
                .catch(function (response) {
                    toasterService.responseError(response);
                });
        }

        function buscarListas() {
            $timeout(function () {
                listaService.buscarListas()
                    .then(function (listas) {
                        vm.listas = listas;
                    })
                    .catch(function (response) {
                        toasterService.responseError(response);
                    });
            }, 100);
        }

        function removerProduto(key) {
            toasterService.success('Produto removido');
            vm.produtosPendentes.splice(key, 1);
        }

        function salvar() {
            vm.produtoAdicionar.valorTotal = vm.produtoAdicionar.produto.valor * vm.produtoAdicionar.quantidade;
            vm.produtosPendentes.push(vm.produtoAdicionar);
            vm.produtoAdicionar = undefined;
        }

        function salvarProduto() {
            vm.salvandoProduto = true;
            vm.produto.$save()
                .then(function () {
                    toasterService.success('Produto adicionado');
                    vm.salvandoProduto = false;
                    buscarProdutos();
                    adicionarProduto();
                })
                .catch(function (response) {
                    toasterService.responseError(response);
                });
        }

        function valorTotal() {
            var valorTotal = 0;
            vm.produtosPendentes.forEach(function (produto) {
                valorTotal += produto.valorTotal;
            });
            return valorTotal;
        }
    }
})();
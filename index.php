<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="funcoes.js" type="text/javascript"></script>
        <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
      
    </head>
    <body onload = "carregaTickets()">
        <section> 
            <div class="container">
                <div class="table-responsive">
                    <div class="cpl-md-6 ">
                        <h1>Tickets</h1>
                        <h2></h2>
                        <h4>Click em "Nome" para ordenar por nome. <br>Click em "Prioridade" para ordenar por prioridade.<br>Click em "Data Criação" para ordenar por data de criação.<br>Click em "Intervalo de data" para ordenar por dias de espera.<br>Click em "Data Atualização" para ordenar por data de atualização.</h4>
                        <div align="left">
                            <button type="button" id="save"class="btn btn-default">Salvar JSON</button>
                        </div>
                        <div align="right">
                            Pesquisa: <input type="text" size="40" name="pesquisa" id="idPesquisa" maxlength="5" placeholder="Digite o intervalo de dias, ou o nivel de prioridade">
                            <!--<button type="button" id="idBtnPesquisa"class="btn btn-default">Pesquisar</button>-->
                        </div>
                        <table class="table table-striped table-hover" id="tickets">
                            <caption>Tickets</caption> 
                            <thead> 
                                 
                                <th>ID Ticket</th>
                                <th>ID Categoria</th>
                                <th>ID Cliente</th>
                                <th id="idNome">Nome</th>
                                <th>Email</th>
                                <th id="idDataCriacao" >Data Criação</th>
                                <th id="idDataAtt">Data Atualização</th> 
                                <th id="idIntervaloData">Intervalo de data</th>
                                <th>Assunto Mensagens</th>
                                <th id="idPrioridade">Prioridade</th>
                                
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div align="center">
                            <a href="index.php?pagina=1">1</a> <a href="index.php?pagina=2">2</a> <a href="index.php?pagina=3">3</a> <a href="index.php?pagina=4">4</a> <a href="index.php?pagina=5">5</a>
                        </div>
                        
                        <h3></h3>
                    </div>
                </div>
            </div>
        </section>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    </body> 
</html>

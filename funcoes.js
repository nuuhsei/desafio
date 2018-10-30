function dynamicSort(property) {
    var sortOrdena = 1;
    if(property[0] === "-") {
        sortOrdena = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var resultado = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return resultado * sortOrdena;
    }
}
function carregaTickets(){
    var ticket = "", url = "tickets.json";
   
    $.ajax({
        url: url,
        cache: false, 
        dataType: "json",
        beforeSend: function(){
            $("h2").html("Carregando...");
        },
        error: function(){
            $("h2").html("Erro Desconhecido");
        },
        success: function(retorno){
            if(retorno[0].erro){
                $("h2").html(retorno[0].erro);
            }
            else{
                retorno.sort(dynamicSort("CustomerName"));
                carregaTabela(retorno);

                $('#idPesquisa').keyup(function(){
                    var pesquisa = $('#idPesquisa').val();
                    
                    if(pesquisa.toLowerCase() == "alta"){
                        retorno.sort(dynamicSort("CustomerName"));
                        carregaTabela(retorno, pesquisa);
                    }
                    else if(pesquisa.toLowerCase() == "baixa"){
                        retorno.sort(dynamicSort("CustomerName"));
                        carregaTabela(retorno, pesquisa);
                    }
                    else if($.isNumeric( pesquisa ) == true){
                        retorno.sort(dynamicSort("CustomerName"));
                        carregaTabela(retorno, pesquisa);
                    }
                    /*else{
                        swal('Pesquisa não encontrada');
                        retorno.sort(dynamicSort("CustomerName"));
                        carregaTabela(retorno);
                    }*/
                    //console.log(pesquisa.toLowerCase());
                    //carregaTabela(retorno);
                });
                $('#idNome').bind('click', function() {
                    retorno.sort(dynamicSort("CustomerName"));
                    carregaTabela(retorno);
                });
                $('#idDataCriacao').bind('click', function() {
                    retorno.sort(dynamicSort("DateCreate"));
                    carregaTabela(retorno);
                });
                $('#idDataAtt').bind('click', function() {
                    retorno.sort(dynamicSort("DateUpdate"));
                    carregaTabela(retorno);
                });
                $('#idPrioridade').bind('click', function() {
                    retorno.sort(dynamicSort("Priority"));
                    carregaTabela(retorno);
                });
                $('#idIntervaloData').bind('click', function() {
                    retorno.sort(dynamicSort("DifferenceDate"));
                    carregaTabela(retorno);
                });
                $('#save').bind('click', function() {
                    $.ajax({
                        type: "POST",
                        dataType : 'json',
                        async: false,
                        url: 'salvajson.php',
                        data: { data: JSON.stringify(retorno) },
                        success: function () {alert("Deu certo"); },
                        failure: function() {alert("Error!");}
                    });
                });
            }
        }
    });
    
}
function carregaTabela(retorno,pesquisa){
    var data        ="0";
    var prioridade  = "";
    var pontuacao   = 0;
    var ticket      = "";
    var total = 0;
    //(isset($_GET['pagina']))? $_GET['pagina'] : 1;
    //var pagina = $_GET['pagina'];
    /*
    //Paginação
        var parts = window.location.search.substr(1).split("&");
        var $_GET = {};
        for (var i = 0; i < parts.length; i++) {
            var temp = parts[i].split("=");
            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }
        var pagina = $_GET.pagina;
        //console.log(pagina);
        if(!pagina){
             var pagina = 1;
        }
        
       
         //conta o total de itens 
        total = retorno.length; 
     
        //seta a quantidade de itens por página, neste caso, 2 itens 
         var registros = 5; 
     
        //calcula o número de páginas arredondando o resultado para cima 
        var numPaginas = total/registros; 
     
        //variavel para calcular o início da visualização com base na página atual 
        var inicio = (registros*pagina)-registros; 
        if(pagina != 1){
            registros = registros*pagina;
        }*/
    //Paginação FIM
    if(!pesquisa){
        var pesquisa = null;
    }
    var inicio = 0;
    var registros = retorno.length;
    for(var i = inicio; i < registros; i++){         
        var dataC = new Date(retorno[i].DateCreate);
        var date = dataC.getDate();
            if(date < 10){
                dateZero = "0";
            }else{dateZero = "";}     

        var month = dataC.getMonth(); month += 1;
            if(month < 10){
                monthZero = "0";
            }else{monthZero = "";}                     
        var year = dataC.getFullYear();

        var dataU = new Date(retorno[i].DateUpdate);
        var dateU = dataU.getDate();
            if(dateU < 10){
                dateUZero = "0";
            }else{dateUZero = "";}
                            
        var monthU = dataU.getMonth(); monthU += 1;
            if(monthU < 10){
                monthUZero = "0";
            }else{monthUZero = "";}                    
        var yearU = dataU.getFullYear();
        
        var diff = Date.parse(retorno[i].DateUpdate) - Date.parse(retorno[i].DateCreate);
        var pontosData = Math.floor(diff / 86400000);
        //console.log(pontosData);
        // pontosData será usado para medir grandes tempo de espera como 30 dias de espera é aproximadamente 31 pontos, porporcionalmente, com 45 dias serão 46,5 pontos 

        var assunto = retorno[i].Interactions[0].Subject;
        var msn = retorno[i].Interactions[0].Message;
        msn.toLowerCase();
        var dataCreate = dateZero+date+"/"+monthZero+month+"/"+year;
        var dataUpdate = dateUZero+dateU+"/"+monthUZero+monthU+"/"+yearU;
        //var separaString = msn.split(" ");

        pontuacao = pontosData; // aproximadamente 1 ponto por dia de atraso
        if(assunto == "Reclamação"){
            pontuacao += 60;
        }
        else if(assunto == "Elogios"){
            pontuacao -= 20;
        }    
        else if(assunto == "Dúvida" || assunto == "Esclarecer uma dúvida" || assunto == "Tamanho diferente" || assunto == "troca de produto"){
            pontuacao += 50;
        }
        else if(msn.indexOf("sensacional") != -1 || msn.indexOf("bom") != -1 || msn.indexOf("otimo") != -1 || msn.indexOf("parabens") != -1 || msn.indexOf("gentileza") != -1 || msn.indexOf("simpaticos") != -1){
            pontuacao -= 20;
        }
         else if(msn.indexOf("prazo") != -1 || msn.indexOf("Infelizmente") != -1 || msn.indexOf("soluçao") != -1 || msn.indexOf("diferença") != -1 || msn.indexOf("manchando") != -1 || msn.indexOf("estragar") != -1 || msn.indexOf("pena") != -1 || msn.indexOf("poxa") != -1 || msn.indexOf("defeitos") != -1 || msn.indexOf("garantia") != -1 || msn.indexOf("errado") != -1 || msn.indexOf("boa tarde!") != -1){
            pontuacao += 60;
              }

        if(pontuacao >= 70){
            prioridade = "Alta";
        }
        else if(pontuacao < 70){
            prioridade = "Baixa";
        }
       // Retorno.forEach(function(retorno) { retorno.Priority = prioridade; });
        retorno[i].Priority = prioridade;
        retorno[i].Points = pontuacao;
        retorno[i].DifferenceDate = pontosData;
        var TicketID         = retorno[i].TicketID;
        var CategoryID       = retorno[i].CategoryID;
        var CustomerID       = retorno[i].CustomerID;
        var CustomerName     = retorno[i].CustomerName;
        var CustomerEmail    = retorno[i].CustomerEmail;
        var Priority         = retorno[i].Priority;
        var DifferenceDate   = retorno[i].DifferenceDate;
        //var retorno[i] = <?php //echo json_encode($retorno[i]) ?>;
        //console.log(pesquisa);
        
        if(pesquisa == "alta"){
            if(Priority == "Alta"){
                ticket += "<tr>";
                    ticket += "<td>" +TicketID+ "</td>";
                    ticket += "<td>" +CategoryID+ "</td>";
                    ticket += "<td>" +CustomerID+ "</td>";
                    ticket += "<td>" +CustomerName+ "</td>";
                    ticket += "<td>" +CustomerEmail+ "</td>";
                    ticket += "<td>" +dataCreate+ "</td>";
                    ticket += "<td>" +dataUpdate+ "</td>";
                    ticket += "<td>" +DifferenceDate+ "</td>";
                    ticket += "<td>" +assunto+ "</td>";
                    ticket += "<td>" +Priority+ "</td>"; 
                    //ticket += "<td>" +pontosData+ "</td>";
                ticket += "</tr>";
        }
        }
        else if(pesquisa == "baixa"){
            if(Priority == "Baixa"){
                ticket += "<tr>";
                    ticket += "<td>" +TicketID+ "</td>";
                    ticket += "<td>" +CategoryID+ "</td>";
                    ticket += "<td>" +CustomerID+ "</td>";
                    ticket += "<td>" +CustomerName+ "</td>";
                    ticket += "<td>" +CustomerEmail+ "</td>";
                    ticket += "<td>" +dataCreate+ "</td>";
                    ticket += "<td>" +dataUpdate+ "</td>";
                    ticket += "<td>" +DifferenceDate+ "</td>";
                    ticket += "<td>" +assunto+ "</td>";
                    ticket += "<td>" +Priority+ "</td>"; 
                ticket += "</tr>";
            }
        }
        else if($.isNumeric( pesquisa ) == true){
            if(DifferenceDate == pesquisa){
                ticket += "<tr>";
                    ticket += "<td>" +TicketID+ "</td>";
                    ticket += "<td>" +CategoryID+ "</td>";
                    ticket += "<td>" +CustomerID+ "</td>";
                    ticket += "<td>" +CustomerName+ "</td>";
                    ticket += "<td>" +CustomerEmail+ "</td>";
                    ticket += "<td>" +dataCreate+ "</td>";
                    ticket += "<td>" +dataUpdate+ "</td>";
                    ticket += "<td>" +DifferenceDate+ "</td>";
                    ticket += "<td>" +assunto+ "</td>";
                    ticket += "<td>" +Priority+ "</td>"; 
                ticket += "</tr>";
            }
        }
        
        else{
            ticket += "<tr>";
                ticket += "<td>" +TicketID+ "</td>";
                ticket += "<td>" +CategoryID+ "</td>";
                ticket += "<td>" +CustomerID+ "</td>";
                ticket += "<td>" +CustomerName+ "</td>";
                ticket += "<td>" +CustomerEmail+ "</td>";
                ticket += "<td>" +dataCreate+ "</td>";
                ticket += "<td>" +dataUpdate+ "</td>";
                ticket += "<td>" +DifferenceDate+ "</td>";
                ticket += "<td>" +assunto+ "</td>";
                ticket += "<td>" +Priority+ "</td>"; 
            ticket += "</tr>";
        }
        
        
    }
    $("#tickets tbody").html(ticket);
    
    $("h2").html("");
                
}
window.TestsView = Backbone.View.extend({


    events: {
        "click #addLine": "adicionarPergunta", ////O Trigger é o Botão novo
        "click #Criar": "beforeSend",
        "click #removeLine": "removerPergunta",
        "click #newTest": "newTestPopup",
        "submit #newPopUpTest": "newTest",


    },

    // beforeSend: function (e) {
    //     e.preventDefault();
    //
    //     modem('POST', '/api/test/new',
    //         function (json) {
    //         },
    //         function (xhr, ajaxOptions, thrownError) {
    //         },
    //         encodeURI(JSON.stringify($("#newTest").serializeObject()))
    //     );
    //
    // },

    newTest: function(){

        modem('POST', '/api/popuptest',
            function (json) {
                $("#newTestModal").modal('hide');
            },
            function (xhr, ajaxOptions, thrownError) {
                //Mandar Uma Mensgame QUalquer
            },
            encodeURI(JSON.stringify($("#newPopUpTest").serializeObject()))
        );

    },

//Vai abrir Popup para criar novo teste
    newTestPopup: function(e){
        e.preventDefault();

        $("#newTestModal").modal('show');

    },

    //O Trigger é o Botão novo , vai criar uma linha com
    //-Tema     -Nivel      -Qnt
    //-Dados    -Facil      -1
    //-Decisão  -Médio      -2
    //-..        -..         -..
    adicionarPergunta: function (){
        var $html = $('<div id="line" class="col-md-12 col-xs-12"><br><div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="ddCategoria" name="category" class="form-control mandatory"> <option disabled selected>Tema</option> <option value="1">Cálculo Computacional</option> <option value="2">Decisão</option> <option value="3">Iteração</option> <option value="4">Arrays</option> <option value="5">Funções</option> </select> </div> </div> <div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="ddDificuldade" name="difficulty" class="form-control mandatory"> <option disabled selected>Nivel</option> <option value="1">Fácil</option> <option value="2">Médio</option> <option value="3">Dificil</option> </select> </div> </div> <div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="dCategoria" name="number" class="form-control mandatory"> <option disabled selected>Qnt</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select> </div> </div></div> ');
        var str = $html.prop('outerHTML');
        console.log(str);
        $("#1line").append($html);

    },

    //O Trigger é o Botão Rem , vai remover a ultima linha criada pelo adicionar pergunta
    removerPergunta: function (){
        $("#line:last-child").remove();
    },



    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});

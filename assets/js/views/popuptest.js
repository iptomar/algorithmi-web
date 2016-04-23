
window.PopUpTestView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",
        "click #addLine": "adicionarPergunta",
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'popuptest',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpTest").serializeObject()))
        );

    },


    adicionarPergunta: function (){
        var $html = $('<hr><div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="ddCategoria" name="category" class="form-control mandatory"> <option disabled selected>Tema</option> <option value="1">Cálculo Computacional</option> <option value="2">Decisão</option> <option value="3">Iteração</option> <option value="4">Arrays</option> <option value="5">Funções</option> </select> </div> </div> <div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="ddDificuldade" name="difficulty" class="form-control mandatory"> <option disabled selected>Nivel</option> <option value="1">Fácil</option> <option value="2">Médio</option> <option value="3">Dificil</option> </select> </div> </div> <div class="col-md-4 col-xs-4"> <div class="input-group"> <span class="input-group-addon btn-white"><i class="fa fa-book"></i></span> <select id="dCategoria" name="number" class="form-control mandatory"> <option disabled selected>Número</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select> </div> </div><hr> ');
        var str = $html.prop('outerHTML');
        console.log(str);
        $("#line").append($html);

    },


    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});

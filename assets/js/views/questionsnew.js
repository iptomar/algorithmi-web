window.QuestionsNewView = Backbone.View.extend({
    events: {
        "click #btnCriarPerg ": "beforeSend",
        "change #filePickerImg": "convertPhoto",
        "click #btnAddIO": "addIO",
        "blur .mandatory": "verify",
    },

    beforeSend: function (e) {
        var self = this;
        var isAllOk = true;
        //Evita que o browser efectue a accao por defeito
        e.preventDefault();
        //Mostra os dados na console do browser
        console.log($("form").serialize());
        //Se algum dos campos estiver vazio
        var allElements = $(".mandatory");
        $.each(allElements, function (key, elem) {
            if (isEmpty($(elem))) {
                isAllOk = false;
            }
        });

        if (isAllOk) {
            self.send();
        }
    },
    //Verifica se o elemento esta preenchido quando perde o foco
    verify: function (e) {
        isEmpty($(e.currentTarget));
    },
    send: function (e) {
        //prepara-se par enviar os dados para a API
        modem('POST', 'question',
            //Se correr tudo bem
            function (json) {
                //Mostra uma mensagem de sucesso com a string que vem da API
                sucssesMsg($(form), json.resposta);
            },
            //Se ocorrer um erro
            function (xhr, ajaxOptions, thrownError) {
                //Mostra uma mensagem de erro com a string que vem da API
                failMsg($(form), "Não foi possível alterar os dados. \n (" + JSON.parse(xhr.responseText).result + ").");
            },
            //Prepara os dados da view para os entregar a api

            $("form").serialize()
        );
    },

    //Convert Photo To Base64 String
    convertPhoto: function (e) {

        convertImage(e);

    },

    addIO: function (e) {
        e.preventDefault();
        if (isIOvalide()) {
            $("#divIOList").append($("<div>", {
                class: "divIO",
            }).append($("<div>", {
                class: "subDivIO",
            }).append('<label id="lblIO">I/O</label></br>'
                + '<b class="col-md-2">I: </b>' + $("#txtEntrada").val() + '</br>'
                + '<b class="col-md-2">O: </b>' + $("#txtSaida").val())));
        }

    },
    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
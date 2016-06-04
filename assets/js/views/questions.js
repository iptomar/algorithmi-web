window.QuestionsView = Backbone.View.extend({

    events: {
        "click #btnCriarPerg ": "send",
        "change #filePickerImg": "convertPhoto",
        "click .deleteQuestion": "confirmDelete",
        "click #btnAddIO": "addIO",
        "blur .mandatory": "verify",
    },
    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var quest = new Question({id: id});
        quest.destroy({
            success: function (scchool, response) {
                sucssesMsg($(".form"), "Escola apagada com sucesso.");


            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

            }
        })
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
        modem('POST', 'questions',
            //Se correr tudo bem
            function (json) {
                console.log(json)
                //Mostra uma mensagem de sucesso com a string que vem da API
                sucssesMsg($("form"), json.resposta);
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
        this.data = this.collection.toJSON();
        console.log(this.data)
    }
    ,

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));
        return this;
    }

})
;



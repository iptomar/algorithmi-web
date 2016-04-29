window.LoginView = Backbone.View.extend({
    events: {
        "click #btnRegist": "regist"
    },
    regist: function (e) {
        e.preventDefault();
        console.log(encodeURI(JSON.stringify($("#formRegist").serializeObject())));
        //prepara-se par enviar os dados para a API
        modem('POST', '/api/user',
            //Se correr tudo bem
            function (json) {
                //Mostra uma mensagem de sucesso com a string que vem da API
                sucssesMsg($("#formRegist"), json.resposta);
                console.log(json);
            },
            //Se ocorrer um erro
            function (xhr, ajaxOptions, thrownError) {
                //Mostra uma mensagem de erro com a string que vem da API
                failMsg($("#formRegist"), "Não foi possível alterar os dados. " + thrownError);
            },
            //Prepara os dados da view para os entregar a api
            encodeURI(JSON.stringify($("#formRegist").serializeObject()))
        )

    },
    initialize: function () {
    },
    render: function () {
        $(this.el).html(this.template());

        return this;
    }

});
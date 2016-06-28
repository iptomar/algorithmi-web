window.QuestionsInfoView = Backbone.View.extend({
    events: {
        "click #btnAddCode": "addCode",
        "click .fa-trash": "delCode"
    },


    addCode: function (e) {
        e.preventDefault();

        console.log("adding code")


        $.ajax({
            url: '/api/questions/' + this.data.id + '/' + $("#ddLanguagesList").val() + '/code',
            type: "POST",
            data: new FormData(document.getElementById("addCodeForm")),
            enctype: 'multipart/form-data',
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + window.sessionStorage.getItem("keyo"));
            },
            contentType: false
        }).done(function (data) {
            var json = JSON.parse(data);
            sucssesMsg($("form"), json.text);
            setTimeout(function () {
                document.location.reload(true);
            }, json.text.length * 45);
        }).fail(function (xhr, ajaxOptions, thrownError) {

            var json = JSON.parse(xhr.responseText);
            failMsg($("body"), json.text);

        });

    },

    delCode: function (e) {
        var questID = $(e.currentTarget).attr("question");
        var langID = $(e.currentTarget).attr("lang");
        var file = $(e.currentTarget).attr("file");
        console.log(questID)
        console.log(langID)
        modem('Delete', '/api/code',
            //Se correr tudo bem
            function (json) {
                console.log(json)
                //Mostra uma mensagem de sucesso com a string que vem da API
                sucssesMsg($("form"), "Código apagado com sucesso");
                setTimeout(function () {
                    document.location.reload(true);
                }, json.text.length * 45);
            },
            //Se ocorrer um erro
            function (xhr, ajaxOptions, thrownError) {
                //Mostra uma mensagem de erro com a string que vem da API
                failMsg($('.form'), "Não foi possível apagar o código. ");
            },
            //Prepara os dados da view para os entregar a api
            JSON.stringify({question: questID, language: langID, fileName: file})
        );
    },
    initialize: function () {
        var self = this;
        self.data = self.model.toJSON();
        populateCategoriesDD(self.data.category);
        populateDificultyDD(self.data.difficulty);


    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        return this;
    }
});

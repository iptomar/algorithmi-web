window.QuestionsEditView = Backbone.View.extend({
    events: {
        "click #btnAddCode": "addCode",
        "click #btnAddIO": "addIO",
        "click .rmvIO": "rmvIO",
        "click #btnEditPerg ": "send",
        "change #filePickerImg": "convertPhoto",
        "click .fa-trash": "delCode"
    },
//Convert Photo To Base64 String
    convertPhoto: function (e) {

        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#content > div", image, 300, 16 / 9);
        }
        reader.readAsDataURL(file);

    },
    send: function (e) {
        e.preventDefault();

        //Recolhe os IOS
        var ioList = [];

        $.each($(".subDivIO"), function (i, iIO) {
            ioList.push({input: $(iIO).find('.input').val(), output: $(iIO).find('.output').val()});
        })
        $("#txtIOlist").val(JSON.stringify(ioList));

        // POST ("/api/questions")
        var questionDetails = $("#editQuestionForm").serializeObject();
        questionDetails.ios = jQuery.parseJSON($("#txtIOlist").val())
        var question = new Question(questionDetails);
        console.log(question.attributes)
        question.save(null, {
            //Se inseriu correctamente os detalhes da pergunta
            success: function (question, response) {
                //insere os codigos da question
                sucssesMsg($(".form"), "Questão editada com sucesso!");
                //Reencaminha para a pasta de edicao
                setTimeout(function () {
                    document.location.reload(true);
                }, 3000);

            },
            error: function (inst, response) {
                // failMsg($(".form"), response.text);
            },
        })
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
    addIO: function (e) {
        e.preventDefault();

        $("#divIOList").append($("<div>", {
            class: "divIO",
        }).append($("<div>", {
            class: "subDivIO",
        }).append('<label id="lblIO">I/O</label></br><label class="col-md-6">Input</label><label class="col-md-6">Output</label></br>'
            , '<textarea class="col-md-6 input">' + $("#txtEntrada").val() + '</textarea>'
            , '<textarea class="col-md-6 output">' + $("#txtSaida").val() + '</textarea>'
        )));
    },
    rmvIO: function (e) {
        $(e.currentTarget).parent().parent().remove();
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
        self.data = this.model.toJSON();
        populateCategoriesDD(self.data.category);
        populateDificultyDD(self.data.difficulty);
        populateLanguagessDD();
        $("#ddLanguagesList option").each(function () {
            console.log($(this))
        });

    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        return this;
    }
});

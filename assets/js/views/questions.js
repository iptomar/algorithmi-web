window.QuestionsView = Backbone.View.extend({

    events: {
        "submit": "beforeSend",
        "click #newQuestion": "newQuestionPopup",
        "submit #newPopUpQuestion": "newQuestion",
        "click #addLanguage": "adicionarLinguagem",
        "click #removeLanguage": "removerLinguagem",
        "click #addIo": "addIo",
        "click #btn_questions_delete_io": "removeIo",
        "click #btn_questions_delete_All_io": "removeAllIo",


    },

    beforeSend: function (e) {
        e.preventDefault();


        modem('POST', '/api/question/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpQuestion").serializeObject()))
        );

    },

    newQuestionPopup: function (e) {
        e.preventDefault();

        $("#newQuestionModal").modal('show');

    },

    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($("#someParent"));
        }
    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());

        // this.checkAuth();

        return this;
    },

    addIo: function (e) {
        e.preventDefault();

        $("#files").append($("<div>", {
                class: "divIO",
            }).append($("<div>", {
                class: "subDivIO",
            }).append('<label id="lblIO">I/O</label></br>'
                + '<b class="col-md-12">Input: </b></br>' + $("#txtEntrada").val() + '</br>'
                + '<b class="col-md-12">Outup: </b></br>' + $("#txtSaida").val() + '</br>'
                + '<b class="col-md-5"><button id="btn_questions_edit_io" href=""><img src="assets/ico/edit.png" class="btn_questions_io"></button></b>'
                + '<b class="col-md-5"><button id="btn_questions_delete_io" href=""><img src="assets/ico/delete.png" class="btn_questions_io"></button></b></br>'
            ))
        );
    },

    //Apagar todas os I/O
    removeAllIo: function () {
        $(".divIO").remove();
    },

    removeIo: function (e) {
        e.preventDefault();

        var $removableIO = $(e.target).parent().parent().parent().parent();
        $removableIO.remove();
    },
    
    adicionarLinguagem: function () {

        var $language = $('#linguagens').find(":selected").text();
        console.log($language);

        switch ($language) {
            case "JAVA":
                $("#language")
                    .append($("<div>", {class: "col-md-2"})
                        .append($("<img>", {
                            src: "assets/ico/JAVA.png",
                            alt: "Smiley Face",
                            width: "37",
                            height: "37"
                        }))
                    );
                break;
            case "PHP":
                $("#language")
                    .append($("<div>", {class: "col-md-2"})
                        .append($("<img>", {
                            src: "assets/ico/PHP.png",
                            alt: "Smiley Face",
                            width: "37",
                            height: "37"
                        }))
                    );
                break;
            case "C":
                $("#language")
                    .append($("<div>", {class: "col-md-2"})
                        .append($("<img>", {
                            src: "assets/ico/c.png",
                            alt: "Smiley Face",
                            width: "37",
                            height: "37"
                        }))
                    );
                break;
            case "C++":
                $("#language")
                    .append($("<div>", {class: "col-md-2"})
                        .append($("<img>", {
                            src: "assets/ico/c++.png",
                            alt: "Smiley Face",
                            width: "37",
                            height: "37"
                        }))
                    );
                break;
            default:
                break;
        }


    }});



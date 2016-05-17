window.QuestionsView = Backbone.View.extend({

    events: {
        "submit": "beforeSend",
        "click #newQuestion": "newQuestionPopup",
        "click #editQuestion": "editQuestionPopup",
        "click #deleteQuestion": "deleteQuestionPopup",
        "submit #newPopUpQuestion": "newQuestion",
        "click #addLanguage": "adicionarLinguagem",
        "click #removeLanguage": "removerLinguagem",
        "click #addIo": "addIo",
        "click #btn_questions_delete_io": "removeIo",
        "click #btn_questions_delete_All_io": "removeAllIo",
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

    editQuestionPopup: function (e) {
        e.preventDefault();

        $("#editQuestionModal").modal('show');

    },


    deleteQuestionPopup: function (e) {
        e.preventDefault();

        $("#deleteQuestionModal").modal('show');

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
            }).append('<label id="lblIO"><i class="fa fa-file-o fa-3x" aria-hidden="true"></i></label></br>'
                + '<b class="col-md-12">Input: </b></br>' + $("#txtEntrada").val() + '</br>'
                + '<b class="col-md-12">Outup: </b></br>' + $("#txtSaida").val() + '</br>'
                + '<b class="col-md-5"><button id="btn_questions_edit_io" href=""><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></button></b>'
                + '<b class="col-md-5"><button id="btn_questions_delete_io" href=""><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button></b></br>'
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



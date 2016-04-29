window.QuestionsView = Backbone.View.extend({

    events: {
        "submit": "beforeSend",
        "click #newQuestion": "newQuestionPopup",
        "submit #newPopUpQuestion": "newQuestion",
        "click #addLanguage": "adicionarLinguagem",
        "click #removeLanguage":"removerLinguagem",

    },

    beforeSend: function (e) {
        e.preventDefault();

        //this.checkAuth();

        modem('POST', 'question/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newQuestion").serializeObject()))
        );

    },

    newQuestion: function(){

        modem('POST', 'popupquestion',
            function (json) {
                $("#newQuestionModal").modal('hide');
            },
            function (xhr, ajaxOptions, thrownError) {
                //Mandar Uma Mensgame Qualquer
            },
            encodeURI(JSON.stringify($("#newPopUpQuestion").serializeObject()))
        );

    },

    newQuestionPopup: function(e){
        e.preventDefault();

        $("#newQuestionModal").modal('show');

    },



    checkAuth: function(){
        if(!sessionStorage.getItem('keyo')){
            showLoginModal($("#someParent"));
        }
    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());

        showLoginModal($("#someParent"));

        return this;
    },


    adicionarLinguagem: function (){

        var $language = $('#linguagens').find(":selected").text();
        console.log($language);

        switch($language){
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







    },
});



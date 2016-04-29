
window.PopUpQuestionView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",
        "click #addLanguage": "adicionarLinguagem",
        "click #removeLanguage":"removerLinguagem",
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', '/api/popupquestion',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpQuestion").serializeObject()))
        );

    },



    adicionarLinguagem: function (){

        // $("#linguagens").change(function() {
        //     if ($("#linguagens option[value='1']").attr('selected')) {
        //         var $html = $('<div class=" col-md-2"> <img src="assets/ico/JAVA.png" alt="Smiley face" width="37" height="37"></div>');
        //         var str = $html.prop('outerHTML');
        //         console.log(str);
        //         $("#language").append($html);
        //
        //     }
        //     else
        //     if ($("#linguagens option[value='2']").attr('selected')) {
        //         var $html = $('<div class=" col-md-2"> <img src="assets/ico/c++.png" alt="Smiley face" width="37" height="37"></div>');
        //         var str = $html.prop('outerHTML');
        //         console.log(str);
        //         $("#language").append($html);
        //
        //     }
        //     else
        //     if ($("#linguagens option[value='3']").attr('selected')) {
        //         var $html = $('<div class=" col-md-2"> <img src="assets/ico/PHP.png" alt="Smiley face" width="37" height="37"></div>');
        //         var str = $html.prop('outerHTML');
        //         console.log(str);
        //         $("#language").append($html);
        //
        //     }
        //     else
        //     if ($("#linguagens option[value='4']").attr('selected')) {
        //         var $html = $('<div class=" col-md-2"> <img src="assets/ico/c.png" alt="Smiley face" width="37" height="37"></div>');
        //         var str = $html.prop('outerHTML');
        //         console.log(str);
        //         $("#language").append($html);
        //
        //     }
        // })


        $("#linguagens").change(function(){
            if ($("#linguagens").val() == "1") {
                var $html = $('<div class=" col-md-2"> <img src="assets/ico/JAVA.png" alt="Smiley face" width="37" height="37"></div>');
                var str = $html.prop('outerHTML');
                console.log(str);
                $("#language").append($html);

            }
            else {
                if ($("#linguagens").val() == "2") {
                    var $html = $('<div class=" col-md-2"> <img src="assets/ico/c++.png" alt="Smiley face" width="37" height="37"></div>');
                    var str = $html.prop('outerHTML');
                    console.log(str);
                    $("#language").append($html);
                } else {
                    if ($("#linguagens").val() == "3") {
                        var $html = $('<div class=" col-md-2"> <img src="assets/ico/PHP.png" alt="Smiley face" width="37" height="37"></div>');
                        var str = $html.prop('outerHTML');
                        console.log(str);
                        $("#language").append($html);
                    } else {
                        if ($("#linguagens").val() == "1") {
                            var $html = $('<div class=" col-md-2"> <img src="assets/ico/c.png" alt="Smiley face" width="37" height="37"></div>');
                            var str = $html.prop('outerHTML');
                            console.log(str);
                            $("#language").append($html);
                        }
                    }
                }
            }
        });




        // var $html = $('<div class=" col-md-2"> <img src="assets/ico/JAVA.png" alt="Smiley face" width="37" height="37"></div>');
        // var str = $html.prop('outerHTML');
        // console.log(str);
        // $("#language").append($html);

    },




    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
